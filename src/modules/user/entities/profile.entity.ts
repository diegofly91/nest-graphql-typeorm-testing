import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { IProfile } from '../interfaces';
import { DocumentType } from './document-type.entity';

@Entity({ name: 'user_profiles' })
export class Profile implements IProfile {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', name: 'user_id', nullable: false })
    userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'varchar', length: 20, nullable: true, default: '' })
    document: string;

    @Column({ type: 'int', name: 'document_type_id', nullable: true })
    documentTypeId?: number;

    @ManyToOne(() => DocumentType)
    @JoinColumn({ name: 'document_type_id' })
    documentType: DocumentType;

    @Column({ type: 'varchar', nullable: true, default: '', length: 60 })
    firstname: string;

    @Column({ type: 'varchar', nullable: true, default: '', length: 60 })
    lastname: string;

    @Column({ type: 'varchar', nullable: true, default: '', length: 100 })
    city: string;

    @Column({ type: 'varchar', nullable: true, default: '', length: 100 })
    address: string;

    @Column({ type: 'varchar', nullable: true, length: 20 })
    phone: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: string;
}
