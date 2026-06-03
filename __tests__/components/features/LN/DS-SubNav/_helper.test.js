import {
    setTitle,
    setUrl,
    getPrefixText,
    buildCategories,
    isPrimarySection,
    buildSubNavContentData
} from '../../../../../components/features/LN/DS-SubNav/_helpers';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock(
    '../../../../../components/private/common/utils/capitalizeFirstLetter',
    () =>
        jest.fn(str => (str ? str.charAt(0).toUpperCase() + str.slice(1) : ''))
);

jest.mock(
    '../../../../../components/private/common/utils/recetaDictionary',
    () => jest.fn(name => name)
);

jest.mock(
    '../../../../../components/private/common/utils/image/resizer/v2/resizerHelper',
    () => ({
        __esModule: true,
        default: jest.fn(image => image),
        replaceUrlResizerToWWW: jest.fn(image => image)
    })
);

describe('Components - features - LN - DS-SubNav - _helpers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('setTitle', () => {
        it('returns capitalized replaceTitle when provided', () => {
            const result = setTitle('custom title', {});
            expect(result).toBe('Custom title');
        });

        it('returns Payload item name when available', () => {
            const globalContent = {
                Payload: { items: [{ name: 'payload name' }] }
            };
            const result = setTitle(null, globalContent);
            expect(result).toBe('Payload name');
        });

        it('returns name when node_type is section', () => {
            const globalContent = {
                node_type: 'section',
                name: 'section name'
            };
            const result = setTitle(null, globalContent);
            expect(result).toBe('Section name');
        });

        it('returns byline when available', () => {
            const globalContent = { byline: 'author name' };
            const result = setTitle(null, globalContent);
            expect(result).toBe('Author name');
        });

        it('returns empty string when no data available', () => {
            const result = setTitle(null, {});
            expect(result).toBe('');
        });

        it('returns empty string when globalContent is undefined', () => {
            const result = setTitle(null, undefined);
            expect(result).toBe('');
        });

        it('prioritizes replaceTitle over other options', () => {
            const globalContent = {
                Payload: { items: [{ name: 'payload' }] },
                node_type: 'section',
                name: 'section',
                byline: 'author'
            };
            const result = setTitle('custom', globalContent);
            expect(result).toBe('Custom');
        });
    });

    describe('setUrl', () => {
        it('returns canonical_url for tags node_type', () => {
            const globalContent = {
                node_type: 'tags',
                canonical_url: '/tema/test-tag'
            };
            const result = setUrl(globalContent);
            expect(result).toBe('https://www.lanacion.com.ar/tema/test-tag');
        });

        it('returns id with trailing slash for section node_type', () => {
            const globalContent = {
                node_type: 'section',
                _id: '/economia'
            };
            const result = setUrl(globalContent);
            expect(result).toBe('https://www.lanacion.com.ar/economia/');
        });

        it('returns SITE_LANACION for other node_types', () => {
            const globalContent = { node_type: 'story' };
            const result = setUrl(globalContent);
            expect(result).toBe('https://www.lanacion.com.ar');
        });

        it('returns SITE_LANACION when globalContent is undefined', () => {
            const result = setUrl(undefined);
            expect(result).toBe('https://www.lanacion.com.ar');
        });

        it('handles tags without canonical_url', () => {
            const globalContent = { node_type: 'tags' };
            const result = setUrl(globalContent);
            expect(result).toBe('https://www.lanacion.com.ar');
        });
    });

    describe('getPrefixText', () => {
        it('returns empty string when no prefixTitle', () => {
            const result = getPrefixText(false, 'title', '/recetas/test', null);
            expect(result).toBe('');
        });

        it('returns empty string when no title', () => {
            const result = getPrefixText(
                false,
                '',
                '/recetas/test',
                'Recetas de'
            );
            expect(result).toBe('');
        });

        it('returns empty string when isPrimarySec is true', () => {
            const result = getPrefixText(
                true,
                'title',
                '/recetas/test',
                'Recetas de'
            );
            expect(result).toBe('');
        });

        it('returns empty string when url does not include /recetas', () => {
            const result = getPrefixText(
                false,
                'title',
                '/economia',
                'Recetas de'
            );
            expect(result).toBe('');
        });

        it('returns prefixTitle with space when all conditions met', () => {
            const result = getPrefixText(
                false,
                'Pollo',
                '/recetas/pollo',
                'Recetas de'
            );
            expect(result).toBe('Recetas de ');
        });

        it('handles undefined url', () => {
            const result = getPrefixText(
                false,
                'title',
                undefined,
                'Recetas de'
            );
            expect(result).toBe('');
        });
    });

    describe('buildCategories', () => {
        it('returns null when navigationList is empty', () => {
            const result = buildCategories([], '#000');
            expect(result).toBeNull();
        });

        it('returns null when navigationList is null', () => {
            const result = buildCategories(null, '#000');
            expect(result).toBeNull();
        });

        it('returns null when navigationList is undefined', () => {
            const result = buildCategories(undefined, '#000');
            expect(result).toBeNull();
        });

        it('builds categories with correct structure', () => {
            const navigationList = [
                {
                    _id: '/categoria-1',
                    name: 'Categoria 1',
                    node_type: 'section'
                }
            ];
            const result = buildCategories(navigationList, '#ff0000');

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                key: '/categoria-1',
                link: '/categoria-1/',
                textname: 'Categoria 1',
                title: 'Ir a Categoria 1',
                style: { color: '#ff0000' }
            });
        });

        it('uses nav_title when available', () => {
            const navigationList = [
                {
                    _id: '/cat',
                    name: 'Name',
                    navigation: { nav_title: 'Nav Title' }
                }
            ];
            const result = buildCategories(navigationList, null);

            expect(result[0].textname).toBe('Nav Title');
        });

        it('uses display_name for link node_type', () => {
            const navigationList = [
                {
                    _id: '/link',
                    name: 'Name',
                    node_type: 'link',
                    display_name: 'Display Name',
                    url: 'https://external.com'
                }
            ];
            const result = buildCategories(navigationList, null);

            expect(result[0].textname).toBe('Display Name');
            expect(result[0].link).toBe('https://external.com');
        });

        it('builds recetas title when parent includes /recetas', () => {
            const navigationList = [
                {
                    _id: '/recetas/pollo',
                    name: 'Pollo',
                    parent: { default: '/recetas' }
                }
            ];
            const result = buildCategories(navigationList, null);

            expect(result[0].title).toBe('Ir a notas de Pollo');
        });

        it('does not add style when colorCategory is not provided', () => {
            const navigationList = [{ _id: '/cat', name: 'Cat' }];
            const result = buildCategories(navigationList, null);

            expect(result[0].style).toBeUndefined();
        });

        it('filters out falsy items', () => {
            const navigationList = [
                { _id: '/cat1', name: 'Cat1' },
                null,
                undefined,
                { _id: '/cat2', name: 'Cat2' }
            ];
            const result = buildCategories(navigationList, null);

            expect(result).toHaveLength(2);
        });
    });

    describe('isPrimarySection', () => {
        it('returns false when sectionId is empty', () => {
            const result = isPrimarySection('');
            expect(result).toBe(false);
        });

        it('returns false when sectionId is null', () => {
            const result = isPrimarySection(null);
            expect(result).toBe(false);
        });

        it('returns false when sectionId is undefined', () => {
            const result = isPrimarySection(undefined);
            expect(result).toBe(false);
        });

        it('returns true for primary section (single level)', () => {
            const result = isPrimarySection('/economia');
            expect(result).toBe(true);
        });

        it('returns false for subsection (multiple levels)', () => {
            const result = isPrimarySection('/economia/negocios');
            expect(result).toBe(false);
        });

        it('returns false for deep subsection', () => {
            const result = isPrimarySection('/economia/negocios/finanzas');
            expect(result).toBe(false);
        });
    });

    describe('buildSubNavContentData', () => {
        const defaultParams = {
            customFields: {},
            globalContent: {
                _id: '/economia',
                node_type: 'section',
                name: 'Economía'
            },
            navigation: [{ _id: '/cat', name: 'Cat' }],
            isPrimary: true,
            colorCategory: '#ff0000',
            logoImage: null,
            idLogoImage: ''
        };

        it('returns correct sectionId', () => {
            const result = buildSubNavContentData(defaultParams);
            expect(result.sectionId).toBe('/economia');
        });

        it('returns correct titleText', () => {
            const result = buildSubNavContentData(defaultParams);
            expect(result.titleText).toBe('Economía');
        });

        it('returns correct url', () => {
            const result = buildSubNavContentData(defaultParams);
            expect(result.url).toBe('https://www.lanacion.com.ar/economia/');
        });

        it('returns categories array', () => {
            const result = buildSubNavContentData(defaultParams);
            expect(result.categories).toHaveLength(1);
        });

        it('returns hasLogo false when no idLogoImage', () => {
            const result = buildSubNavContentData(defaultParams);
            expect(result.hasLogo).toBe(false);
        });

        it('returns hasLogo true when idLogoImage provided', () => {
            const result = buildSubNavContentData({
                ...defaultParams,
                idLogoImage: 'logo-123'
            });
            expect(result.hasLogo).toBe(true);
        });

        it('returns isJuegosSection true for /juegos', () => {
            const result = buildSubNavContentData({
                ...defaultParams,
                globalContent: {
                    _id: '/juegos',
                    node_type: 'section',
                    name: 'Juegos'
                }
            });
            expect(result.isJuegosSection).toBe(true);
        });

        it('returns isJuegosSection false for other sections', () => {
            const result = buildSubNavContentData(defaultParams);
            expect(result.isJuegosSection).toBe(false);
        });

        it('returns imageProps with logo data', () => {
            const logoImage = {
                width: 200,
                height: 100,
                url: 'https://example.com/logo.png',
                resized_urls: [
                    {
                        resizedUrl: 'https://example.com/logo-resized.png',
                        option: { width: 150, height: 75 }
                    }
                ]
            };
            const result = buildSubNavContentData({
                ...defaultParams,
                logoImage,
                idLogoImage: 'logo-123'
            });

            expect(result.imageProps).toEqual({
                width: 150,
                height: 75,
                src: 'https://example.com/logo-resized.png'
            });
        });

        it('falls back to original dimensions when no resized', () => {
            const logoImage = {
                width: 200,
                height: 100,
                url: 'https://example.com/logo.png'
            };
            const result = buildSubNavContentData({
                ...defaultParams,
                logoImage,
                idLogoImage: 'logo-123'
            });

            expect(result.imageProps).toEqual({
                width: 200,
                height: 100,
                src: 'https://example.com/logo.png'
            });
        });

        it('handles null logoImage', () => {
            const result = buildSubNavContentData({
                ...defaultParams,
                logoImage: null
            });

            expect(result.imageProps).toEqual({
                width: undefined,
                height: undefined,
                src: undefined
            });
        });

        it('includes prefixTitle in titleText when conditions met', () => {
            const result = buildSubNavContentData({
                ...defaultParams,
                customFields: { prefixTitle: 'Recetas de' },
                globalContent: {
                    _id: '/recetas/pollo',
                    node_type: 'section',
                    name: 'Pollo'
                },
                isPrimary: false
            });

            expect(result.titleText).toBe('Recetas de Pollo');
        });

        it('uses replaceTitle from customFields', () => {
            const result = buildSubNavContentData({
                ...defaultParams,
                customFields: { replaceTitle: 'Custom Title' }
            });

            expect(result.titleText).toBe('Custom Title');
        });
    });
});
