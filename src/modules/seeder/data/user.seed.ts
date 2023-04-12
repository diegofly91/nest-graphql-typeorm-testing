import { Status } from '@/modules/shared/enums';
import { CreateUserDto /*, CreateProfileUserDto */ } from '@/modules/user/dtos';

export const usersSeed: { userDto: CreateUserDto }[] = [
    {
        userDto: {
            email: 'diegofernandolibreros@gmail.com',
            //roleId 1 is SUPERUSER
            roleId: 1,
            password: 'DiegoPassword',
            status: Status.ACTIVE,
        },
    },
];
