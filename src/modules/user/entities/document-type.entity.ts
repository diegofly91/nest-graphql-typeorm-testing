import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IDocumentType } from '../interfaces';

@Entity({ name: 'documents_type' })
export class DocumentType implements IDocumentType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 10, unique: true })
    abbreviation: string;

    @Column({ type: 'varchar', nullable: true, length: 240, default: '' })
    description: string;

    @Column({
        type: 'int',
        name: 'required',
        nullable: true,
        default: 1,
        transformer: {
            from: (value: number) => (value == 1 ? true : false),
            to: (value: boolean) => (value ? 1 : 0),
        },
    })
    required: boolean;

    @Column({
        type: 'int',
        name: 'is_active',
        nullable: true,
        default: 1,
        transformer: {
            from: (value: number) => (value == 1 ? true : false),
            to: (value: boolean) => (value ? 1 : 0),
        },
    })
    isActive: boolean;

    @Column({
        type: 'int',
        name: 'deleted',
        nullable: true,
        default: 0,
        transformer: {
            from: (value: number) => (value == 1 ? true : false),
            to: (value: boolean) => (value ? 1 : 0),
        },
    })
    deleted: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: string;
}
