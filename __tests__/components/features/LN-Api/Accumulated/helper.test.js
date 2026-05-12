import {
    SECTION_SUSCRIPTORES,
    SECTION_ULTIMAS_NOTICIAS,
    DEFAULT_SIZE,
    DEFAULT_PAGE,
    BANNERS_PAGINATION_THRESHOLD,
    DEFAULT_VERSION,
    SOURCE_DISTRIBUTOR,
    SOURCE_SECTION,
    API_DATA,
    toSectionKey,
    formatSectionsForUltimas,
    buildLnAcuBySectionQuery,
    resolveVersion,
    resolveIndexTransform,
    resolveTitle,
    buildAcuData,
    isDeepPagination,
    isDistributorSource,
    warnIfMissingSectionData
} from '../../../../../components/features/LN-Api/Accumulated/helper';

jest.mock('../../../../../components/private/common/utils/getSizesFrom', () =>
    jest.fn().mockImplementation((isAdmin, sizeCf, pageCf) => ({
        size: sizeCf || 30,
        page: pageCf || 1
    }))
);

jest.mock('../../../../../components/private/common/utils/browser', () => ({
    __esModule: true,
    default: {
        getApiVersion: jest.fn().mockReturnValue(2)
    }
}));

jest.mock('../../../../../components/private/common/utils/get', () =>
    jest.fn().mockImplementation((obj, path, defaultValue) => {
        if (!obj) return defaultValue;
        const keys = path.split('.');
        let result = obj;
        for (const key of keys) {
            if (result && typeof result === 'object' && key in result) {
                result = result[key];
            } else {
                return defaultValue;
            }
        }
        return result === undefined ? defaultValue : result;
    })
);

jest.mock(
    '../../../../../components/private/LN/api/v1/global/accumulated',
    () => jest.fn().mockImplementation(data => ['v1-global', data])
);

jest.mock(
    '../../../../../components/private/LN/api/v1/mobile/accumulated',
    () => jest.fn().mockImplementation(data => ['v1-mobile', data])
);

jest.mock(
    '../../../../../components/private/LN/api/v2/global/accumulated',
    () => jest.fn().mockImplementation(data => ['v2-global', data])
);

describe('components - features - LN-Api - Accumulated - helper.js', () => {
    describe('exported constants', () => {
        it('should expose the expected constant values', () => {
            expect(SECTION_SUSCRIPTORES).toBe('/suscriptores');
            expect(SECTION_ULTIMAS_NOTICIAS).toBe('/ultimas-noticias');
            expect(DEFAULT_SIZE).toBe(30);
            expect(DEFAULT_PAGE).toBe(1);
            expect(BANNERS_PAGINATION_THRESHOLD).toBe(16);
            expect(DEFAULT_VERSION).toBe(2);
            expect(SOURCE_DISTRIBUTOR).toBe('distributorSource');
            expect(SOURCE_SECTION).toBe('sectionSource');
        });

        it('should expose API_DATA with global and mobile branches', () => {
            expect(API_DATA).toHaveProperty('global');
            expect(API_DATA).toHaveProperty('mobile');
            expect(typeof API_DATA.global[1]).toBe('function');
            expect(typeof API_DATA.global[2]).toBe('function');
            expect(typeof API_DATA.mobile[1]).toBe('function');
            expect(typeof API_DATA.mobile[2]).toBe('function');
        });
    });

    describe('toSectionKey', () => {
        it('should lowercase a string id', () => {
            expect(toSectionKey('/Politica')).toBe('/politica');
        });

        it('should return empty string for non-string ids', () => {
            expect(toSectionKey(null)).toBe('');
            expect(toSectionKey(undefined)).toBe('');
            expect(toSectionKey(123)).toBe('');
            expect(toSectionKey({})).toBe('');
        });

        it('should handle empty strings', () => {
            expect(toSectionKey('')).toBe('');
        });
    });

    describe('formatSectionsForUltimas', () => {
        it('should format section array to OR-joined query format', () => {
            expect(formatSectionsForUltimas(['/politica', '/economia'])).toBe(
                '("/politica"+OR+"/economia")'
            );
        });

        it('should handle single-section arrays', () => {
            expect(formatSectionsForUltimas(['/politica'])).toBe(
                '("/politica")'
            );
        });

        it('should handle empty arrays', () => {
            expect(formatSectionsForUltimas([])).toBe('()');
        });
    });

    describe('isDistributorSource', () => {
        it('should return true when source equals SOURCE_DISTRIBUTOR', () => {
            expect(isDistributorSource('distributorSource', null)).toBe(true);
            expect(isDistributorSource('distributorSource', 'dist-123')).toBe(
                true
            );
        });

        it('should return false when source is a different known source', () => {
            expect(isDistributorSource('sectionSource', 'dist-123')).toBe(
                false
            );
            expect(isDistributorSource('sectionSource', null)).toBe(false);
        });

        it('should fall back to Boolean(distributorId) when source is missing', () => {
            expect(isDistributorSource(null, 'dist-123')).toBe(true);
            expect(isDistributorSource(undefined, 'dist-123')).toBe(true);
            expect(isDistributorSource('', 'dist-123')).toBe(true);
            expect(isDistributorSource(null, null)).toBe(false);
            expect(isDistributorSource(undefined, undefined)).toBe(false);
            expect(isDistributorSource('', '')).toBe(false);
        });
    });

    describe('buildLnAcuBySectionQuery', () => {
        const baseInput = {
            arcSite: 'la-nacion-ar',
            globalContent: { _id: '/politica' },
            isAdmin: false,
            sizeCf: 10,
            pageCf: 1,
            paramUrlId: 'params',
            sections: [],
            requestUri: '/api/mobile/v2/notas/bySection/politica/'
        };

        it('should build a default section query with sectionId and excludeSourceOrigin empty', () => {
            const result = buildLnAcuBySectionQuery(baseInput);

            expect(result).toEqual({
                page: 1,
                imageConfig: 'm',
                api: true,
                'arc-site': 'la-nacion-ar',
                size: 10,
                sectionId: '/politica',
                excludeSourceOrigin: ''
            });
        });

        it('should use featureSectionId override when provided', () => {
            const result = buildLnAcuBySectionQuery({
                ...baseInput,
                featureSectionId: '/economia'
            });

            expect(result.sectionId).toBe('/economia');
        });

        it('should return suscriptores query for /suscriptores section', () => {
            const result = buildLnAcuBySectionQuery({
                ...baseInput,
                globalContent: { _id: '/suscriptores' }
            });

            expect(result).toEqual({
                page: 1,
                imageConfig: 'm',
                api: true,
                'arc-site': 'la-nacion-ar',
                tagId: 'la-nacion-cerca',
                sourceOrigin: 'composer',
                size: 10
            });
        });

        it('should default size to DEFAULT_SIZE on suscriptores when size is falsy', () => {
            const result = buildLnAcuBySectionQuery({
                ...baseInput,
                sizeCf: 0,
                globalContent: { _id: '/suscriptores' }
            });

            expect(result.size).toBe(DEFAULT_SIZE);
        });

        it('should return ultimas-noticias query when sections are provided', () => {
            const result = buildLnAcuBySectionQuery({
                ...baseInput,
                globalContent: { _id: '/ultimas-noticias' },
                sections: ['/politica', '/economia']
            });

            expect(result).toEqual({
                page: 1,
                imageConfig: 'm',
                api: true,
                'arc-site': 'la-nacion-ar',
                sectionsIds: '("/politica"+OR+"/economia")',
                sourceOrigin: 'composer',
                size: 10
            });
        });

        it('should NOT take ultimas-noticias branch when sections is empty', () => {
            const result = buildLnAcuBySectionQuery({
                ...baseInput,
                globalContent: { _id: '/ultimas-noticias' },
                sections: null
            });

            expect(result.sectionsIds).toBeUndefined();
            expect(result.sectionId).toBe('/ultimas-noticias');
        });

        it('should set excludeSourceOrigin=ArcImporter-LnData when mostrar_en_acu_apps is "false"', () => {
            const result = buildLnAcuBySectionQuery({
                ...baseInput,
                globalContent: {
                    _id: '/politica',
                    acumuladoGeneral: { mostrar_en_acu_apps: 'false' }
                }
            });

            expect(result.excludeSourceOrigin).toBe('ArcImporter-LnData');
        });

        it('should leave excludeSourceOrigin empty when mostrar_en_acu_apps is "true"', () => {
            const result = buildLnAcuBySectionQuery({
                ...baseInput,
                globalContent: {
                    _id: '/politica',
                    acumuladoGeneral: { mostrar_en_acu_apps: 'true' }
                }
            });

            expect(result.excludeSourceOrigin).toBe('');
        });

        it('should build distributor query when distributorId is provided', () => {
            const result = buildLnAcuBySectionQuery({
                ...baseInput,
                distributorId: 'dist-123'
            });

            expect(result).toEqual({
                page: 1,
                imageConfig: 'm',
                api: true,
                'arc-site': 'la-nacion-ar',
                distributorId: 'dist-123',
                size: 10,
                excludeSourceOrigin: ''
            });
            expect(result.sectionId).toBeUndefined();
        });

        it('should be case-insensitive when matching the section key', () => {
            const result = buildLnAcuBySectionQuery({
                ...baseInput,
                globalContent: { _id: '/SUSCRIPTORES' }
            });

            expect(result.tagId).toBe('la-nacion-cerca');
        });

        describe('source-driven strategy', () => {
            it('should route to distributor branch when source=distributorSource even if distributorId is missing', () => {
                const result = buildLnAcuBySectionQuery({
                    ...baseInput,
                    source: 'distributorSource'
                });

                expect(result).toHaveProperty('distributorId');
                expect(result.sectionId).toBeUndefined();
            });

            it('should route to section branch when source=sectionSource even if distributorId is present', () => {
                const result = buildLnAcuBySectionQuery({
                    ...baseInput,
                    distributorId: 'dist-123',
                    source: 'sectionSource'
                });

                expect(result.sectionId).toBe('/politica');
                expect(result.distributorId).toBeUndefined();
            });

            it('should fall back to distributorId shape detection when source is missing', () => {
                const result = buildLnAcuBySectionQuery({
                    ...baseInput,
                    distributorId: 'dist-123'
                });

                expect(result.distributorId).toBe('dist-123');
                expect(result.sectionId).toBeUndefined();
            });

            it('should still take suscriptores branch even when source=distributorSource', () => {
                const result = buildLnAcuBySectionQuery({
                    ...baseInput,
                    globalContent: { _id: '/suscriptores' },
                    source: 'distributorSource'
                });

                expect(result.tagId).toBe('la-nacion-cerca');
                expect(result.distributorId).toBeUndefined();
            });
        });
    });

    describe('resolveVersion', () => {
        it('should return numeric versionUri when provided', () => {
            expect(resolveVersion('1', 2)).toBe(1);
            expect(resolveVersion('3', NaN)).toBe(3);
        });

        it('should fall back to urlVersionNum when versionUri is empty/null/undefined', () => {
            expect(resolveVersion('', 2)).toBe(2);
            expect(resolveVersion(null, 2)).toBe(2);
            expect(resolveVersion(undefined, 2)).toBe(2);
        });

        it('should return DEFAULT_VERSION when both inputs are NaN', () => {
            expect(resolveVersion(undefined, NaN)).toBe(DEFAULT_VERSION);
            expect(resolveVersion('', NaN)).toBe(DEFAULT_VERSION);
        });

        it('should treat non-numeric versionUri as NaN and fall back to urlVersionNum', () => {
            expect(resolveVersion('abc', 2)).toBe(2);
        });

        it('should return DEFAULT_VERSION when versionUri is non-numeric and urlVersionNum is NaN', () => {
            expect(resolveVersion('abc', NaN)).toBe(DEFAULT_VERSION);
        });
    });

    describe('resolveIndexTransform', () => {
        it('should pick API_DATA[category][version] when both exist', () => {
            const v2Global = require('../../../../../components/private/LN/api/v2/global/accumulated');
            const result = resolveIndexTransform(
                { versionUri: '2', categoryUri: 'global' },
                '/api/v2/notas/'
            );

            expect(result).toBe(v2Global);
        });

        it('should default category to "global" when categoryUri is missing', () => {
            const v2Global = require('../../../../../components/private/LN/api/v2/global/accumulated');
            const result = resolveIndexTransform(
                { versionUri: '2' },
                '/api/v2/notas/'
            );

            expect(result).toBe(v2Global);
        });

        it('should resolve mobile branch with version 1', () => {
            const v1Mobile = require('../../../../../components/private/LN/api/v1/mobile/accumulated');
            const result = resolveIndexTransform(
                { versionUri: '1', categoryUri: 'mobile' },
                '/api/mobile/v1/notas/'
            );

            expect(result).toBe(v1Mobile);
        });

        it('should fall back to global for unknown version when no candidate matches', () => {
            const browser =
                require('../../../../../components/private/common/utils/browser').default;
            browser.getApiVersion.mockReturnValueOnce('2');
            const v2Global = require('../../../../../components/private/LN/api/v2/global/accumulated');

            const result = resolveIndexTransform(
                { versionUri: '99', categoryUri: 'global' },
                '/api/v2/notas/'
            );

            expect(result).toBe(v2Global);
        });

        it('should fall back to global when category branch is missing', () => {
            const browser =
                require('../../../../../components/private/common/utils/browser').default;
            browser.getApiVersion.mockReturnValueOnce('2');
            const v2Global = require('../../../../../components/private/LN/api/v2/global/accumulated');

            const result = resolveIndexTransform(
                { versionUri: '2', categoryUri: 'unknown' },
                '/api/v2/notas/'
            );

            expect(result).toBe(v2Global);
        });
    });

    describe('resolveTitle', () => {
        it('should return routeParams.title when present', () => {
            const result = resolveTitle(
                { title: 'Custom Title' },
                { name: 'Política' },
                'fallback',
                { name: 'Section Source' }
            );

            expect(result).toBe('Custom Title');
        });

        it('should prefer hierarchy_navigation from sectionSource over globalContent', () => {
            const result = resolveTitle(
                {},
                {
                    name: 'Política',
                    acumuladoGeneral: {
                        hierarchy_navigation: 'Global Hierarchy'
                    }
                },
                'fallback',
                {
                    name: 'Section Source',
                    acumuladoGeneral: {
                        hierarchy_navigation: 'Section Hierarchy'
                    }
                }
            );

            expect(result).toBe('Section Hierarchy');
        });

        it('should use globalContent hierarchy_navigation when no sectionSource is given', () => {
            const result = resolveTitle(
                {},
                {
                    name: 'Política',
                    acumuladoGeneral: {
                        hierarchy_navigation: 'Global Hierarchy'
                    }
                },
                'fallback',
                null
            );

            expect(result).toBe('Global Hierarchy');
        });

        it('should fall back to sectionSource.name when no hierarchy_navigation exists', () => {
            const result = resolveTitle({}, { name: 'Política' }, 'fallback', {
                name: 'Section Source Name'
            });

            expect(result).toBe('Section Source Name');
        });

        it('should fall back to provided name when nothing else is available', () => {
            const result = resolveTitle(
                {},
                { name: 'Política' },
                'fallback',
                null
            );

            expect(result).toBe('fallback');
        });

        it('should treat routeParams.title === null as missing and fall back', () => {
            const result = resolveTitle(
                { title: null },
                { name: 'Política' },
                'fallback',
                null
            );

            expect(result).toBe('fallback');
        });
    });

    describe('buildAcuData', () => {
        it('should build the base acuData payload', () => {
            const result = buildAcuData({
                title: 'Política',
                configuration: { foo: 'bar' },
                routeParams: {},
                elements: {
                    content_elements: [{ id: 1 }],
                    next: 2,
                    count: 100
                }
            });

            expect(result).toEqual({
                tipoAcumulado: 1,
                name: 'Política',
                articles: [{ id: 1 }],
                paginator: 2,
                total: 100,
                configuration: { foo: 'bar' }
            });
            expect(result.tag).toBeUndefined();
        });

        it('should include tag when routeParams.tag is provided', () => {
            const result = buildAcuData({
                title: 'Tag Page',
                configuration: {},
                routeParams: { tag: 'mi-tag' },
                elements: { content_elements: [], next: null, count: 0 }
            });

            expect(result.tag).toBe('mi-tag');
        });

        it('should NOT include tag when routeParams.tag is empty string', () => {
            const result = buildAcuData({
                title: 'Empty Tag',
                configuration: {},
                routeParams: { tag: '' },
                elements: { content_elements: [], next: null, count: 0 }
            });

            expect(result.tag).toBeUndefined();
        });

        it('should NOT include tag when routeParams.tag is null/undefined', () => {
            const resultNull = buildAcuData({
                title: 't',
                configuration: {},
                routeParams: { tag: null },
                elements: { content_elements: [], next: null, count: 0 }
            });
            const resultUndef = buildAcuData({
                title: 't',
                configuration: {},
                routeParams: {},
                elements: { content_elements: [], next: null, count: 0 }
            });

            expect(resultNull.tag).toBeUndefined();
            expect(resultUndef.tag).toBeUndefined();
        });
    });

    describe('isDeepPagination', () => {
        it('should return true when page * size - size > BANNERS_PAGINATION_THRESHOLD', () => {
            // 3 * 10 - 10 = 20 > 16
            expect(isDeepPagination(3, 10)).toBe(true);
        });

        it('should return false when below threshold', () => {
            // 1 * 10 - 10 = 0 < 16
            expect(isDeepPagination(1, 10)).toBe(false);
            // 2 * 10 - 10 = 10 < 16
            expect(isDeepPagination(2, 10)).toBe(false);
        });

        it('should return false when page is NaN', () => {
            expect(isDeepPagination(NaN, 10)).toBe(false);
        });

        it('should return false when size is NaN', () => {
            expect(isDeepPagination(3, NaN)).toBe(false);
        });

        it('should return false at exactly the threshold (not strictly greater)', () => {
            // 3 * 8 - 8 = 16, not > 16
            expect(isDeepPagination(3, 8)).toBe(false);
        });
    });

    describe('warnIfMissingSectionData', () => {
        let consoleSpy;

        beforeEach(() => {
            consoleSpy = jest
                .spyOn(console, 'warn')
                .mockImplementation(() => {});
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should NOT warn when site is present', () => {
            warnIfMissingSectionData({ site: { name: 'site' } });
            expect(consoleSpy).not.toHaveBeenCalled();
        });

        it('should NOT warn when distributorId is present', () => {
            warnIfMissingSectionData({ distributorId: 'dist-123' });
            expect(consoleSpy).not.toHaveBeenCalled();
        });

        it('should NOT warn when _id is /suscriptores', () => {
            warnIfMissingSectionData({ _id: '/suscriptores' });
            expect(consoleSpy).not.toHaveBeenCalled();
        });

        it('should warn when none of site/distributorId/suscriptores are present', () => {
            warnIfMissingSectionData({ _id: '/politica' });
            expect(consoleSpy).toHaveBeenCalledTimes(1);
        });

        it('should warn when globalContent is null/undefined', () => {
            warnIfMissingSectionData(null);
            expect(consoleSpy).toHaveBeenCalledTimes(1);

            warnIfMissingSectionData(undefined);
            expect(consoleSpy).toHaveBeenCalledTimes(2);
        });
    });
});
