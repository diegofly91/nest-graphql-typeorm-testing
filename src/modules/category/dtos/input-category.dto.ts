import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Status } from '@/modules/shared/enums/';

export class InputCategoryDto {
    @MaxLength(30, { message: 'El nombre es muy largo' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
    @IsString()
    name: string;

    @MaxLength(150, { message: 'La descripcion es muy larga' })
    @IsString()
    @IsOptional()
    description: string;

    @MaxLength(150)
    @IsString()
    @IsOptional()
    picture: string;

    @IsString()
    @IsNotEmpty()
    status: keyof typeof Status;
}
