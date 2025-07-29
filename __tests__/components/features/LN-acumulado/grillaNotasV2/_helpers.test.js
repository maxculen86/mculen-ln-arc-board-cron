import {
    formatDisplayDate,
    getCardPropsFromArticle,
    shouldStoreArticles
} from '../../../../../components/features/LN-acumulado/grillaNotasV2/_helpers';
import * as dateUtil from '../../../../../components/private/common/utils/dateAndTimeUtil';
import get from '../../../../../components/private/common/utils/get';
import * as helpers from '../../../../../components/features/LN-acumulado/grillaNotasV2/_helpers';

jest.mock('../../../../../components/private/common/utils/get', () =>
    jest.fn()
);
get.mockImplementation((obj, path, defaultVal) => {
    if (!obj || !path) return defaultVal;
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
        if (result && Object.prototype.hasOwnProperty.call(result, key)) {
            result = result[key];
        } else {
            return defaultVal;
        }
    }
    return result === undefined ? defaultVal : result;
});

jest.mock(
    '../../../../../components/private/common/LN-10/transformImageData',
    () => ({
        __esModule: true,
        default: jest.fn(() => ({
            height: 513,
            width: 768,
            alt: 'PRUEBA LIVEBLOG EDITORIAL - Video JW',
            src: 'https://sandbox.lanacion.com.ar/resizer/v2/prueba-pie-de-JREVNUCVJZC2VJLUFGBDZBAWVQ.jpg?auth=7db50721fdd3a3caea984cc604de3e2041db93d6bccf6d3b7f57c2a299bc7237&width=300&height=200&quality=70&smart=true',
            srcset: 'https://sandbox.lanacion.com.ar/resizer/v2/prueba-pie-de-JREVNUCVJZC2VJLUFGBDZBAWVQ.jpg?auth=7db50721fdd3a3caea984cc604de3e2041db93d6bccf6d3b7f57c2a299bc7237&width=375&height=250&quality=70&smart=true 375w, https://sandbox.lanacion.com.ar/resizer/v2/prueba-pie-de-JREVNUCVJZC2VJLUFGBDZBAWVQ.jpg?auth=7db50721fdd3a3caea984cc604de3e2041db93d6bccf6d3b7f57c2a299bc7237&width=300&height=200&quality=70&smart=true 300w',
            loading: 'lazy',
            fetchPriority: 'low',
            type: 'image',
            sources: []
        }))
    })
);

jest.mock(
    '../../../../../components/private/common/utils/unescapeHtml',
    () => ({
        __esModule: true,
        default: jest.fn(text => text)
    })
);

jest.mock(
    '../../../../../components/private/common/utils/getAuthorsAsString',
    () => ({
        __esModule: true,
        default: jest.fn(
            () => 'Por Florencia Fernández Blanco y Federico Pagani'
        )
    })
);

jest.mock('../../../../../properties/sites/la-nacion-ar', () => ({
    __esModule: true,
    default: {
        layoutsName: {
            Home: 'Home',
            HomeLN10: 'HomeLN10'
        }
    }
}));

jest.mock(
    '../../../../../components/private/common/utils/sectionUtils',
    () => ({
        formatText: jest.fn()
    })
);

describe('Components -  features - LN-acumulado - grillaNotasV2 - _helpers', () => {
    describe('shouldStoreArticles', () => {
        it('returns false if articles is empty or article has no _id', () => {
            expect(shouldStoreArticles([], {})).toBe(false);
            expect(shouldStoreArticles([{}], {})).toBe(false);
        });

        it('returns true if first article _id is not in stored articles', () => {
            const articles = [{ _id: 'MXD55U4ZUBE5JLAN5YG2K53XYQ' }];
            const storedArticles = {
                page1: [
                    { _id: 'M347894ZUBE5JLAN5YG2K53XYQ' },
                    { _id: 'W233ER4ZUBE5JLAN5YG2K53XYQ' }
                ]
            };
            expect(shouldStoreArticles(articles, storedArticles)).toBe(true);
        });

        it('returns false if first article _id is in stored articles', () => {
            const articles = [{ _id: 'MXD55U4ZUBE5JLAN5YG2K53XYQ' }];
            const storedArticles = {
                page1: [{ _id: 'MXD55U4ZUBE5JLAN5YG2K53XYQ' }]
            };
            expect(shouldStoreArticles(articles, storedArticles)).toBe(false);
        });
    });

    describe('formatDisplayDate', () => {
        beforeEach(() => {
            jest.spyOn(dateUtil, 'addHoursAndFormat').mockClear();
            jest.spyOn(dateUtil, 'default').mockClear();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('returns null if rawDate is falsy', () => {
            expect(formatDisplayDate(null)).toBeNull();
            expect(formatDisplayDate(undefined)).toBeNull();
        });

        it('uses addHoursAndFormat when isUltimasNoticias is true', () => {
            const mockDate = '2023-01-01T12:00:00Z';
            const adjustedDate = '2023-01-01T15:00:00Z';

            jest.spyOn(dateUtil, 'addHoursAndFormat').mockReturnValue(
                adjustedDate
            );
            jest.spyOn(dateUtil, 'default').mockReturnValue({
                date: '21 de julio de 2025',
                time: '10:30'
            });

            const result = formatDisplayDate(mockDate, true);

            expect(dateUtil.addHoursAndFormat).toHaveBeenCalledWith(
                3,
                mockDate
            );
            expect(dateUtil.default).toHaveBeenCalledWith(adjustedDate);
            expect(result).toBe('21 de julio de 2025');
        });

        it('bypasses addHoursAndFormat when isUltimasNoticias is false', () => {
            const mockDate = '2023-01-01T12:00:00Z';

            jest.spyOn(dateUtil, 'default').mockReturnValue({
                date: '15 de julio de 2025',
                time: '10:30'
            });

            const result = formatDisplayDate(mockDate, false);

            expect(dateUtil.default).toHaveBeenCalledWith(mockDate);
            expect(result).toBe('15 de julio de 2025');
        });
    });

    describe('getCardPropsFromArticle', () => {
        beforeEach(() => {
            jest.spyOn(helpers, 'formatDisplayDate').mockImplementation(
                () => '10 de julio de 2025'
            );
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return expected props for article', () => {
            const article = {
                _id: 'MXD55U4ZUBE5JLAN5YG2K53XYQ',
                headlines: {
                    mobile: '',
                    basic: 'Prueba Liveblog Editorial',
                    web: 'Web Liveblog'
                },
                label: {
                    volanta: { text: 'Web Liveblog' },
                    chapita: { text: 'EN VIVO' }
                },
                website_url:
                    '/economia/prueba-liveblog-editorial-video-jw-nid20052025/',
                display_date: '2025-07-10T15:03:30.000Z',
                taxonomy: {
                    tags: ['economia', 'dolar']
                },
                promo_items: {
                    basic: {
                        type: 'image',
                        url: 'https://some-image-url.jpg'
                    }
                },
                credits: {
                    by: [
                        { name: 'Florencia Fernández Blanco' },
                        { name: 'Federico Pagani' }
                    ]
                }
            };

            const result = getCardPropsFromArticle(
                article,
                false,
                { name: 'Economia' },
                'LN-acumulado-v2'
            );

            expect(result).toEqual({
                key: 'MXD55U4ZUBE5JLAN5YG2K53XYQ',
                title: 'Prueba Liveblog Editorial',
                lead: '',
                badgeText: 'EN VIVO',
                badgeTypes: 'negative',
                href: '/economia/prueba-liveblog-editorial-video-jw-nid20052025/',
                displayDate: '10 de julio de 2025',
                tags: ['economia'],
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                mediaData: {
                    height: 513,
                    width: 768,
                    alt: 'PRUEBA LIVEBLOG EDITORIAL - Video JW',
                    src: 'https://sandbox.lanacion.com.ar/resizer/v2/prueba-pie-de-JREVNUCVJZC2VJLUFGBDZBAWVQ.jpg?auth=7db50721fdd3a3caea984cc604de3e2041db93d6bccf6d3b7f57c2a299bc7237&width=300&height=200&quality=70&smart=true',
                    srcset: 'https://sandbox.lanacion.com.ar/resizer/v2/prueba-pie-de-JREVNUCVJZC2VJLUFGBDZBAWVQ.jpg?auth=7db50721fdd3a3caea984cc604de3e2041db93d6bccf6d3b7f57c2a299bc7237&width=375&height=250&quality=70&smart=true 375w, https://sandbox.lanacion.com.ar/resizer/v2/prueba-pie-de-JREVNUCVJZC2VJLUFGBDZBAWVQ.jpg?auth=7db50721fdd3a3caea984cc604de3e2041db93d6bccf6d3b7f57c2a299bc7237&width=300&height=200&quality=70&smart=true 300w',
                    loading: 'lazy',
                    fetchPriority: 'low',
                    type: 'image',
                    sources: []
                },
                authors: 'Por Florencia Fernández Blanco y Federico Pagani'
            });
        });
    });
});
