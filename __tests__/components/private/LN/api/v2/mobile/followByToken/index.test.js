import IndexAcuV2Mobile from '../../../../../../../../components/private/LN/api/v2/mobile/followByToken';

jest.mock(
    '../../../../../../../../components/private/LN/api/v1/mobile/accumulated/index',
    () => {
        return () => {
            return [
                {
                    tipoSeccion: 'acumulado',
                    idSeccion: 305,
                    acumuladoTotal: 0,
                    paginar: false,
                    titulo: 'follow',
                    autores: [
                        {
                            topicId: 'c13537bd-bfe0-45ec-a118-91b5004aec80',
                            valor: 'Luján Berardi',
                            slug: 'Luján-Berardi'
                        }
                    ]
                }
            ];
        };
    }
);

describe('Test acumulado followByToken transformation with V2 Format', () => {
    test('It should return metadata and items from array of acumulados', () => {
        const acuData = {};

        const result = IndexAcuV2Mobile(acuData);

        expect(Object.keys(result).sort()).toEqual(
            ['metadata', 'items'].sort()
        );

        expect(result).toEqual({
            metadata: {
                total: 0,
                paginate: false,
                title: 'follow',
                authors: [
                    {
                        slug: 'Luján-Berardi',
                        topicId: 'c13537bd-bfe0-45ec-a118-91b5004aec80',
                        valor: 'Luján Berardi'
                    }
                ]
            },
            items: [
                {
                    tipoSeccion: 'acumulado',
                    idSeccion: 305
                }
            ]
        });
    });
});
