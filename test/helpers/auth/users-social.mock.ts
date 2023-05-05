import { SocialProviders, LoginSocialDto } from '../../gql/queries';
import { Profile } from 'passport';
import { usersMock } from '../user';

const usersSocialMock: { input: LoginSocialDto; user: Profile }[] = [
    {
        input: {
            provider: SocialProviders.Google,
            accessToken: 'mytokenthegoogle',
        },
        user: {
            id: '1',
            displayName: 'Diego lIBREROS',
            name: {
                givenName: 'Diego',
                familyName: 'lIBREROS',
            },
            emails: [{ value: 'miemail@gmail.com' }],
            provider: SocialProviders.Google,
        },
    },
    {
        input: {
            provider: SocialProviders.Facebook,
            accessToken: 'mytokenthefacebook',
        },
        user: {
            id: '1',
            displayName: 'Diego Barerra',
            name: {
                givenName: 'Diego',
                familyName: 'Barerra',
            },
            emails: [{ value: 'miemail@fbsk.com' }],
            provider: SocialProviders.Facebook,
        },
    },
    {
        input: {
            provider: SocialProviders.Google,
            accessToken: 'mytokenthegoogleuserexits',
        },
        user: {
            id: '1',
            displayName: 'Diego lIBREROS',
            name: {
                givenName: 'Diego',
                familyName: 'lIBREROS',
            },
            emails: [{ value: usersMock[0].email }],
            provider: SocialProviders.Google,
        },
    },
];

export { usersSocialMock };
