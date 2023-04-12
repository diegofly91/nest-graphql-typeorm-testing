import { Role } from '../entities';
import { CreateRoleDto, FindByNameRoleDto, UpdateRoleDto } from '../dtos';

export interface RoleInterfaceRepository<Role> {
  getRoles(): Promise<Role[]>;
  getRoleById(roleId: number): Promise<Role>;
  findOneByName({ name }: FindByNameRoleDto): Promise<Role>;
  createRole(dto: CreateRoleDto): Promise<Role>;
  createRoles(dto: CreateRoleDto[]): Promise<Role[]>;
  updateRole(roleId: number, dto: UpdateRoleDto): Promise<Role>;
  deleteRole(roleId: number): Promise<Role>;
  roleExist({ name }: FindByNameRoleDto): Promise<boolean>;
}
