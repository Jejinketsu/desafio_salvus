import { getRepository } from "typeorm";
import Specialties from "../../database/models/Specialties";

export default {

    async createSpecialty(specialties: string | string[]){
        try {
            if(typeof specialties === 'string'){
                specialties = [specialties];
            }
    
            let new_specialties = [] as Specialties[];
    
            for(const name of specialties){
    
                const specialtyRepository = getRepository(Specialties);
                const already_specialty = await specialtyRepository.findOne({name: name});

                if(already_specialty) {
                    new_specialties.push(already_specialty);
                    continue;
                }

                const specialty = specialtyRepository.create({name: name});
    
                await specialtyRepository.save(specialty);
    
                new_specialties.push(specialty);
            }
    
            return new_specialties;
        } catch (error) {
            console.log('commom function create specilaty error :>>', error.message);
            throw error;
        }
    }

}