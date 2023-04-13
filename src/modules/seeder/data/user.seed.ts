import { Status } from '@/modules/shared/enums';
import { CreateUserDto, InputProfileUserDto } from '@/modules/user/dtos';

export const usersSeed: { userDto: CreateUserDto; profileDto: InputProfileUserDto }[] = [
    {
        userDto: {
            email: 'diegofernandolibreros@gmail.com',
            //roleId 1 is SUPERUSER
            roleId: 1,
            password: 'DiegoPassword',
            status: Status.ACTIVE,
        },
        profileDto: {
            firstname: 'Diego',
            lastname: 'Libreros',
            phone: '809-555-5555',
            address: 'Calle 1, Santo Domingo, República Dominicana',
        },
    },
];
