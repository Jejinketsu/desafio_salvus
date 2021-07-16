import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Address from '../../database/models/Address';
import AddressFunctions from './AddressFunctions';
import Users from '../../database/models/Users';

export default {
    async createUser(name: string, email: string, password: string, address: Address){
        try{
            const encrypted_password = bcrypt.hashSync(password, 12);

            const usersRepository = getRepository(Users);
            const new_user = usersRepository.create({
                name: name,
                email: email,
                password: encrypted_password,
            });

            const addressRepository = getRepository(Address);
            const have_address = await addressRepository.findOne(address);

            if(!have_address){
                const new_address = await AddressFunctions.createAddress([address]);
                new_user.address = new_address[0];
            } else {
                new_user.address = have_address;
            }

            await usersRepository.save(new_user);

            const token = jwt.sign({user: new_user.id}, <string> process.env.SECRET, {
                expiresIn: 43200,
            });

            return {user: new_user, token: token};
        } catch(error) {
            console.log('commom function create user error :>>', error.message);
            throw error;
        }
    }
}