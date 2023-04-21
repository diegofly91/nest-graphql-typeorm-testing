import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Status } from '@/modules/shared/enums';
import { ICategory } from '../interfaces';

@Entity({ name: 'categories' })
export class Category implements ICategory {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true, length: 30 })
    name: string;

    @Column({ type: 'varchar', nullable: true, default: '', length: 150 })
    description: string;

    @Column({ type: 'varchar', nullable: true, default: '', length: 150 })
    picture: string;

    @Column({
        type: 'varchar',
        default: Status.ACTIVE,
        nullable: false,
        length: 9,
    })
    status: keyof typeof Status;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: string;
}
