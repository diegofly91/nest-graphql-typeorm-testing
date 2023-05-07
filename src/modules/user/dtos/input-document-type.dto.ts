import { IsNotEmpty, IsOptional, IsString, IsBoolean, MaxLength, MinLength } from 'class-validator';
import { IDocumentType } from '../interfaces';

export class InputDocumentType implements Partial<IDocumentType> {
    @MinLength(5, { message: 'El nombre es muy corto' })
    @MaxLength(50, { message: 'El nombre es muy largo' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @MaxLength(150, { message: 'La descripcion es muy larga' })
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    required?: boolean;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
