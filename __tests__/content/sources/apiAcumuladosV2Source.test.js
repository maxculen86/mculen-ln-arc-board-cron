import apiAcumuladoSectionsV2 from '../../../content/sources/apiAcumuladosV2Source';

import acuArticleSourceResponseMock from '../../../__mocks__/data/articlesAcum/economia.json';
import acuArticlesSource from '../../../content/sources/acuArticlesSource';
import ultimasNoticiasSectionsSource from '../../../content/sources/utils/acuArticlesSource/ultimasNoticiasSectionsSource';
import sectionSource from '../../../content/sources/sectionSource';
import NotFoundError from '../../../content/sources/utils/notFoundError';

acuArticlesSource.fetch = jest.fn();

ultimasNoticiasSectionsSource.fetch = jest.fn();
ultimasNoticiasSectionsSource.fetch.mockReturnValue([
    '/economia',
    '/deportes',
    '/politica',
    '/ciencia'
]);

sectionSource.fetch = jest.fn();

const cachedCall = async (nameOfCall, callbackFunc, params) => {
    return await callbackFunc(params);
};

describe('content source apiAcumuladosV2Source integration test', () => {
    test('should return right output keys if notes exists', async () => {
        const queryParams = {
            uri:
                '/api/mobile/v2//byTag/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            sectionId: '/economia',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        sectionSource.fetch.mockReturnValue({
            acumuladoGeneral: {
                hierarchy_navigation: 'Economia',
                mostrar_en_acu_apps: 'true'
            },
            configuration: null
        });

        acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

        const result = await apiAcumuladoSectionsV2.fetch(queryParams, {
            cachedCall
        });

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'total', 'banners', 'category'].sort()
        );
    });

    test('should return banners if biggest note index is less than 16', async () => {
        const queryParams = {
            uri:
                '/api/mobile/v2//byTag/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            sectionId: '/economia',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        sectionSource.fetch.mockReturnValue({
            acumuladoGeneral: {
                hierarchy_navigation: 'Economia',
                mostrar_en_acu_apps: 'true'
            },
            configuration: null
        });

        acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

        const result = await apiAcumuladoSectionsV2.fetch(queryParams, {
            cachedCall
        });

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'total', 'banners', 'category'].sort()
        );
        expect(result.metadata.banners.length).toBe(3);
    });

    test('should not return banners if smallest note index is more than 16', async () => {
        const queryParams = {
            uri:
                '/api/mobile/v2//byTag/slug-example-221/params=size:30;page:2/33/',
            website: 'la-nacion-ar',
            sectionId: '/economia',
            params: 'params=size:30;page:2',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        sectionSource.fetch.mockReturnValue({
            acumuladoGeneral: {
                hierarchy_navigation: 'Economia',
                mostrar_en_acu_apps: 'true'
            },
            configuration: null
        });

        acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

        const result = await apiAcumuladoSectionsV2.fetch(queryParams, {
            cachedCall
        });

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'total', 'banners', 'category'].sort()
        );
        expect(result.metadata.banners).toBe(undefined);
    });

    test('should return flag isListenable true if note meets the requirements to have audio', async () => {
        const queryParams = {
            uri:
                '/api/mobile/v2//byTag/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            sectionId: '/economia',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        sectionSource.fetch.mockReturnValue({
            acumuladoGeneral: {
                hierarchy_navigation: 'Economia',
                mostrar_en_acu_apps: 'true'
            },
            configuration: null
        });

        acuArticlesSource.fetch.mockReturnValue({
            content_elements: [
                {
                    additional_properties: {
                        has_published_copy: true
                    },
                    canonical_url: '/economia/entrevistadel-lector-nid1305798/',
                    canonical_website: 'la-nacion-ar',
                    comments: {
                        allow_comments: true,
                        display_comments: true,
                        moderation_required: false
                    },
                    content_elements: [
                        {
                            _id: 'DKC7YT572BDXBOBIFTMKUBDFTY',
                            additional_properties: {},
                            content:
                                '\nJAVIER TRUCCO <br></br> Gerente de Marketing de Schneider (cerveza)\n',
                            level: 1,
                            type: 'header'
                        }
                    ],
                    created_date: '2023-12-12T17:56:14.117Z',
                    credits: {},
                    display_date: '2023-12-12T03:00:00Z',
                    distributor: {
                        category: 'staff',
                        name: 'lanacionar',
                        subcategory: ''
                    },
                    first_publish_date: '2023-12-12T03:00:00Z',
                    headlines: {
                        basic: 'Entrevistadel lector',
                        mobile: 'Entrevistadel lector'
                    },
                    label: {
                        republicar_audio: {
                            text: 'No'
                        }
                    },
                    last_updated_date: '2023-12-12T17:56:14.117Z',
                    owner: {
                        id: 'lanacionar'
                    },
                    publish_date: '1900-01-01T03:00:00Z',
                    source: {
                        name: 'lanacionar',
                        source_id: '1305798',
                        source_type: 'staff',
                        system: 'composer'
                    },
                    subheadlines: {
                        basic: ''
                    },
                    subtype: '1',
                    type: 'story',
                    version: '0.10.5',

                    workflow: {
                        status_code: 5
                    },
                    _id: 'S457534CSVAXRLNSMCNBDHHATE',
                    website: 'la-nacion-ar',
                    website_url: '/economia/entrevistadel-lector-nid1305798/'
                }
            ]
        });

        const result = await apiAcumuladoSectionsV2.fetch(queryParams, {
            cachedCall
        });

        expect(result.items[0].notas[0]).toEqual({
            enviarApps: true,
            fechaPublicacion: '1899-12-31 19:43:12',
            id: 'S457534CSVAXRLNSMCNBDHHATE',
            isListenable: true,
            opinion: false,
            templateId: '1',
            titulo: 'Entrevistadel lector',
            url: '/economia/entrevistadel-lector-nid1305798/'
        });
    });

    test('should return 404 if section does not exists', async () => {
        const queryParams = {
            uri:
                '/api/mobile/v2//byTag/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            sectionId: '/economia',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        sectionSource.fetch.mockImplementation(() => {
            throw new NotFoundError();
        });

        acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

        await expect(
            apiAcumuladoSectionsV2.fetch(queryParams, { cachedCall })
        ).rejects.toThrow(
            new NotFoundError(`Seccion no encontrada: ${queryParams.sectionId}`)
        );
    });

    test('should return right metadata for ultimas noticias Section', async () => {
        const queryParams = {
            uri:
                '/api/mobile/v2//byTag/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            sectionId: '/ultimas-noticias',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        sectionSource.fetch.mockReturnValue(null);

        acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

        const result = await apiAcumuladoSectionsV2.fetch(queryParams, {
            cachedCall
        });

        expect(result.metadata).toEqual({
            category: {
                slug: '/ultimas-noticias',
                value: 'Últimas noticias'
            },
            paginate: true,
            title: 'Últimas noticias',
            total: 10000,
            banners: [
                {
                    idSeccion: 402,
                    index: 4
                },
                {
                    idSeccion: 403,
                    index: 7
                },
                {
                    idSeccion: 404,
                    index: 10
                }
            ]
        });
    });

    test('should return right metadata for suscriptores section', async () => {
        const queryParams = {
            uri:
                '/api/mobile/v2//byTag/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            sectionId: '/suscriptores',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        sectionSource.fetch.mockReturnValue(null);

        acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

        const result = await apiAcumuladoSectionsV2.fetch(queryParams, {
            cachedCall
        });

        expect(result.metadata).toEqual({
            category: {
                slug: '/suscriptores',
                value: 'Suscriptores'
            },
            paginate: true,
            title: 'Suscriptores',
            total: 10000,
            banners: [
                {
                    idSeccion: 402,
                    index: 4
                },
                {
                    idSeccion: 403,
                    index: 7
                },
                {
                    idSeccion: 404,
                    index: 10
                }
            ]
        });
    });
});
