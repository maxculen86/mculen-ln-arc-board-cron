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
        isAdmin: false,
        'arc-site': 'la-nacion-ar'
    };

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
        height: 720,
        isAdmin: false,
        isInApertura: true,
        url:
            'https://d3us6z9haan6vf.cloudfront.net/03-30-2022/t_5f8a3d21151443b99020143df7290b7a_name_file_1280x720_2000_v3_1_.jpg',
        width: 1280
    };

    test('Return test when imageConfig are not defined ', () => {
        const query = {
            ...siteProps,
            imageConfig: undefined
        };
        expect(getVideoImagePresets(responseVideoSource, query)).toStrictEqual({
            ...result,
            configSizes: []
        });
    });

    test('Return test when arcSite is not defined ', () => {
        const query = {
            ...siteProps,
            'arc-site': undefined
        };
        expect(getVideoImagePresets(responseVideoSource, query)).toStrictEqual(
            result
        );
    });

    test('Return test when all props are correct', () => {
        expect(
            getVideoImagePresets(responseVideoSource, siteProps)
        ).toStrictEqual(result);
    });
});
