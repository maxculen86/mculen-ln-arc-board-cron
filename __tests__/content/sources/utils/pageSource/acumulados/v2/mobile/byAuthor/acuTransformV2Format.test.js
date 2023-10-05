import acuTransformV2Format from '../../../../../../../../../content/sources/utils/pageSource/acumulados/v2/mobile/byAuthor/acuTransformV2Format';

describe('Test acumulados byAuthor transformation with V2 Format', () => {
    test('transform returns metadata and items from array of acumulados', () => {
        const acumulado = [
            {
                tipoAcumulado: 2,
                acumuladoTotal: 5,
                paginar: false,
                titulo: 'Author name',
                notas: [
                    {
                        id: '',
                        templateId: '1',
                        titulo: '',
                        tituloMobile: ''
                    }
                ]
            }
        ];

        const authorData = {
            _id: 'author-slug-330',
            slug: 'author-slug-330',
            name: 'author name',
            image: {
                url: 'image-url'
            }
        };

        const result = acuTransformV2Format(acumulado, authorData, true);

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
                titulo: 'Author name',
                notas: [
                    {
                        id: '',
                        templateId: '1',
                        titulo: '',
                        tituloMobile: ''
                    }
                ]
            }
        ];

        const authorData = {
            _id: 'author-slug-330',
            slug: 'author-slug-330',
            name: 'author name',
            image: {
                url: 'image-url'
            }
        };

        const result = acuTransformV2Format(acumulado, authorData, true);

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'total', 'banners', 'author'].sort()
        );

        expect(Object.keys(result.metadata.author).sort()).toEqual(
            ['id', 'slug', 'value', 'image'].sort()
        );
    });
});
