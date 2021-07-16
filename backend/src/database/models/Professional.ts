import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
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

    @OneToOne(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    user: User;

    @OneToMany(() => Documents, document => document.professional, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    documents: Document[];

    @ManyToMany(() => Address, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    address: Address[];

    @ManyToMany(() => Specialties, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    specialties: Specialties[];

}