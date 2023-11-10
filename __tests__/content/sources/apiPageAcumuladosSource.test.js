import apiPageAcumuladosSource from '../../../content/sources/apiPageAcumuladosSource';
import mockEconomiaPageResult from '../../../__mocks__/data/pages/Page-bySection-economia.json';
import sectionSource from '../../../content/sources/sectionSource';
import pages from '../../../content/sources/utils/pageSource/index';
import NotFoundError from '../../../content/sources/utils/notFoundError';

pages.fetch = jest.fn();
pages.fetch.mockReturnValue(mockEconomiaPageResult);

sectionSource.fetch = jest.fn();

const cachedCall = async (nameOfCall, callbackFunc, params) => {
    return await callbackFunc(params);
};

describe('content source apiPageAcumuladosSource integration test', () => {
    test('should return right output keys if page has items', async () => {
        const queryParams = {
            uri: '/api/mobile/v2//page/bySection/economia/33/',
            website: 'la-nacion-ar',
            sectionId: '/economia',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        sectionSource.fetch.mockReturnValue({
            acumuladoGeneral: {
                hierarchy_navigation: 'Economia'
            }
        });

        const result = await apiPageAcumuladosSource.fetch(queryParams, {
            cachedCall
        });

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'category'].sort()
        );
    });

    test('should return right output if page has items', async () => {
        const queryParams = {
            uri: '/api/mobile/v2//page/bySection/economia/33/',
            website: 'la-nacion-ar',
            sectionId: '/economia',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        sectionSource.fetch.mockReturnValue({
            acumuladoGeneral: {
                hierarchy_navigation: 'Economia'
            }
        });

        const result = await apiPageAcumuladosSource.fetch(queryParams, {
            cachedCall
        });

        expect(result.items[4].idSeccion).toEqual(305);
        expect(result.items[4].tipoSeccion).toEqual('tema');
        expect(result.items[4].parameters).toEqual({
            title: 'Emprendedores',
            url: 'https://www.lanacion.com.ar/tema/emprendedores-tid53673'
        });
        expect(Object.keys(result.items[4]).sort()).toEqual(
            [
                'tipoSeccion',
                'idSeccion',
                'diagramacion',
                'parameters',
                'notas'
            ].sort()
        );
    });

    test('should return right metadata for suscriptores page', async () => {
        const queryParams = {
            uri: '/api/mobile/v2//page/bySection/suscriptores/33/',
            website: 'la-nacion-ar',
            sectionId: '/suscriptores',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        sectionSource.fetch.mockReturnValue(null);

        const result = await apiPageAcumuladosSource.fetch(queryParams, {
            cachedCall
        });

        expect(result.metadata).toEqual({
            category: {
                slug: '/suscriptores',
                value: 'Exclusivo suscriptores'
            },
            paginate: false,
            title: 'Exclusivo suscriptores'
        });
    });

    test('should return right metadata for ultimas-noticias page', async () => {
        const queryParams = {
            uri: '/api/mobile/v2//page/bySection/ultimas-noticias/33/',
            website: 'la-nacion-ar',
            sectionId: '/ultimas-noticias',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        sectionSource.fetch.mockReturnValue({
            name: 'Últimas noticias'
        });

        const result = await apiPageAcumuladosSource.fetch(queryParams, {
            cachedCall
        });

        expect(result.metadata).toEqual({
            category: {
                slug: '/ultimas-noticias',
                value: 'Últimas noticias'
            },
            paginate: false,
            title: 'Últimas noticias'
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

        await expect(
            apiPageAcumuladosSource.fetch(queryParams, { cachedCall })
        ).rejects.toThrow(
            new NotFoundError(`seccion no encontrada: ${queryParams.sectionId}`)
        );
    });
});
