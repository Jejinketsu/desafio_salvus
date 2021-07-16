import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../../logger';

import Users from '../database/models/Users';
import Address from '../database/models/Address';
import UserFunctions from './CommonFunctions/UserFunctions';
import AddressFunctions from './CommonFunctions/AddressFunctions';

import EntityNotFoundException from '../exceptions/EntityNotFoundException';
import WrongPasswordException from '../exceptions/WrongPasswordException';

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

            const user_auth = await UserFunctions.createUser(name, email, password, address);

            const {password: omitted, ...rest} = user_auth.user;

            logger.info(`singup - user ${user_auth.user.name} successful created`);

            return response.status(201).json(rest);

        } catch (error) {
            console.log('user create error :>>', error.message);
            next(error);
        }
    },

    async login(request: Request, response: Response, next: NextFunction){
        try {
            const [hasType, hash] = request.headers.authorization.split(" ");
            const [username, password] = Buffer.from(hash, 'base64').toString().split(":");

            logger.info(`user ${username} tried login`);

            const usersRepository = getRepository(Users);
            const user = await usersRepository.findOne({
                email: username
            });
            
            if(!user) throw new EntityNotFoundException("User", "username", username);

            const password_isValid = bcrypt.compareSync(password, <string> user?.password);

            if(!password_isValid) throw new WrongPasswordException(username);

            const token = jwt.sign({user: user?.id}, <string> process.env.SECRET, {
                expiresIn: 86400,
            });

            const { password: omitted, ...rest} = user;

            logger.info(`user ${user.name} successful logged in`);
            
            return response.json({user: rest, token: token});

        } catch (error) {
            console.log('user login error :>>', error.message);
            next(error);
        }
    },

    async getUser(request: Request, response: Response, next: NextFunction){
        try {
            logger.info(`get users`);

            const usersRepository = getRepository(Users);
            const users = await usersRepository.find({
                where: request.query,
                select: ['id', 'name', 'email', 'role', 'created_at'],
                relations: ['professional']
            });

            logger.info(`users successful obtained`);

            return response.status(200).json(users);
            
        } catch (error) {
            console.log('get users error :>>', error.message);
            next(error);
        }
    },

    async update(request: Request, response: Response, next: NextFunction){
        try {
            logger.info(`update user`);

            const {
                name,
                email,
                password,
                address,
            } = request.body;

            const usersRepository = getRepository(Users);
            const user = await usersRepository.findOne(request.body.user?.id);

            if(!user) throw new EntityNotFoundException("user", "id", request.body.user?.id);

            user.name = name;
            user.email = email;
            user.password = password;

            const addressRepository = getRepository(Address);
            const have_address = await addressRepository.findOne(address);

            if(!have_address){
                const new_address = await AddressFunctions.createAddress(address);
                user.address = new_address[0];
            }

            await usersRepository.save(user);

            logger.info(`user ${user.name} successful updated`);

            return response.status(200).json(user);
        } catch (error) {
            console.log('update users error :>>', error.message);
            next(error);
        }
    },

    async delete(request: Request, response: Response, next: NextFunction){
        try {
            logger.info(`delete user`);

            const user = request.body.user;

            const usersRepository = getRepository(Users);
            await usersRepository.delete(user.id);

            logger.info(`user ${user.name} successful delted`);

            return response.sendStatus(200);
            
        } catch (error) {
            console.log('delete user error :>>', error.message);
            next(error);
        }
    }
}