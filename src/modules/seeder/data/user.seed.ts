import { RoleType } from '@/modules/role/enums';
import { Status } from '@/modules/shared/enums';
import { CreateUserDto, InputProfileUserDto } from '@/modules/user/dtos';

export const usersSeed: {
    userDto: CreateUserDto;
    profileDto: InputProfileUserDto;
    roleName: keyof typeof RoleType;
}[] = [
    {
        userDto: {
            email: 'diego_fernandolibreros@hotmail.com',
            roleId: 0,
            password: 'DiegoPassword',
            status: Status.ACTIVE,
        },
        roleName: RoleType.SUPERUSER,
        profileDto: {
            firstname: 'Diego',
            lastname: 'Libreros',
            phone: '809-555-5555',
            city: 'Santo Domingo',
            address: 'Calle 1, Santo Domingo, República Dominicana',
        },
    },
];
