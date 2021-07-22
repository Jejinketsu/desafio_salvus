import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import User from '../database/models/Users';
import { Request, Response, NextFunction } from 'express';
import EntityNotFoundException from '../exceptions/EntityNotFoundException';
import HttpException from '../exceptions/HttpException';

export default {
    async authorize(request: Request, response: Response, next: NextFunction){
        
        try {
            const [, token]: String[] | any = request.headers.authorization?.split(" ");
            const payload = jwt.verify(token, <string> process.env.SECRET);
            
            const usersRepository = getRepository(User);

            const user = await usersRepository.findOne({id: (<any>payload).user});

            if(!user) throw new EntityNotFoundException("User", "id", (<any>payload).user.id);

            const { password: omitted, ...rest} = user;

            request.body.user = rest;

            next();

        } catch(error) {
            console.log("authorize error >>: ", error.message);
            next(error);
        }
    },

    authRole(roles: string | string[]) {
        if(roles === 'string'){
            roles = [roles];
        }

        return (request: Request, response: Response, next: NextFunction) => {

            if(roles.length && !roles.includes(request.body.user?.role)){
                next(new HttpException(
                    401, 
                    `Unauthorized user in route: ${request.originalUrl}`
                ));
            }

            next();
        }
    },

    async authConfirmed(request: Request, response: Response, next: NextFunction){
        try {
            if(request.body.user) return response.status(200).json({auth: request.body.user});
            else return response.status(200).json({auth: false});
        } catch (error) {
            console.log("auth confirmed error >>: ", error.message);
            next(error);
        }
    }
}