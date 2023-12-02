
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: true })
    active: boolean;

    @Column()
    createdDate: Date;

    @Column()
    updatedDate: Date;
};