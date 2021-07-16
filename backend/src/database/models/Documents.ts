import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Professional from "./Professional";

@Entity()
export default class Documents {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    path_file: string;

    @Column({
        type: 'timestamp',
        default: 'now()'
    })
    created_at: Date;

    @ManyToOne(() => Professional, professional => professional.documents)
    professional: Professional;

}