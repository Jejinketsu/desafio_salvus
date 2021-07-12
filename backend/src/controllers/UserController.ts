import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../../logger';
import Users from '../database/models/Users';
import Address from '../database/models/Address';

export default {
    async create(request: Request, response: Response, next: NextFunction){
        logger.info('singup - create new user');
        try {
            const {
                name,
                email,
                password,
                address
            } = request.body;

            const encrypted_password = bcrypt.hashSync(password, 12);

            const usersRepository = getRepository(Users);
            const user = usersRepository.create({
                name,
                email,
                password: encrypted_password,
            });

            const addressRepository = getRepository(Address);
            let have_address = await addressRepository.findOne(address);

            if(!have_address){
                have_address = addressRepository.create({
                    street: address.street,
                    number: address.number,
                    district: address.district,
                    city: address.city,
                    country: address.country,
                    postal_code: address.postal_code
                });

                await addressRepository.save(have_address);
            }

            user.address = have_address;

            await usersRepository.save(user);

            const token = jwt.sign({user: user.id}, <string> process.env.SECRET, {
                expiresIn: 43200,
            });

            const {password: omitted, ...rest} = user;

            logger.info(`singup - user ${user.name} successful created`);

            return response.status(201).json({user: rest, token: token});

        } catch (error) {
            console.log('user create error :>>', error.message);
            next(error);
        }
    }
}