import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import Professional from './Professional';
import User from './Users';

@Entity()
export default class Address {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    street: string;

    @Column()
    number: number;

    @Column()
    district: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    postal_code: string;

    @OneToMany(() => User, user => user.address)
    users: User[];

    @ManyToMany(() => Professional)
    professionals: Professional[];

}