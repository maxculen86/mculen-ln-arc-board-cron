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

    test('transform should not return author in metadata if page is not first page', () => {
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
            _id: 'jose-del-rio-6753',
            byline: 'José Del Río',
            firstName: 'José',
            lastName: 'Del Rio',
            author_type: 'Estándar',
            email: 'jdelrio@lanacion.com.ar',
            image: {
                url:
                    'https://resizer.glanacion.com/resizer/9K6El1ZrB_23M3Dl3l_R4toMTxw=/280x0/filters:format(webp):quality(70)/s3.amazonaws.com/arc-authors/lanacionar/271850b8-5085-4004-b5ef-6d95e1c04cf4.png'
            },
            twitter: '@josedel_rio',
            status: true,
            role: 'LA NACION',
            longBio: 'longBio',
            slug: 'jose-del-rio-6753',
            bio_page: '/autor/jose-del-rio-6753/',
            last_updated_date: '2023-05-23T13:12:43.582Z',
            books: [],
            podcasts: [],
            education: [],
            awards: [],
            expertise: 'Política, Economía y Negocios.',
            location: 'Buenos Aires, Argentina',
            languages: 'Español, Inglés',
            node_type: 'author',
            name: 'Author name',
            canonical_url: '/autor/jose-del-rio-6753/',
            subscription: undefined
        };

        const result = acuTransformV2Format(acumulado, authorData, true, false);

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'total', 'banners'].sort()
        );

        expect(result.metadata.author).toBe(undefined);
    });

    test('transform should return author data in metadata if page is first page', () => {
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
            _id: 'jose-del-rio-6753',
            byline: 'José Del Río',
            firstName: 'José',
            lastName: 'Del Rio',
            author_type: 'Estándar',
            email: 'jdelrio@lanacion.com.ar',
            image: {
                url:
                    'https://resizer.glanacion.com/resizer/9K6El1ZrB_23M3Dl3l_R4toMTxw=/280x0/filters:format(webp):quality(70)/s3.amazonaws.com/arc-authors/lanacionar/271850b8-5085-4004-b5ef-6d95e1c04cf4.png'
            },
            twitter: '@josedel_rio',
            status: true,
            role: 'LA NACION',
            longBio: 'longBio',
            slug: 'jose-del-rio-6753',
            bio_page: '/autor/jose-del-rio-6753/',
            last_updated_date: '2023-05-23T13:12:43.582Z',
            books: [],
            podcasts: [],
            education: [],
            awards: [],
            expertise: 'Política, Economía y Negocios.',
            location: 'Buenos Aires, Argentina',
            languages: 'Español, Inglés',
            node_type: 'author',
            name: 'Author name',
            canonical_url: '/autor/jose-del-rio-6753/',
            subscription: undefined
        };

        const result = acuTransformV2Format(acumulado, authorData, true, true);

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'total', 'banners', 'author'].sort()
        );

        expect(Object.keys(result.metadata.author).sort()).toEqual(
            [
                'id',
                'slug',
                'value',
                'image',
                'languages',
                'location',
                'longBio',
                'absoluteUrl',
                'twitter',
                'mail',
                'role'
            ].sort()
        );

        expect(result.metadata.author).toEqual({
            id: 6753,
            slug: 'jose-del-rio-6753',
            value: 'Author name',
            image:
                'https://resizer.glanacion.com/resizer/9K6El1ZrB_23M3Dl3l_R4toMTxw=/280x0/filters:format(webp):quality(70)/s3.amazonaws.com/arc-authors/lanacionar/271850b8-5085-4004-b5ef-6d95e1c04cf4.png',
            absoluteUrl:
                'https://resizer.glanacion.com/resizer/9K6El1ZrB_23M3Dl3l_R4toMTxw=/280x0/filters:format(webp):quality(70)/s3.amazonaws.com/arc-authors/lanacionar/271850b8-5085-4004-b5ef-6d95e1c04cf4.png',
            twitter: '@josedel_rio',
            mail: 'jdelrio@lanacion.com.ar',
            role: 'LA NACION',
            languages: 'Español, Inglés',
            location: 'Buenos Aires, Argentina',
            longBio: 'longBio'
        });
    });

    test('transform should return right values for author info object', () => {
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
            _id: 'jose-del-rio-6753',
            byline: 'José Del Rio',
            firstName: 'José',
            lastName: 'Del Rio',
            author_type: 'Estándar',
            email: 'jdelrio@lanacion.com.ar',
            image: {
                url:
                    'https://resizer.glanacion.com/resizer/9K6El1ZrB_23M3Dl3l_R4toMTxw=/280x0/filters:format(webp):quality(70)/s3.amazonaws.com/arc-authors/lanacionar/271850b8-5085-4004-b5ef-6d95e1c04cf4.png'
            },
            twitter: '@josedel_rio',
            status: true,
            role: 'LA NACION',
            longBio: 'longBio',
            slug: 'jose-del-rio-6753',
            bio_page: '/autor/jose-del-rio-6753/',
            last_updated_date: '2023-05-23T13:12:43.582Z',
            books: [],
            podcasts: [],
            education: [],
            awards: [],
            expertise: 'Política, Economía y Negocios.',
            location: 'Buenos Aires, Argentina',
            languages: 'Español, Inglés',
            node_type: 'author',
            name: 'Author name',
            canonical_url: '/autor/jose-del-rio-6753/',
            subscription: undefined
        };

        const result = acuTransformV2Format(acumulado, authorData, true, true);

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'total', 'banners', 'author'].sort()
        );

        expect(Object.keys(result.metadata.author).sort()).toEqual(
            [
                'id',
                'slug',
                'value',
                'image',
                'absoluteUrl',
                'twitter',
                'longBio',
                'languages',
                'location',
                'mail',
                'role'
            ].sort()
        );

        expect(result.metadata.author).toEqual({
            id: 6753,
            slug: 'jose-del-rio-6753',
            value: 'Author name',
            image:
                'https://resizer.glanacion.com/resizer/9K6El1ZrB_23M3Dl3l_R4toMTxw=/280x0/filters:format(webp):quality(70)/s3.amazonaws.com/arc-authors/lanacionar/271850b8-5085-4004-b5ef-6d95e1c04cf4.png',
            absoluteUrl:
                'https://resizer.glanacion.com/resizer/9K6El1ZrB_23M3Dl3l_R4toMTxw=/280x0/filters:format(webp):quality(70)/s3.amazonaws.com/arc-authors/lanacionar/271850b8-5085-4004-b5ef-6d95e1c04cf4.png',
            twitter: '@josedel_rio',
            longBio: 'longBio',
            location: 'Buenos Aires, Argentina',
            languages: 'Español, Inglés',
            mail: 'jdelrio@lanacion.com.ar',
            role: 'LA NACION'
        });
    });
});
