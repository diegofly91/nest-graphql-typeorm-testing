import { Test } from '@nestjs/testing';
import { RoleService } from './role.service';
import { IRole } from '../interfaces';
import { RoleType } from '../enums';
import { CreateRoleDto } from '../dtos';

const roles: IRole[] = [
    {
        id: 1,
        name: RoleType.SUPERUSER,
        description: '',
    },
    {
        id: 2,
        name: RoleType.ADMIN,
        description: '',
    },
];

describe('RoleService', () => {
    let roleService: RoleService;

    const mockRoleRepository = () => ({
        getRoles: jest.fn().mockImplementation(() => {
            return Promise.resolve(roles);
        }),
        createRole: jest.fn().mockImplementation((dto: CreateRoleDto) => {
            return Promise.resolve({
                id: Date.now(),
                ...dto,
            });
        }),
        getRoleById: jest.fn().mockImplementation((id: number) => {
            const role = roles.find((item) => item.id === id);
            return Promise.resolve(role);
        }),
        deleteRole: jest.fn(),
    });

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                RoleService,
                {
                    provide: 'RoleRepositoryInterface',
                    useFactory: mockRoleRepository,
                },
            ],
        }).compile();

        roleService = module.get<RoleService>(RoleService);
    });

    describe('getRoles', () => {
        it('should return an array of roles', async () => {
            const result = await roleService.getRoles();
            expect(result).toEqual(roles);
            expect(result.length).toBe(roles.length);
        });
    });

    describe('createRole', () => {
        it('should save a Role in the database', async () => {
            const createRoleDto = {
                name: 'CUSTOMER',
                description: 'nuevo role',
            };

            const result = await roleService.createRole(createRoleDto);

            expect(result).toEqual({
                id: expect.any(Number),
                ...createRoleDto,
            });
        });
    });

    describe('getRoleById', () => {
        it('should retrieve a Role with an ID', async () => {
            const id = 1;
            const result = await roleService.getRoleById(id);
            expect(result).toEqual({
                id,
                name: expect.any(String),
                description: expect.any(String),
            });
        });
    });
});
