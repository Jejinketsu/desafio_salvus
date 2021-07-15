import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinTable, JoinColumn } from "typeorm";
import Role from '../../config/RoleEnum';
import Address from "./Address";
import Professional from "./Professional";

@Entity()
export default class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        enum: Role,
        default: Role.User
    })
    role: string;

    @Column({
        type: 'timestamp',
        default: 'now()'
    })
    created_at: Date;

    @OneToOne(() => Professional, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    professional: Professional;

    @ManyToOne(() => Address, address => address.users)
    @JoinTable()
    address: Address;

}