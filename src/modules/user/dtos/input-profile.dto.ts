import { MaxLength, IsString, IsPhoneNumber, IsOptional, ValidationArguments } from 'class-validator';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { MESSAGES } from '@/modules/shared/constants';
export class InputProfileUserDto {
    @MaxLength(60, { message: 'Title is too long' })
    @IsString()
    @IsOptional()
    firstname: string;

    @MaxLength(60, { message: 'Description is too long' })
    @IsOptional()
    lastname: string;

    @MaxLength(100, { message: 'La direccion es muy largo' })
    @IsOptional()
    address: string;

    @IsString({ message: 'must be a valid number' })
    @IsPhoneNumber('CO', {
        message: (args: ValidationArguments) => {
            if (args.value.length !== 12) {
                throw new BadRequestException(`${args.value} ${MESSAGES.INVALID_MOBILE}}`);
            } else {
                throw new InternalServerErrorException();
            }
        },
    })
    @IsOptional()
    phone?: string;
}
