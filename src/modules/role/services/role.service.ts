import { Injectable, Inject } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '../dtos';
import { Role } from '../entities';
import { RoleRepository } from '../repositories/index';

@Injectable()
export class RoleService {
    constructor(
        @Inject('RoleRepositoryInterface')
        private readonly roleRepository: RoleRepository<Role>,
    ) {}

    async createRoles(roles: CreateRoleDto[]): Promise<Role[]> {
        return await this.roleRepository.createRoles(roles);
    }

    async getRoles(): Promise<Role[]> {
        return await this.roleRepository.getRoles();
    }

    async getRoleById(roleId: number): Promise<Role> {
        return await this.roleRepository.getRoleById(roleId);
    }

    async createRole(dto: CreateRoleDto): Promise<Role> {
        return await this.roleRepository.createRole(dto);
    }

    async updateRole(roleId: number, dto: UpdateRoleDto): Promise<Role> {
        return await this.roleRepository.updateRole(roleId, dto);
    }

    async deleteRole(roleId: number): Promise<Role> {
        return await this.roleRepository.deleteRole(roleId);
    }
}
