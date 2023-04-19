import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../services';
import { LoginUserDto } from '../dtos';
import { User } from '@/modules/user/entities';
import { AuthGuard, LoginValidateGuard } from '../guards';
import { IToken, IUserPayload } from '../interfaces';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query()
    @UseGuards(AuthGuard)
    userCurrentData(@Context('user') user: IUserPayload) {
        return user;
    }

    @UseGuards(LoginValidateGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => User)
    async loginUser(@Args('input') { email }: LoginUserDto): Promise<IToken> {
        return await this.authService.payloadData(email);
    }
}
