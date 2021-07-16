import { getRepository } from 'typeorm';
import Address from '../../database/models/Address';

export default {

    async createAddress(address: Address[]){
        try {
    
            const addressRepository = getRepository(Address);
            let addresses = [] as Address[];
    
            for(const element of address){

                const already_address = await addressRepository.findOne(element);

                if(already_address) {
                    addresses.push(already_address);
                    continue;
                }
                
                const new_address = addressRepository.create({
                    street: element.street,
                    number: element.number,
                    district: element.district,
                    city: element.city,
                    state: element.state,
                    country: element.country,
                    postal_code: element.postal_code
                });
    
                await addressRepository.save(new_address);

                addresses.push(new_address);
            }

            return addresses;   
        } catch (error) {
            console.log('commom function create address error :>>', error.message);
            throw error;
        }
    }

}