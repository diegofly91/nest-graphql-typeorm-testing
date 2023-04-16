import { CreateUserDto, InputProfileUserDto } from '@/modules/user/dtos';

const input: CreateUserDto = {
    email: 'diegofermamdolibres@gmail.com',
    roleId: 1,
    password: '123456',
    status: Status.Active,
};
const inputPro: InputProfileUserDto = {
    firstname: 'John',
    lastname: 'Doe',
    phone: '3204426066555',
    address: 'Calle 123',
};
