import { UsePipes, ValidationPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../services';
import { LoginUserDto, LoginSocialDto } from '../dtos';
import { User } from '@/modules/user/entities';
import { AuthGuard, LoginValidateGuard, SocialAuthGuard } from '../guards';
import { IToken, IUserPayload } from '../interfaces';
import { SocialProfile } from '../decorators';
import { Profile } from 'passport';
import { CreateUserSocialInterceptor } from '@/modules/user/interceptors';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query()
    @UseGuards(AuthGuard)
    userCurrentData(@Context('user') user: IUserPayload) {
        return user;
    }

    @UseGuards(SocialAuthGuard)
    @UseInterceptors(CreateUserSocialInterceptor)
    @Mutation(() => Boolean)
    async loginSocial(@Args('input') input: LoginSocialDto, @SocialProfile() { email }: Profile): Promise<IToken> {
        return await this.authService.payloadData(email);
    }

    @UseGuards(LoginValidateGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => User)
    async loginUser(@Args('input') { email }: LoginUserDto): Promise<IToken> {
        return await this.authService.payloadData(email);
    }
}
