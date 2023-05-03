import { Strategy } from 'passport-google-token';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { socialProviders } from '../constants/constants';
import { Profile } from 'passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, socialProviders.GOOGLE) {
    constructor(public readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile, done: (...args: any) => any) {
        if (!profile) {
            return done(new UnauthorizedException(), false);
        }
        return done(null, profile);
    }
}
