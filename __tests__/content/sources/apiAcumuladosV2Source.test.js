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
    test('should return right output if notes exists', async () => {
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
                value: 'Exclusivo suscriptores'
            },
            paginate: true,
            title: 'Exclusivo suscriptores',
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
