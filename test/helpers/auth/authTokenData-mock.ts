import { IToken } from '@/modules/auth/interfaces';
import { LoginUserDto } from '@/modules/auth/dtos';

const loginUserMock: LoginUserDto = {
    email: 'diegofernandolibreros@gmail.com',
    password: 'mypassword',
};

const authTokenData: IToken = {
    access_token:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkaWVnb2Zlcm5hbmRvbGlicmVyb3NAZ21haWwuY29tIiwic3RhdHVzIjoiQUNUSVZFIiwicm9sZUlkIjoxLCJyb2xlTmFtZSI6IlNVUEVSVVNFUiIsImlhdCI6MTY4MTg3MzYzMywiZXhwIjoxNjgyNzM3NjMzfQ.zxmCWWKCtZX2lmhMl6jM63bPUBb0pk6OO7gRFHdenUE',
    expirate_in: 0,
};

export { authTokenData, loginUserMock };
