import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { IUserProfile } from '../interfaces';

@Entity({ name: 'user_profiles' })
export class UserProfile implements IUserProfile {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', name: 'user_id', nullable: false })
    userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'varchar', nullable: true, default: '', length: 60 })
    firstname: string;

    @Column({ type: 'varchar', nullable: true, default: '', length: 60 })
    lastname: string;

    @Column({ type: 'varchar', nullable: true, default: '', length: 100 })
    address: string;

    @Column({ type: 'varchar', nullable: true, length: 20 })
    phone: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: string;
}
