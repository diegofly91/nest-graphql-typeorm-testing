import { IToken } from './token.interface';
import { IUserPayload } from './user-payload.interface';

export interface IAuthService {
    payloadData(email: string): Promise<IToken>;
    userCurrentData(access_token: string): Promise<IUserPayload>;
}
