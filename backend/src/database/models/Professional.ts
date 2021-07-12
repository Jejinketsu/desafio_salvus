import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import Address from './Address';
import Documents from './Documents';
import Specialties from './Specialties';
import User from './Users';

@Entity()
export default class Professional {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'timestamp'
    })
    date_of_birth: Date;

    @Column()
    gender: string;

    @Column()
    job: string;

    @Column()
    registration_number: string;

    @OneToOne(() => User)
    user: User;

    @OneToMany(() => Documents, document => document.professional)
    documents: Document[];

    @ManyToMany(() => Address)
    @JoinColumn()
    address: Address[];

    @ManyToMany(() => Specialties)
    @JoinColumn()
    specialties: Specialties[];

}