
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ListItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    listId: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: true })
    active: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_date: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_date: Date;
}
