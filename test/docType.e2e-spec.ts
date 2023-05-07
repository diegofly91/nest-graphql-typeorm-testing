import { InputDocumentType, Options, Sdk } from './gql/queries';
import { createTestingApp } from './common/test-setup';
import { docTypeMock } from './helpers/user';
import { usersMock } from './helpers/user';
import { MESSAGES } from '@/modules/shared/constants';

describe('DocumentTypeResolver (e2e)', () => {
    let session: Sdk;
    let app: any;
    let access_token: string;

    beforeEach(async () => {
        const { sessionFactory, app: appInstance } = await createTestingApp();
        session = await sessionFactory.create();
        // user role SUPERUSER
        const { email, password } = usersMock[0];
        const { loginUser } = await session.loginUser({ input: { email, password } });
        access_token = loginUser.access_token;
        app = appInstance;
    });

    afterAll(async () => {
        await app.close();
    });

    describe('DocTypesResolver Query  (e2e)', () => {
        it('should return all getDocumentTypesAll [{},{},..{}]', async () => {
            const { getDocumentTypesAll } = await session.getDocumentTypesAll(
                {},
                { Authorization: `Bearer ${access_token}` },
            );
            expect(getDocumentTypesAll.length).toBe(docTypeMock.length);
        });

        it(`should return all getDocumentTypesAll return Error ${MESSAGES.UNAUTORIZATED_USER}`, async () => {
            try {
                return await session.getDocumentTypesAll();
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.UNAUTORIZATED_USER);
                });
            }
        });

        it(`should return all getDocumentTypesAll User role DIFF SUPERUSER return Error ${MESSAGES.UNAUTORIZATED_USER}`, async () => {
            const { email, password } = usersMock[1];
            const { loginUser } = await session.loginUser({ input: { email, password } });
            try {
                return await session.getDocumentTypesAll({}, { Authorization: `Bearer ${loginUser.access_token}` });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.UNAUTORIZATED_USER);
                });
            }
        });

        it(`should return all getDocumentTypes return filters Options [{}, {}, ...]`, async () => {
            const input: Options = {
                deleted: false,
                isActive: true,
            };
            const { getDocumentTypes } = await session.getDocumentTypes(
                { input },
                { Authorization: `Bearer ${access_token}` },
            );
            expect(getDocumentTypes.length).toBe(docTypeMock.filter((docType) => docType.isActive).length);
        });

        it('should getDocumentTypeById return a docType', async () => {
            const docTypeResponse = docTypeMock[0];
            const { getDocumentTypeById } = await session.getDocumentTypeById(
                { id: docTypeResponse.id },
                { Authorization: `Bearer ${access_token}` },
            );
            expect(getDocumentTypeById).toEqual(docTypeResponse);
        });

        it('should getDocumentTypeById return Error', async () => {
            try {
                return await session.getDocumentTypeById(
                    { id: docTypeMock.length + 2 },
                    { Authorization: `Bearer ${access_token}` },
                );
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain('Cannot return null for non-nullable field');
                });
            }
        });

        it('create DocumentType Success return DocType', async () => {
            const input: InputDocumentType = {
                name: 'DocumentType Test',
                abbreviation: 'DTT',
                description: 'DocumentType Test',
                isActive: true,
                required: true,
            };
            const { createDocumentType } = await session.createDocumentType(
                { input },
                { Authorization: `Bearer ${access_token}` },
            );

            expect(createDocumentType).toEqual({
                id: expect.any(Number),
                ...input,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deleted: false,
            });
        });

        it('create DocumentType return Error exits', async () => {
            const docTypeOne = docTypeMock[0];
            const input: InputDocumentType = {
                name: docTypeOne.name,
                abbreviation: 'DTT',
                description: 'DocumentType Test',
                isActive: true,
                required: true,
            };

            try {
                return await session.createDocumentType({ input }, { Authorization: `Bearer ${access_token}` });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.DOCUMENT_TYPE_EXIST);
                });
            }
        });

        it('update DocumentType Success return DocType', async () => {
            const { id, abbreviation, isActive, description, required, deleted } = docTypeMock[0];
            const name = 'DocumentType Test 3';
            const input: InputDocumentType = {
                name,
                abbreviation,
                isActive,
                description,
                required,
            };
            const { updateDocumentType } = await session.updateDocumentType(
                { id, input },
                { Authorization: `Bearer ${access_token}` },
            );

            expect(updateDocumentType).toEqual({
                id,
                ...input,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deleted,
            });
        });

        it('update DocumentType return Error exist Abbreviation', async () => {
            const { id, name, isActive, description, required } = docTypeMock[0];
            const abbreviation = docTypeMock[1].abbreviation;
            const input: InputDocumentType = {
                name,
                abbreviation,
                isActive,
                description,
                required,
            };
            try {
                return await session.updateDocumentType({ id, input }, { Authorization: `Bearer ${access_token}` });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.DOCUMENT_TYPE_EXIST + ' abbreviation');
                });
            }
        });

        it('update DocumentType return Error exist Name', async () => {
            const { id, abbreviation, isActive, description, required } = docTypeMock[0];
            const name = docTypeMock[1].name;
            const input: InputDocumentType = {
                name,
                abbreviation,
                isActive,
                description,
                required,
            };
            try {
                return await session.updateDocumentType({ id, input }, { Authorization: `Bearer ${access_token}` });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.DOCUMENT_TYPE_EXIST + ' name');
                });
            }
        });

        it('update DocumentType return Error not found', async () => {
            const { abbreviation, isActive, description, required } = docTypeMock[0];
            const name = docTypeMock[1].name;
            const input: InputDocumentType = {
                name,
                abbreviation,
                isActive,
                description,
                required,
            };
            try {
                return await session.updateDocumentType(
                    { id: docTypeMock.length + 2, input },
                    { Authorization: `Bearer ${access_token}` },
                );
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.NOT_FOUND);
                });
            }
        });

        it('active DocumentType Success return true', async () => {
            const { id, isActive } = docTypeMock[0];
            const { activeDocumentType } = await session.activeDocumentType(
                { id, isActive: !isActive },
                { Authorization: `Bearer ${access_token}` },
            );
            expect(activeDocumentType).toBeTruthy();
        });

        it('delete DocumentType Success return true', async () => {
            const { id } = docTypeMock[0];
            const { deleteDocumentType } = await session.deleteDocumentType(
                { id },
                { Authorization: `Bearer ${access_token}` },
            );
            expect(deleteDocumentType).toBeTruthy();
        });
    });
});
