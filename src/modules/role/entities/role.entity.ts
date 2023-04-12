import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities';
import { IRole } from '../interfaces/index';

@Entity({ name: 'roles' })
export class Role implements IRole {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true, length: 20 })
    name: string;

    @Column({ type: 'varchar', length: 240 })
    description: string;

    @CreateDateColumn({ type: 'timestamp', nullable: true, name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true, name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
