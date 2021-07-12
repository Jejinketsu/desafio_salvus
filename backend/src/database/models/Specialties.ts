import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Professional from "./Professional";

@Entity()
export default class Specialties {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Professional)
    professional: Professional[];

}