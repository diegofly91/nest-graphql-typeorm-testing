import { MaxLength, IsString, IsPhoneNumber, IsOptional, ValidationArguments, IsNumber } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { MESSAGES } from '@/modules/shared/constants';
export class InputProfileUserDto {
    @IsNumber()
    @IsOptional()
    documentTypeId: number;

    @MaxLength(60, { message: 'Title is too long' })
    @IsString()
    @IsOptional()
    document: string;

    @MaxLength(60, { message: 'Title is too long' })
    @IsString()
    @IsOptional()
    firstname: string;

    @MaxLength(60, { message: 'Description is too long caracters' })
    @IsOptional()
    lastname: string;

    @MaxLength(100, { message: 'City is too long' })
    @IsOptional()
    city: string;

    @MaxLength(100, { message: 'Address is too long' })
    @IsOptional()
    address: string;

    @IsString({ message: 'must be a valid number' })
    @IsPhoneNumber('CO', {
        message: (args: ValidationArguments) => {
            throw new BadRequestException(`${args.value} ${MESSAGES.INVALID_MOBILE}`);
        },
    })
    @IsOptional()
    phone?: string;
}
