import { InputDocumentType } from '@/modules/user/dtos';
export const docTypesSeed: InputDocumentType[] = [
    {
        name: 'Cedula de Ciudadania',
        description: '',
        abbreviation: 'CC',
        required: true,
        isActive: true,
    },
    {
        name: 'Cedula de Extranjeria',
        description: '',
        abbreviation: 'CE',
        required: true,
        isActive: true,
    },
    {
        name: 'Pasaporte',
        description: '',
        abbreviation: 'PAS',
        required: true,
        isActive: true,
    },
];
