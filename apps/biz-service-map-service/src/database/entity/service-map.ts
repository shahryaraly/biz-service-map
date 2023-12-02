
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServiceMap {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serviceId: number;

    @Column()
    consumerServiceId: number;

    @Column({ default: true })
    active: boolean;

    @Column()
    createdDate: Date;

    @Column()
    updatedDate: Date;
}
