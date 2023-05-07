import {
    MaxLength,
    IsString,
    IsPhoneNumber,
    IsOptional,
    ValidationArguments,
    IsNotEmpty,
    IsNumber,
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { MESSAGES } from '@/modules/shared/constants';

export class InputProfileUserAdviserDto {
    @IsNumber()
    @IsNotEmpty()
    documentTypeId: number;

    @MaxLength(20, { message: 'document is too long' })
    @IsString()
    @IsNotEmpty()
    document: string;

    @MaxLength(60, { message: 'firstname is too long' })
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @MaxLength(60, { message: 'Lastname is too long caracters' })
    @IsOptional()
    lastname: string;

    @MaxLength(100, { message: 'City is too long' })
    @IsNotEmpty()
    city: string;

    @MaxLength(100, { message: 'Address is too long' })
    @IsNotEmpty()
    address: string;

    @IsString({ message: 'must be a valid number' })
    @IsPhoneNumber('CO', {
        message: (args: ValidationArguments) => {
            throw new BadRequestException(`${args.value} ${MESSAGES.INVALID_MOBILE}`);
        },
    })
    @IsNotEmpty()
    phone: string;
}
