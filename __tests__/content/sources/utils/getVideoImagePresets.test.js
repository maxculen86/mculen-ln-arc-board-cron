import getVideoImagePresets from '../../../../content/sources/utils/getVideoImagePresets';
import responseVideoSource from '../../../../__mocks__/data/videos/responseVideoSource.json';
import getProperties from 'fusion:properties';

jest.mock('fusion:properties', () => () =>
    ({
        getProperties: () => {
            return {
                imageConfig: {
                    resize: {
                        featuredFocalIzquierdo: {
                            promo_items: {
                                sizes: [
                                    {
                                        width: 560,
                                        height: 373,
                                        media: '(min-width: 1280px)',
                                        useFullSize: true,
                                        proportion: '3:2',
                                        media_preload: '(min-width: 1280.1px)'
                                    },
                                    {
                                        width: 637,
                                        height: 424,
                                        media: '(min-width: 1024px)',
                                        useFullSize: true,
                                        proportion: '3:2',
                                        media_preload:
                                            '(min-width: 1024.1px and max-width: 1280px)'
                                    },
                                    {
                                        width: 465,
                                        height: 310,
                                        media: '(min-width: 768px)',
                                        useFullSize: true,
                                        proportion: '3:2',
                                        media_preload:
                                            '(min-width: 768.1px and max-width: 1024px)'
                                    }
                                ]
                            }
                        }
                    }
                }
            };
        }
    }.getProperties())
);

describe('Test getVideoImagePresets', () => {
    const siteProps = {
        imageConfig: 'featuredFocalIzquierdo',
        isInApertura: true,
        isAdmin: false
    };

    const arcSite = 'la-nacion-ar';

    const result = {
        configSizes: [
            {
                width: 560,
                height: 373,
                media: '(min-width: 1280px)',
                useFullSize: true,
                proportion: '3:2',
                media_preload: '(min-width: 1280.1px)'
            },
            {
                width: 637,
                height: 424,
                media: '(min-width: 1024px)',
                useFullSize: true,
                proportion: '3:2',
                media_preload: '(min-width: 1024.1px and max-width: 1280px)'
            },
            {
                width: 465,
                height: 310,
                media: '(min-width: 768px)',
                useFullSize: true,
                proportion: '3:2',
                media_preload: '(min-width: 768.1px and max-width: 1024px)'
            }
        ],
        height: 513,
        isAdmin: false,
        isInApertura: true,
        url:
            'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fd3us6z9haan6vf.cloudfront.net%2F03-02-2023%2Ft_5d96c8dea565416da3f6f8875641a5ff_name_file_1280x720_2000_v3_1_.jpg?auth=e74e861f0ae9b8af4da45668d1d52202c5edfb13c0928ff93167d6fcf83308d8&width=768&quality=80&smart=false',
        width: 768
    };

    test('Return test when imageConfig are not defined ', () => {
        const query = {
            ...siteProps,
            imageConfig: undefined
        };
        expect(
            getVideoImagePresets(responseVideoSource, query, arcSite)
        ).toStrictEqual({
            ...result,
            configSizes: []
        });
    });

    test('Return test when arcSite is not defined ', () => {
        const query = {
            ...siteProps
        };
        const arcSite = undefined;
        expect(
            getVideoImagePresets(responseVideoSource, query, arcSite)
        ).toStrictEqual(null);
    });

    test('Return test when all props are correct', () => {
        expect(
            getVideoImagePresets(responseVideoSource, siteProps, arcSite)
        ).toStrictEqual(result);
    });

    test('Return test when arcSite is ott', () => {
        const arcSite = 'ott';
        expect(
            getVideoImagePresets(responseVideoSource, siteProps, arcSite)
        ).toStrictEqual({
            ...result,
            configSizes: []
        });
    });
});
