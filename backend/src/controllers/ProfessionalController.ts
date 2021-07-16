import { Request, Response, NextFunction, response, query } from 'express';
import { getRepository } from 'typeorm';
import logger from '../../logger';
import S3 from '../services/S3_service';

import Documents from '../database/models/Documents';
import Professional from '../database/models/Professional';
import AddressFunctions from './CommonFunctions/AddressFunctions';
import SpecialtyFunctions from './CommonFunctions/SpecialtyFunctions';

import UserFunctions from './CommonFunctions/UserFunctions';
import EntityNotFoundException from '../exceptions/EntityNotFoundException';

export default {

    async create(request: Request, response: Response, next: NextFunction){
        try {
            logger.info(`create professinal`);

            const {
                name,
                email,
                password,
                address,
                date_of_birth,
                gender,
                job,
                registration_number,
                addresses,
                specialties
            } = request.body;

            const user_auth = await UserFunctions.createUser(name, email, password, address);
            const new_addresses = await AddressFunctions.createAddress(addresses);
            const new_specilaties = await SpecialtyFunctions.createSpecialty(specialties);

            const professionalRepository = getRepository(Professional);
            const professional = professionalRepository.create({
                date_of_birth,
                gender,
                job,
                registration_number,
            });

            await professionalRepository.save(professional);

            professional.user = user_auth.user;
            professional.address = new_addresses;
            professional.specialties = new_specilaties;

            await professionalRepository.save(professional);

            logger.info(`professional ${professional.user.name} successful created`);

            return response.status(201).json(professional);
        } catch (error) {
            console.log(`create professional erro :>>`, error.message);
            next(error);
        }
    },

    async getProfessional(request: Request, response: Response, next: NextFunction){
        try {

            logger.info(`get Professional`);

            const professionalsRepository = getRepository(Professional);
            const professionals = await professionalsRepository.find({
                where: request.query,
                relations: ['user', 'address', 'specialties', 'documents']
            });

            logger.info(`professional successful obtained`);

            return response.status(200).json(professionals);
        } catch (error) {
            console.log(`get professional erro :>>`, error.message);
            next(error);
        }
    },

    async update(request: Request, response: Response, next: NextFunction){
        try {
            logger.info(`update professional`);

            const {
                addresses,
                specialties,
                date_of_birth,
                gender,
                job,
                registration_number,
                user
            } = request.body;

            
            const professionalRepository = getRepository(Professional);
            const professional = await professionalRepository.findOne({user: user});
            
            if(!professional) throw new EntityNotFoundException("professional", "user_id", user.id);
            
            professional.job = job;
            professional.gender = gender;
            professional.date_of_birth = date_of_birth;
            professional.registration_number = registration_number;
            professional.specialties = await SpecialtyFunctions.createSpecialty(specialties);
            professional.address = await AddressFunctions.createAddress(addresses);

            await professionalRepository.save(professional);

            logger.info(`update professional`);

            return response.status(200).json(professional);

        } catch (error) {
            console.log(`update professional erro :>>`, error.message);
            next(error);
        }
    },

    async delete(request: Request, response: Response, next: NextFunction){
        try {

            logger.info(`delete professional`);
            
            const professionalRepository = getRepository(Professional);
            const professional = await professionalRepository.delete({user: request.body.user});

            logger.info(`professional successful deleted`);

            return response.sendStatus(200);

        } catch (error) {
            console.log(`delete professional erro :>>`, error.message);
            next(error);
        }
    },

    async addFile(request: Request, response: Response, next: NextFunction){
        try {
            logger.info(`add file`);

            const { pro_id } = request.body;

            const professionalRepository = getRepository(Professional);
            const professional = await professionalRepository.findOne({id: pro_id});

            if(!professional) throw new EntityNotFoundException("professional", "id", pro_id);

            const documentsRepository = getRepository(Documents);
            const document = documentsRepository.create({
                name: request.file.filename,
                path_file: '',
                professional: professional
            });
            await documentsRepository.save(document);
            
            const avatar_info = {
                entity: 'documents',
                id: professional.id,
                type: `${document.id}-${request.file.filename}`,
                mime: request.file.mimetype
            };

            const filepath = await S3.uploadFile(request.file.path, avatar_info);
            
            document.path_file = filepath;

            await documentsRepository.save(document);

            logger.info(`file successful add`);

            return response.sendStatus(200);

        } catch (error) {
            console.log(`add file erro :>>`, error.message);
            next(error);
        }
    },

    async removeFile(request: Request, response: Response, next: NextFunction){
        try {
            logger.info(`remove file`);

            const { file_id, user } = request.body;

            const documentsRepository = getRepository(Documents);
            const document = await documentsRepository.findOne({id: file_id}, {
                relations: ['professional']
            });

            const professionalRepository = getRepository(Professional);
            const professional = await professionalRepository.findOne({user: user});

            if(!professional) throw new EntityNotFoundException("professional", "user_id", user);

            if(professional.id !== document.professional.id) throw {status: 401, message: 'not allowed file'};

            const file_info = {
                entity: "documents",
                id: professional.id,
                type: `${document.id}-${document.name}`,
                mime: ''
            }

            S3.deleteFile(file_info);

            await documentsRepository.delete({id: document.id});

            logger.info(`file successful deleted`);

            return response.sendStatus(200);

        } catch (error) {
            console.log(`delete file erro :>>`, error.message);
            next(error);
        }
    }

}