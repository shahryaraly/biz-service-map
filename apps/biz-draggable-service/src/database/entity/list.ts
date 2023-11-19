
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class List {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: true })
    active: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_date: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_date: Date;
};