import acuTransformV2Format from '../../../../../../../../../content/sources/utils/pageSource/acumulados/v2/mobile/byTag/acuTransformV2Format';

describe('Test acumulados byTag transformation with V2 Format', () => {
    test('transform returns metadata and items from array of acumulados', () => {
        const acumulado = [
            {
                tipoAcumulado: 2,
                acumuladoTotal: 5,
                paginar: false,
                titulo: 'Lionel Messi',
                notas: [
                    {
                        id: 'MMRAQW2DKBFFPLUHSZCFDEO4K4',
                        templateId: '1',
                        titulo:
                            'José Del Rio: la cobertura del Diario LA NACION de Argentina Campéon Mundial Qatar 2022 y la edición del libro Eternos',
                        tituloMobile:
                            'José Del Rio: cobertura de LA NACION del Mundial Qatar 2022'
                    }
                ],
                tema: {
                    id: 1619,
                    slug: 'lionel-messi-tid1619',
                    valor: 'Lionel Messi',
                    tipoId: 1,
                    formatoId: 1,
                    tipoDescripcion: 'Topico'
                }
            }
        ];

        const result = acuTransformV2Format(acumulado, true);

        expect(Object.keys(result).sort()).toEqual(
            ['metadata', 'items'].sort()
        );
    });

    test('transform should return right values for metadata object', () => {
        const acumulado = [
            {
                tipoAcumulado: 2,
                acumuladoTotal: 5,
                paginar: false,
                titulo: 'Lionel Messi',
                notas: [
                    {
                        id: 'MMRAQW2DKBFFPLUHSZCFDEO4K4',
                        templateId: '1',
                        titulo:
                            'José Del Rio: la cobertura del Diario LA NACION de Argentina Campéon Mundial Qatar 2022 y la edición del libro Eternos',
                        tituloMobile:
                            'José Del Rio: cobertura de LA NACION del Mundial Qatar 2022'
                    }
                ],
                tema: {
                    id: 1619,
                    slug: 'lionel-messi-tid1619',
                    valor: 'Lionel Messi',
                    tipoId: 1,
                    formatoId: 1,
                    tipoDescripcion: 'Topico'
                }
            }
        ];

        const result = acuTransformV2Format(acumulado, false);

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'total', 'banners', 'topic'].sort()
        );

        expect(Object.keys(result.metadata.topic).sort()).toEqual(
            [
                'id',
                'slug',
                'value',
                'typeId',
                'formatId',
                'typeDescription'
            ].sort()
        );
    });
});
