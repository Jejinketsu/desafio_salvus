import { Entity, Column, PrimaryGeneratedColumn, Timestamp, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Role from '../../config/RoleEnum';
import Address from "./Address";
import Professional from "./Professional";

@Entity()
export default class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        enum: Role,
        default: Role.User
    })
    role: string;

    @Column({
        type: 'timestamp'
    })
    created_at: Date;

    @OneToOne(() => Professional)
    professional: Professional;

    @ManyToOne(() => Address, address => address.users)
    @JoinColumn()
    address: Address;

}