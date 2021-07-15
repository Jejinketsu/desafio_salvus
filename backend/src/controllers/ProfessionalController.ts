import { Request, Response, NextFunction, response, query } from 'express';
import { getRepository } from 'typeorm';
import logger from '../../logger';

import Professional from '../database/models/Professional';
import AddressFunctions from './CommonFunctions/AddressFunctions';
import SpecialtyFunctions from './CommonFunctions/SpecialtyFunctions';

import UserFunctions from './CommonFunctions/UserFunctions';

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

            

            logger.info(`update professional`);

            return response.status(200).json();

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
    }

}