import { rolesMock } from './roles.mock';
import { IRole } from '@/modules/role/interfaces';

export class RoleRepositoryMock {
    getRoles(): Promise<IRole[]> {
        return Promise.resolve(rolesMock);
    }

    getRoleById(id: number): Promise<IRole> {
        return Promise.resolve(rolesMock.find((role) => role.id === id));
    }
}
