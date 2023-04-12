import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
    @MinLength(4, { message: 'El nombre es muy corto' })
    @MaxLength(60, { message: 'El nombre es muy largo' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(240, { message: 'La descripcion es muy larga' })
    @IsString()
    description: string;
}
