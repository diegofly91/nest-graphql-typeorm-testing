import { PassportStrategy } from '@nestjs/passport';
import * as Strategy from 'passport-facebook-token';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { socialProviders } from '../constants/constants';
import { Profile } from 'passport';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, socialProviders.FACEBOOK) {
    constructor(public readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('FACEBOOK_CLIENT_ID'),
            clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: (...args: any) => any) {
        if (!profile) {
            return done(new UnauthorizedException(), false);
        }
        return done(null, profile);
    }
}
