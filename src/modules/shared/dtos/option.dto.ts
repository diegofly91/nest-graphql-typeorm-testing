import { IsOptional } from 'class-validator';
import { Status, IsActive, Deleted } from '../enums';
import { Transform } from 'class-transformer';

export class OptionDto {
    @Transform(({ value }) => (value ? IsActive.TRUE : IsActive.FALSE))
    @IsOptional()
    isActive = IsActive.TRUE;

    @Transform(({ value }) => (value ? Deleted.TRUE : Deleted.FALSE))
    @IsOptional()
    deleted = Deleted.FALSE;

    @IsOptional()
    status: string = Status.ACTIVE;
}
