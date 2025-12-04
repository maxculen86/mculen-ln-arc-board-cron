import responseVideoSource from '../../../../../__mocks__/data/videos/responseVideoSource.json';
import responseArticleSourceNota from '../../../../../__mocks__/data/articles/2CIOHVMKJBHKDMMHH2WBIZGJWE.json';
import responseRelatedImageSource from '../../../../../__mocks__/data/images/responseRelatedImageSource.json';
import article from '../../../../../__mocks__/data/articles/RGC7MFGFYBGJJGPGZJ5OITBFI4.json';
import article2 from '../../../../../__mocks__/data/articles/RGC7MFGFYBGJJGPGZJ5OITBFI4-2.json';

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

import {
    getMediaData,
    validateVariant,
    getBadgetConfig,
    getLiveblogTitles,
    showMarquee,
    showMarqueeImage,
    validateSubhead,
    showExtraClass,
    getTypeOfMedia,
    getOnlyHoursMinutes,
    validateMedia,
    showSubheadText,
    showSection,
    getDataAuthor,
    getDataAttributesForViewability,
    translateSectionName,
    getDynamicStreamOperator,
    transformVideoData,
    generateLazyLoadEmbedCode,
    getCllBoard,
    shouldHighlightCustomVoice,
    getIndexOfFeature,
    isSubtypeLiveblog
} from '../../../../../components/features/LN-10/article/_helper';
import * as helperModule from '../../../../../components/features/LN-10/article/_helper';
import buildCardConfig from '../../../../../components/features/LN-10/article/utils/card-building/buildCardConfig';
import { isInApertura } from '../../../../../components/features/LN-10/article/common/_helper-WebApi';
import contentElementesLiveblog from '../../../../../__mocks__/data/articles/contentElementsLiveblog.json';
import {
    renderablesWithBombaEager,
    renderablesWithChainAperturaEager
} from '../../../../../__mocks__/data/renderables/renderablesLN10eager.js';
import { size } from '../../../../../components/private/common/utils/diagramationRules';
import { getMockRenderables } from '../../../../../__mocks__/data/renderables/renderablesForPreload';

describe('Components - Features - LN-10 - Article - _helper', () => {
    const getProps = ({ video, image, customFields, renderables } = {}) => {
        return {
            article: responseArticleSourceNota,
            video,
            image,
            customFields,
            renderables
        };
    };

    const videoId = 'abc-id-video';
    const imageId = 'abc-imageId';
    const iframe =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/sITCH5csTmo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';

    const iframeWithoutSrc =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/sITCH5csTmo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';

    describe('Test function showSubHeadText', () => {
        it('should show subHead', () => {
            const subHead = showSubheadText({
                article,
                withSubhead: true,
                description: ''
            });
            expect(subHead.trim()).toEqual(
                'Las personas que se identifican como homosexuales en Uganda se arriesgan a ser condenadas a cadena perpetua después de que el Parlamento de la nación africana aprobara un nuevo proyecto de ley.'
            );
        });
        it('should not show subHead', () => {
            const subHead = showSubheadText({
                article,
                withSubhead: false,
                description: ''
            });
            expect(subHead).toBeFalsy();
        });

        it('should show subHead of customField', () => {
            const subHead = showSubheadText({
                article,
                withSubhead: true,
                description: 'Hola mundo'
            });
            expect(subHead).toEqual('Hola mundo');
        });
    });
    describe('Test function showMarqueImage', () => {
        it('should showMarqueeImage', () => {
            const result = showMarqueeImage({
                withMarqueeImg: true,
                authors: '',
                authorsQuantity: 1,
                url: 'https://lanacion.com.ar'
            });
            expect(result).toBeTruthy();
        });
        it('should not showMarqueeImage without marquee img', () => {
            const result = showMarqueeImage({
                withMarqueeImg: false,
                authors: 'Lorem issum',
                authorsQuantity: 1,
                url: 'https://lanacion.com.ar'
            });
            expect(result).toBeFalsy();
        });
        it('should not showMarqueeImage 2 authors', () => {
            const result = showMarqueeImage({
                withMarqueeImg: true,
                authors: 'Lorem issum',
                authorsQuantity: 2,
                url: 'https://lanacion.com.ar'
            });
            expect(result).toBeFalsy();
        });
        it('should not showMarqueeImage no url', () => {
            const result = showMarqueeImage({
                withMarqueeImg: true,
                authors: 'Lorem issum',
                authorsQuantity: 1,
                url: ''
            });
            expect(result).toBeFalsy();
        });
    });

    describe('Test function translateSectionName', () => {
        it('Should translate empty string', () => {
            const result = translateSectionName('');
            expect(result).toBe('');
        });

        it('Should translate null', () => {
            const result = translateSectionName(null);
            expect(result).toBe('');
        });

        it('Should translate section from sectionsTranslate', () => {
            const result = translateSectionName('edicion-impresa');
            expect(result).toBe('Edición Impresa');
        });

        it('Should translate section not included in sectionsTranslate', () => {
            const result = translateSectionName('revista-brando');
            expect(result).toBe('Revista Brando');
        });

        it('Should translate sections with custom translations', () => {
            const result = translateSectionName('lnmas');
            expect(result).toBe('LN+');
        });
    });

    describe('Test function showSection', () => {
        it('should showSection', () => {
            const result = showSection({
                withSection: true,
                article,
                authors: 'Autor de prueba',
                authorPhoto: true
            });
            expect(result).toBeTruthy();
        });
        it('should showSection if article is an empty object', () => {
            const result = showSection({
                withSection: true,
                article: {},
                authors: '',
                authorPhoto: true
            });
            expect(result).toBe('');
        });
        it('should not showSection withSection false', () => {
            const result = showSection({
                withSection: false,
                article,
                authors: 'Autor de prueba'
            });
            expect(result).toBeFalsy();
        });
        it('should not showSection with authors', () => {
            const result = showSection({
                withSection: true,
                article,
                authors: 'Lorem issum'
            });
            expect(result).toBeFalsy();
        });

        it('should fallback to primarySection.name if translateSectionName cannot handle id', () => {
            const customArticle = {
                taxonomy: {
                    primary_section: {
                        name: 'LN+'
                    }
                }
            };
            const result = showSection({
                withSection: true,
                article: customArticle,
                authors: 'Autor de prueba',
                authorPhoto: true
            });
            expect(result).toBe('LN+');
        });
    });

    describe('Test function getDataAuthor', () => {
        it('should return data author variant regular', () => {
            const result = getDataAuthor({
                article,
                variant: 'regular',
                authors: 'Lorem',
                hideAuthors: false,
                withMarquee: true,
                withMarqueeImg: true
            });
            expect(result).toEqual({
                marquee: 'Lorem',
                marqueeImg: false,
                authorsQuantity: 1
            });
        });
        it('should return data author variant author', () => {
            const result = getDataAuthor({
                article,
                variant: 'author',
                authors: '',
                hideAuthors: false,
                withMarquee: true,
                withMarqueeImg: true
            });
            expect(result).toEqual({
                marquee: 'Carlos Pagni',
                marqueeImg:
                    'http://172.17.0.1/resizer/WfgBNqj4n8Etv_fHKTptRoQK7UI=/80x0/filters:format(webp):quality(80)/s3.amazonaws.com/arc-authors/lanacionar/2219591.png',
                authorsQuantity: 1
            });
        });
        it('should return data author variant regular', () => {
            const result = getDataAuthor({
                article: article2,
                variant: 'regular',
                authors: '',
                hideAuthors: false,
                withMarquee: true,
                withMarqueeImg: true
            });
            expect(result).toEqual({
                marquee: 'Max Fisher y Carlos Pagni',
                marqueeImg: false,
                authorsQuantity: 2
            });
        });
    });
    describe('Test function getDataAttributesForViewability', () => {
        it('should show attributes for viewability when index is lower than 10', () => {
            const result = getDataAttributesForViewability(
                'KEBYELHATJHPRNAWO24GRV6YCQ',
                21,
                2
            );
            expect(result).toEqual({
                'data-id': 'KEBYELHATJHPRNAWO24GRV6YCQ',
                'data-notaid': 'KEBYELHATJHPRNAWO24GRV6YCQ',
                'data-pos': '2103',
                'data-source': 'editor'
            });
        });

        it('should show attributes for viewability when index is greater than 10', () => {
            const result = getDataAttributesForViewability(
                'KEBYELHATJHPRNAWO24GRV6YCQ',
                21,
                10
            );
            expect(result).toEqual({
                'data-id': 'KEBYELHATJHPRNAWO24GRV6YCQ',
                'data-notaid': 'KEBYELHATJHPRNAWO24GRV6YCQ',
                'data-pos': '2111',
                'data-source': 'editor'
            });
        });

        it('should return empty boxPosition 0', () => {
            const result = getDataAttributesForViewability(
                'KEBYELHATJHPRNAWO24GRV6YCQ',
                0,
                2
            );
            expect(result).toEqual({});
        });
    });

    describe('Test function getMediaData', () => {
        const resultImageArticle = {
            alt: '¿Wanda Nara o la China Suárez?: Martín Tetaz definió de qué lado está',
            fetchPriority: 'low',
            height: 513,
            loading: 'lazy',
            src: 'https://resizer.glanacion.com/resizer/YYmrDx8O3WnsLCiQC11HpsEf9J4=/309x206/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif',
            srcset: 'https://resizer.glanacion.com/resizer/ukSW4gU9iBtaPSnmCq696TxMqqQ=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 879w, https://resizer.glanacion.com/resizer/rUtO9Zp3kIlYQscYiKTu-WAmsHE=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 1119w, https://resizer.glanacion.com/resizer/O8Q1PaEr9K7hBEBuOSqnHFtZ3KQ=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 768w, https://resizer.glanacion.com/resizer/DyiPCWqItlg8Q2LbS-quVA7u79U=/351x234/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 351w, https://resizer.glanacion.com/resizer/YYmrDx8O3WnsLCiQC11HpsEf9J4=/309x206/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 309w',
            type: 'image',
            sources: [],
            width: 768
        };

        const resultHtml = {
            type: 'embedCode',
            embedCode:
                '<iframe width="560" height="315" src="https://img.youtube.com/vi/sITCH5csTmo/hqdefault.jpg" data-src="https://www.youtube.com/embed/sITCH5csTmo?autoplay=1&mute=1" id="youtube-1zhwqe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
            dataSrc: 'https://www.youtube.com/embed/sITCH5csTmo'
        };

        const articleImageCases = [
            [
                'should return the note image data when there are no custom fields defined',
                getProps({ customFields: {} })
            ],
            [
                'should return the note image data when the "html" custom field has a blank space',
                getProps({
                    customFields: {
                        html: ' '
                    }
                })
            ],

            [
                'should return the note image data when there is a video id but no video data.',
                getProps({
                    customFields: {
                        video: 'abc-id-video'
                    }
                })
            ],
            [
                'should return the note image data when there is an image id but no image data.',
                getProps({
                    customFields: {
                        imageId: 'abc-imageId'
                    }
                })
            ]
        ];

        test('should return media data of Bomba with loading eager and fetchPriority high', () => {
            expect(
                getMediaData(
                    getProps({
                        customFields: { noteId: '2CIOHVMKJBHKDMMHH2WBIZGJWE' },
                        renderables: renderablesWithBombaEager
                    })
                )
            ).toStrictEqual({
                ...resultImageArticle,
                loading: 'eager',
                fetchPriority: 'high'
            });
        });

        test('should return media data of Manual with loading eager and fetchPriority high', () => {
            expect(
                getMediaData({
                    article: {
                        ...responseArticleSourceNota,
                        _id: 'SUW6AQPARNCGLBDM2YOUGGC474'
                    },
                    customFields: { noteId: 'SUW6AQPARNCGLBDM2YOUGGC474' },
                    renderables: renderablesWithChainAperturaEager
                })
            ).toStrictEqual({
                ...resultImageArticle,
                loading: 'eager',
                fetchPriority: 'high'
            });
        });

        test.each(articleImageCases)('%s', (message, props) => {
            expect(getMediaData(props)).toStrictEqual(resultImageArticle);
        });

        test('should return the iframe as priority when all customFields are defined', () => {
            const resultHtmlWithoutId = {
                ...resultHtml,
                embedCode: resultHtml.embedCode.replace(
                    /id="youtube-[^"]+"/,
                    ''
                )
            };

            expect(
                getMediaData(
                    getProps({
                        customFields: {
                            html: iframe,
                            video: videoId,
                            imageId
                        },
                        video: responseVideoSource,
                        image: responseRelatedImageSource
                    })
                )
            ).toMatchObject({
                ...resultHtmlWithoutId,
                embedCode: expect.stringMatching(
                    /style="background-image: url\(https:\/\/img\.youtube\.com\/vi\/sITCH5csTmo\/hqdefault\.jpg\); background-size: cover; background-position: center; width: 100%; height: 100%;"/
                )
            });
        });

        test('should return the video as priority when the image and video are defined in the customFields', () => {
            const mockVideoWithResized = {
                ...responseVideoSource,
                resizedImages: {
                    promo_items: {
                        basic: {
                            resized_urls: [
                                {
                                    resizedUrl:
                                        'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fd3us6z9haan6vf.cloudfront.net%2F03-02-2023%2Ft_5d96c8dea565416da3f6f8875641a5ff_name_file_1280x720_2000_v3_1_.jpg?auth=e74e861f0ae9b8af4da45668d1d52202c5edfb13c0928ff93167d6fcf83308d8&width=768&quality=80&smart=false',
                                    option: {
                                        width: 768,
                                        height: 513,
                                        media: '(min-width: 768px)'
                                    }
                                }
                            ]
                        }
                    }
                }
            };
            expect(
                getMediaData(
                    getProps({
                        customFields: {
                            video: videoId,
                            imageId
                        },
                        video: mockVideoWithResized,
                        image: responseRelatedImageSource
                    })
                )
            ).toStrictEqual({
                poster: 'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fd3us6z9haan6vf.cloudfront.net%2F03-02-2023%2Ft_5d96c8dea565416da3f6f8875641a5ff_name_file_1280x720_2000_v3_1_.jpg?auth=e74e861f0ae9b8af4da45668d1d52202c5edfb13c0928ff93167d6fcf83308d8&width=768&quality=80&smart=false',
                dataSrc:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/LA_NACION/20220329/6243689bd601800001be77da/b7958f59-3bc1-4144-b134-eaec19e21716/t_4591bda568ae4e53b9e6fde00bf71c0f_name_VIDEO_SUPER/file_640x360-600.mp4',
                type: 'video'
            });
        });

        test('should return the custom image as priority when it is defined and there is no html or video defined.', () => {
            expect(
                getMediaData(
                    getProps({
                        customFields: {
                            imageId
                        },
                        image: responseRelatedImageSource
                    })
                )
            ).toStrictEqual({
                alt: '¿Wanda Nara o la China Suárez?: Martín Tetaz definió de qué lado está',
                fetchPriority: 'low',
                height: 513,
                loading: 'lazy',
                src: 'https://resizer.glanacion.com/resizer/Puhv2-iJdf6Y6DErcwLMgiEifCM=/233x155/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg',
                srcset: 'https://resizer.glanacion.com/resizer/vjH1_o4q0jC6lH1IpllN2UDmiDE=/298x198/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 298w, https://resizer.glanacion.com/resizer/DRUkkKA5aC45uO9plJYdGPpsA3c=/318x212/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 318w, https://resizer.glanacion.com/resizer/Puhv2-iJdf6Y6DErcwLMgiEifCM=/233x155/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 233w, https://resizer.glanacion.com/resizer/g015FBRgOi_TXYHheBdlWv1aikI=/375x250/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 375w, https://resizer.glanacion.com/resizer/IkSjQ7MFvxSD_9GtTNQ11rKdlas=/320x213/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 320w',
                type: 'image',
                sources: [],
                width: 768
            });
        });
    });
    test('should test validateVariant function', () => {
        expect(validateVariant('author', 1)).toStrictEqual('author');
        expect(validateVariant('author', 2)).toStrictEqual('regular');
        expect(validateVariant('regular', 1)).toStrictEqual('regular');
    });

    describe('Tests function showMarquee', () => {
        test('Should return an name of Author from Marquesina.', () => {
            expect(
                showMarquee({ withMarquee: true, marquesina: 'Carlos Pagni' })
            ).toStrictEqual('Carlos Pagni');
        });

        test('Should return an name of Author from custom field.', () => {
            expect(
                showMarquee({
                    withMarquee: true,
                    authors: 'Carlos Pagni',
                    marquesina: 'Alfredo Palacios'
                })
            ).toStrictEqual('Carlos Pagni');
        });

        test('Should return false if has not withMarquee.', () => {
            expect(
                showMarquee({ withMarquee: false, marquesina: 'Carlos Pagni' })
            ).toStrictEqual(false);
        });

        test('Should return false if has hideAuthors.', () => {
            expect(
                showMarquee({
                    withMarquee: true,
                    hideAuthors: true,
                    marquesina: 'Carlos Pagni'
                })
            ).toStrictEqual(false);
        });
    });

    describe('Tests function showMarqueeImage', () => {
        test('Should return an image of Author.', () => {
            expect(
                showMarqueeImage({
                    withMarqueeImg: true,
                    authorsQuantity: 1,
                    url: 'una-imagen'
                })
            ).toStrictEqual('una-imagen');
        });

        test('Should not return an image of Author if has custom field.', () => {
            expect(
                showMarqueeImage({
                    withMarqueeImg: true,
                    authorsQuantity: 1,
                    authors: 'Autor por Custom Field',
                    url: 'una-imagen'
                })
            ).toStrictEqual(false);
        });

        test('Should not return an image of Author if has more than 1 author.', () => {
            expect(
                showMarqueeImage({
                    withMarqueeImg: true,
                    authorsQuantity: 2,
                    url: 'una-imagen'
                })
            ).toStrictEqual(false);
        });

        test('Should not return an image of Author if has not withMarqueeImg', () => {
            expect(
                showMarqueeImage({
                    withMarqueeImg: false,
                    authorsQuantity: 1,
                    url: 'una-imagen'
                })
            ).toStrictEqual(false);
        });
    });

    describe('Tests function validateSubhead', () => {
        const config = {
            withSubhead: false
        };

        test('Should return a true to show subhead.', () => {
            expect(validateSubhead(config, false, {}, 'regular')).toStrictEqual(
                true
            );
        });

        test('Should return a true to show subhead if config say yes.', () => {
            expect(
                validateSubhead(
                    {
                        withSubhead: true
                    },
                    false,
                    {},
                    'regular'
                )
            ).toStrictEqual(true);
        });

        test('Should return a false to show subhead if variant is liveblog.', () => {
            expect(
                validateSubhead(
                    {
                        withSubhead: true
                    },
                    false,
                    {},
                    'liveblog'
                )
            ).toStrictEqual(false);
        });

        test('Should return a false to show subhead if variant is author.', () => {
            expect(validateSubhead(config, false, {}, 'author')).toStrictEqual(
                false
            );
        });

        test('Should return a false to show subhead if custom field hideDescription is true.', () => {
            expect(
                validateSubhead(
                    {
                        withSubhead: true
                    },
                    false,
                    { hideDescription: true },
                    'regular'
                )
            ).toStrictEqual(false);
        });

        test('Should return a false to show subhead if config has withSubheadAndMedia in false.', () => {
            expect(
                validateSubhead(
                    {
                        withSubhead: true,
                        withSubheadAndMedia: false
                    },
                    false,
                    {},
                    'regular'
                )
            ).toStrictEqual(false);
        });
    });

    describe('Tests function showExtraClass', () => {
        const withMedia = true;
        test('Should return a class for video', () => {
            expect(
                showExtraClass(
                    getTypeOfMedia({ video: '123' }),
                    '',
                    withMedia,
                    {
                        video: 'ln-70-video'
                    }
                )
            ).toStrictEqual('ln-70-video');
        });

        test('Should return a undefined if no match type with extraClass from config', () => {
            expect(
                showExtraClass(
                    getTypeOfMedia({ image: '123' }),
                    '',
                    withMedia,
                    {
                        video: 'ln-70-video'
                    }
                )
            ).toStrictEqual(undefined);
        });

        test('Should return a class that match with video type', () => {
            expect(
                showExtraClass(
                    getTypeOfMedia({ image: '123', video: '123' }),
                    '--className',
                    withMedia,
                    {
                        video: 'ln-70-video',
                        image: 'ln-class'
                    }
                )
            ).toStrictEqual('ln-70-video --className');
        });

        test('Should return a class that match with video type', () => {
            expect(
                showExtraClass(
                    getTypeOfMedia({ image: '123' }),
                    '',
                    withMedia,
                    {
                        video: 'ln-70-video',
                        image: 'ln-class'
                    }
                )
            ).toStrictEqual('ln-class');
        });

        test('Should return a undefined if no match type of media with extraClass from config', () => {
            expect(
                showExtraClass(
                    getTypeOfMedia({ video: '123' }),
                    '',
                    withMedia,
                    {
                        image: 'ln-70-video'
                    }
                )
            ).toStrictEqual(undefined);
        });

        test('Should return a undefined if everything is empty', () => {
            expect(
                showExtraClass(getTypeOfMedia({}), '', withMedia, {})
            ).toStrictEqual(undefined);
        });

        test('Should return class "--no-mc" when there is no media', () => {
            const withMedia = false;
            expect(
                showExtraClass(
                    getTypeOfMedia({ video: '123' }),
                    '',
                    withMedia,
                    {
                        withoutMedia: '--no-mc'
                    }
                )
            ).toStrictEqual('--no-mc');
        });

        test('Should not return class "--no-mc" when there is multimedia', () => {
            expect(
                showExtraClass(
                    getTypeOfMedia({ video: '123' }),
                    '',
                    withMedia,
                    {
                        withoutMedia: '--no-mc'
                    }
                )
            ).toStrictEqual(undefined);
        });
    });

    describe('Tests function getBadgetConfig', () => {
        test('Should return an object with the text of composer.', () => {
            expect(
                getBadgetConfig({
                    article,
                    style: undefined,
                    text: '',
                    isLiveblog: false,
                    withMedia: true
                })
            ).toStrictEqual({
                badgetStyle: 'negative',
                badgetText: 'chapita composer'
            });
        });
        test('Should return an object with the text and style it receives by parameter.', () => {
            expect(
                getBadgetConfig({
                    article,
                    style: 'sponsored',
                    text: 'chapita',
                    isLiveblog: false,
                    withMedia: true
                })
            ).toStrictEqual({
                badgetStyle: 'sponsored',
                badgetText: 'chapita'
            });
        });

        test('Should return an object with the text "live" and the style "live" which it receives when the variant is liveblog and the style and text parameters are undefined.', () => {
            expect(
                getBadgetConfig({
                    article,
                    style: undefined,
                    text: undefined,
                    isLiveblog: true,
                    withMedia: false
                })
            ).toStrictEqual({
                badgetStyle: 'live',
                badgetText: 'vivo'
            });
        });

        test('should return an object with the text and style that it receives when the variant is liveblog..', () => {
            expect(
                getBadgetConfig({
                    article,
                    style: 'a-fondo',
                    text: 'A fondo',
                    isLiveblog: true
                })
            ).toStrictEqual({
                badgetStyle: 'a-fondo',
                badgetText: 'A fondo'
            });
        });

        test('should return an object with the text and style when receives a typeOfMedia different of html.', () => {
            expect(
                getBadgetConfig({
                    article,
                    style: 'a-fondo',
                    text: 'A fondo',
                    isLiveblog: false,
                    withMedia: true,
                    typeOfMedia: 'image'
                })
            ).toStrictEqual({
                badgetStyle: 'a-fondo',
                badgetText: 'A fondo'
            });
        });

        test('should return an object with the text false when receives a typeOfMedia html.', () => {
            expect(
                getBadgetConfig({
                    article,
                    style: 'a-fondo',
                    text: 'A fondo',
                    isLiveblog: false,
                    withMedia: true,
                    typeOfMedia: 'html'
                })
            ).toStrictEqual({
                badgetStyle: 'a-fondo',
                badgetText: false
            });
        });

        test('should return an object with the text false when receives a withMedia false.', () => {
            expect(
                getBadgetConfig({
                    article,
                    style: 'a-fondo',
                    text: 'A fondo',
                    isLiveblog: false,
                    withMedia: false,
                    typeOfMedia: 'image'
                })
            ).toStrictEqual({
                badgetStyle: 'a-fondo',
                badgetText: false
            });
        });
        test('should return an badget with style exclusive-ln priority 1.', () => {
            const articleMock = {
                ...article,
                content_restrictions: { content_code: 'cerrada' },
                owner: { sponsored: true }
            };
            expect(
                getBadgetConfig({
                    article: articleMock,
                    style: '',
                    text: '',
                    isLiveblog: true,
                    withMedia: false,
                    typeOfMedia: 'image'
                })
            ).toStrictEqual({
                badgetStyle: 'subscriber',
                badgetText: 'Suscriptores'
            });
        });
        test('should return an badget with style live priority 2.', () => {
            const articleMock = { ...article, owner: { sponsored: true } };
            expect(
                getBadgetConfig({
                    article: articleMock,
                    style: '',
                    text: '',
                    isLiveblog: true,
                    withMedia: false,
                    typeOfMedia: 'image'
                })
            ).toStrictEqual({
                badgetStyle: 'live',
                badgetText: 'vivo'
            });
        });
        test('should return an badget with style contentlab priority 3.', () => {
            const articleMock = { ...article, owner: { sponsored: true } };
            expect(
                getBadgetConfig({
                    article: articleMock,
                    style: '',
                    text: '',
                    isLiveblog: false,
                    withMedia: false,
                    typeOfMedia: 'image'
                })
            ).toStrictEqual({
                badgetStyle: 'contentlab',
                badgetText: 'CONTENT LAB'
            });
        });

        test('should return an empty object with the prop hideBadget is true', () => {
            expect(
                getBadgetConfig({
                    article,
                    style: 'a-fondo',
                    text: 'A fondo',
                    isLiveblog: false,
                    withMedia: false,
                    typeOfMedia: 'image',
                    hideBadget: true
                })
            ).toStrictEqual({});
        });
    });

    describe('Tests function getLiveblogTitles', () => {
        const mockArticle = {
            _id: 'note-id',
            type: 'story',
            content_elements: contentElementesLiveblog
        };
        test('should return an array of 3 objects with the properties time and text', () => {
            expect(getLiveblogTitles(mockArticle)).toStrictEqual([
                {
                    text: 'El blue, volátil ',
                    time: '14:15'
                },
                {
                    text: 'Bancos vuelven a operar',
                    time: '13:04'
                },
                {
                    text: 'Los títulos soberanos se hunden',
                    time: '12:41'
                }
            ]);
        });

        test('should return a empty array when the content_elements is not defined', () => {
            const mockArticle = {
                _id: 'note-id',
                type: 'story'
            };
            expect(getLiveblogTitles(mockArticle)).toStrictEqual([]);
        });

        test('should return a empty array when the article data is not defined or no elements of type custom_embed exist', () => {
            const contentElementsWithoutPowerUps =
                contentElementesLiveblog.filter(
                    ({ type = '' }) => type !== 'custom_embed'
                );
            expect(getLiveblogTitles()).toStrictEqual([]);
            expect(
                getLiveblogTitles(contentElementsWithoutPowerUps)
            ).toStrictEqual([]);
        });

        test('should return only hours and minutes', () => {
            const time = '12:59';
            const timeWithSeconds = '14:25:56';

            expect(getOnlyHoursMinutes(time)).toEqual('12:59');
            expect(getOnlyHoursMinutes(timeWithSeconds)).toEqual('14:25');
            expect(getOnlyHoursMinutes()).toEqual('');
        });
    });

    describe('Test function IsInApertura', () => {
        const props = {
            layoutPageBuilder: 'LN10-Home_Main',
            config: { withPreload: true },
            renderables: getMockRenderables(),
            featureId: 'f0fvqs5a1iKxLV',
            articlePosition: 0
        };

        const casesTruthy = [
            ['should return true when exist a bomba with image', props],
            [
                'should return true when there is no "bomba" but there is an opening with an image.',
                {
                    ...props,
                    renderables: getMockRenderables({ hideBomba: true }),
                    featureId: 'f0fVAKwVPNa22W4'
                }
            ]
        ];

        test.each(casesTruthy)('%s', (message, props) => {
            expect(isInApertura(props)).toBeTruthy();
        });

        const casesFalsy = [
            [
                'Should return false when the "bomba" has a hidden image',
                {
                    ...props,
                    renderables: getMockRenderables({ hideImageBomba: true })
                }
            ],
            [
                'Should return false when  there is no "bomba" and the opening has a hidden image',
                {
                    ...props,
                    renderables: getMockRenderables({
                        hideImageApertura: true,
                        hideBomba: true
                    }),
                    featureId: 'f0fVAKwVPNa22W4'
                }
            ],
            [
                'Should return false when withPreload is false',
                {
                    ...props,
                    config: { withPreload: false }
                }
            ],
            [
                'Should return false when the parameters is not defined',
                undefined
            ]
        ];

        test.each(casesFalsy)('%s', (message, props) => {
            expect(isInApertura(props)).toBeFalsy();
        });
    });

    describe('Test function validateMedia', () => {
        describe('Custom fields and config', () => {
            it('should return invalid hideImage', () => {
                const customFields = {
                    hideImage: true
                };

                const mockArticle = { ...article };

                expect(mockArticle.credits.by).toHaveLength(1);
                expect(
                    validateMedia(customFields, {}, mockArticle)
                ).toBeFalsy();
            });
            it('should return invalid withMedia false', () => {
                const customFields = { hideImage: false };
                const config = { withMedia: false };
                const mockArticle = { ...article };

                expect(mockArticle.credits.by).toHaveLength(1);
                expect(
                    validateMedia(customFields, config, mockArticle)
                ).toBeFalsy();
            });
        });
        describe('Cards Author', () => {
            it('should return true because card author not have author ', () => {
                const customFields = {
                    hideImage: false,
                    variant: 'author'
                };

                const mockArticle = { ...article, credits: { by: [] } };

                expect(mockArticle.credits.by).toHaveLength(0);
                expect(
                    validateMedia(customFields, {}, mockArticle)
                ).toBeTruthy();
            });
            it('should return true because card author have 2 authors ', () => {
                const customFields = {
                    hideImage: false,
                    variant: 'author'
                };

                const mockArticle = { ...article, credits: { by: [1, 2] } };

                expect(mockArticle.credits.by).toHaveLength(2);
                expect(
                    validateMedia(customFields, {}, mockArticle)
                ).toBeTruthy();
            });
            it('should return false because card author have 1 author ', () => {
                const customFields = {
                    hideImage: false,
                    variant: 'author'
                };

                const mockArticle = { ...article };

                expect(mockArticle.credits.by).toHaveLength(1);
                expect(
                    validateMedia(customFields, {}, mockArticle)
                ).toBeFalsy();
            });
        });

        describe('Cards Regular', () => {
            it('should return true card regular 1 author', () => {
                const customFields = {
                    hideImage: false,
                    variant: 'regular'
                };

                const mockArticle = { ...article };

                expect(mockArticle.credits.by).toHaveLength(1);
                expect(
                    validateMedia(customFields, {}, mockArticle)
                ).toBeTruthy();
            });
            it('should return true card regular 0 author', () => {
                const customFields = {
                    hideImage: false,
                    variant: 'regular'
                };

                const mockArticle = { ...article, credits: { by: [] } };

                expect(mockArticle.credits.by).toHaveLength(0);
                expect(
                    validateMedia(customFields, {}, mockArticle)
                ).toBeTruthy();
            });
        });
    });

    describe('Test function getDynamicStreamOperator', () => {
        const cases = [
            ['xs', '<'],
            ['s', '<'],
            ['m', '<'],
            ['m-l', '<'],
            ['l', '<'],
            ['xl', '>'],
            ['xl-l', '>'],
            ['3xl', '>'],
            ['4xl', '>'],
            ['5xl', '>'],
            ['6xl', '>'],
            ['T1', '>']
        ];

        test.each(cases)(
            'given %p size, returns %p operator',
            (cardSize, expectedResult) => {
                const streamOperator = getDynamicStreamOperator(size, cardSize);
                expect(streamOperator).toEqual(expectedResult);
            }
        );
    });

    describe('Test function transformVideoData', () => {
        const videoData = {
            resizedImages: {
                promo_items: {
                    basic: {
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://example.com/promo_items_image_high.jpg'
                            },
                            {
                                resizedUrl:
                                    'https://example.com/promo_items_image_low.jpg'
                            }
                        ]
                    }
                }
            },
            promo_items: {
                basic: {
                    resized_urls: [
                        {
                            resizedUrl:
                                'https://example.com/promo_items_image_high.jpg'
                        },
                        {
                            resizedUrl:
                                'https://example.com/promo_items_image_low.jpg'
                        }
                    ]
                }
            },
            resizedUrl: [
                {
                    resizedUrl: 'https://example.com/image_high.jpg'
                },
                {
                    resizedUrl: 'https://example.com/image_low.jpg'
                }
            ],
            streams: [
                {
                    height: 360,
                    url: 'https://example.com/video_low.mp4',
                    width: 542
                },
                {
                    height: 720,
                    url: 'https://example.com/video_high.mp4',
                    width: 1084
                }
            ],
            type: 'video'
        };

        it('result should have src property when isAdmin is true', () => {
            const cardSize = '4-xl';
            const isAdmin = true;

            const result = transformVideoData(videoData, cardSize, isAdmin);

            const expectedResult = {
                type: 'video',
                src: 'https://example.com/video_low.mp4',
                poster: 'https://example.com/promo_items_image_low.jpg'
            };

            expect(result).toStrictEqual(expectedResult);
        });

        it('result should have dataSrc property when isAdmin is false', () => {
            const cardSize = 'm-l';
            const isAdmin = false;

            const result = transformVideoData(videoData, cardSize, isAdmin);

            const expectedResult = {
                type: 'video',
                dataSrc: 'https://example.com/video_low.mp4',
                poster: 'https://example.com/promo_items_image_low.jpg'
            };

            expect(result).toStrictEqual(expectedResult);
        });

        it('should return the correct transformed video data when shouldUseV2 is true', () => {
            const cardSize = '4-xl';
            const isAdmin = true;

            const result = transformVideoData(videoData, cardSize, isAdmin);

            const expectedResult = {
                type: 'video',
                src: 'https://example.com/video_low.mp4',
                poster: 'https://example.com/promo_items_image_low.jpg'
            };

            expect(result).toStrictEqual(expectedResult);
        });

        it('tests transformVideoData for video jw in Home', () => {
            const videoJwData = {
                sources: [
                    {
                        file: 'https://cdn.jwplayer.com/manifests/bb7snV27.m3u8',
                        type: 'application/vnd.apple.mpegurl'
                    },
                    {
                        file: 'https://cdn.jwplayer.com/videos/bb7snV27-kTExGaWf.mp4',
                        type: 'video/mp4',
                        height: 180,
                        width: 320,
                        label: '180p',
                        bitrate: 540776,
                        filesize: 675971,
                        framerate: 25
                    },
                    {
                        file: 'https://cdn.jwplayer.com/videos/bb7snV27-K8B0kybS.mp4',
                        type: 'video/mp4',
                        height: 270,
                        width: 480,
                        label: '270p',
                        bitrate: 801936,
                        filesize: 1002421,
                        framerate: 25
                    },
                    {
                        file: 'https://cdn.jwplayer.com/videos/bb7snV27-46NIuRKO.mp4',
                        type: 'video/mp4',
                        height: 720,
                        width: 1280,
                        label: '720p',
                        bitrate: 2646835,
                        filesize: 3308544,
                        framerate: 25
                    },
                    {
                        file: 'https://cdn.jwplayer.com/videos/bb7snV27-hz5z2Tv4.m4a',
                        type: 'audio/mp4',
                        label: 'AAC Audio',
                        bitrate: 120009,
                        filesize: 150012
                    },
                    {
                        file: 'https://cdn.jwplayer.com/videos/bb7snV27-FnZGUVnC.mp4',
                        type: 'video/mp4',
                        height: 360,
                        width: 640,
                        label: '360p',
                        bitrate: 1026344,
                        filesize: 1282931,
                        framerate: 25
                    },
                    {
                        file: 'https://cdn.jwplayer.com/videos/bb7snV27-0G6Pwvlw.mp4',
                        type: 'video/mp4',
                        height: 540,
                        width: 960,
                        label: '540p',
                        bitrate: 1775553,
                        filesize: 2219442,
                        framerate: 25
                    }
                ],
                poster: 'https://cdn.jwplayer.com/v2/media/bb7snV27/poster.jpg?width=320',
                type: 'video'
            };

            expect(transformVideoData(videoJwData)).toStrictEqual({
                dataSrc:
                    'https://cdn.jwplayer.com/videos/bb7snV27-kTExGaWf.mp4',
                poster: 'https://cdn.jwplayer.com/v2/media/bb7snV27/poster.jpg?width=320',
                type: 'video'
            });
        });

        it('tests transformVideoData when data is null', () => {
            expect(transformVideoData(null)).toStrictEqual({
                dataSrc: '',
                poster: '',
                type: ''
            });
        });

        it('should replace poster URL with www.lanacion.com.ar host when video is in Apertura', () => {
            const videoDataMock = {
                resizedImages: {
                    promo_items: {
                        basic: {
                            type: 'image',
                            url: 'https://cdn.jwplayer.com/thumb/some-id.jpg',
                            resized_urls: [
                                {
                                    resizedUrl:
                                        'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fthumb%2Fsome-id.jpg'
                                }
                            ]
                        }
                    }
                },
                sources: [],
                streams: [],
                type: 'video'
            };

            const result = transformVideoData(
                videoDataMock,
                'T1',
                false,
                false,
                true
            );

            expect(result.poster).toBe(
                'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fthumb%2Fsome-id.jpg'
            );
        });
    });

    describe('shouldHighlightCustomVoice', () => {
        const AUDIO_STATUS = {
            CREATED_AUDIO: 6,
            UPDATED_AUDIO: 7
        };

        it('should return true when all conditions are met', () => {
            const article = {
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    voice: '4031',
                                    image: 'https://sandbox.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-sandbox-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F1c4c5db6-cb62-487b-9724-8992e566bb58.png?auth=55b616dbc28ddb730e6b2875a28f9741304585478a05d06fda4fbf3a249f405f&width=80&quality=70&smart=false'
                                }
                            },
                            name: 'Carlos Pagni',
                            type: 'author'
                        }
                    ]
                },
                promo_items: {
                    audio_nota: {
                        embed: {
                            config: {
                                audio_status: AUDIO_STATUS.CREATED_AUDIO
                            }
                        }
                    }
                }
            };

            const config = {
                isCustomVoiceCandidate: true
            };

            expect(shouldHighlightCustomVoice(article, config)).toBe(true);
        });

        it('should return false if the author does not have the voice property', () => {
            const article = {
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    image: 'https://sandbox.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-sandbox-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F1c4c5db6-cb62-487b-9724-8992e566bb58.png?auth=55b616dbc28ddb730e6b2875a28f9741304585478a05d06fda4fbf3a249f405f&width=80&quality=70&smart=false'
                                }
                            },
                            name: 'Alfredo Leuco',
                            type: 'author'
                        }
                    ]
                }
            };
            const config = {
                isCustomVoiceCandidate: true
            };

            expect(shouldHighlightCustomVoice(article, config)).toBe(false);
        });

        it('should return false if the author does not have an image', () => {
            const article = {
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    voice: '4031'
                                }
                            },
                            name: 'Carlos Pagni',
                            type: 'author'
                        }
                    ]
                }
            };

            const config = {
                isCustomVoiceCandidate: true
            };

            expect(shouldHighlightCustomVoice(article, config)).toBe(false);
        });

        it('should return false if there is more than one author', () => {
            const article = {
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    voice: '4031',
                                    image: 'https://sandbox.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-sandbox-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F1c4c5db6-cb62-487b-9724-8992e566bb58.png?auth=55b616dbc28ddb730e6b2875a28f9741304585478a05d06fda4fbf3a249f405f&width=80&quality=70&smart=false'
                                }
                            },
                            name: 'Carlos Pagni',
                            type: 'author'
                        },
                        {
                            additional_properties: {
                                original: {
                                    voice: '2045',
                                    image: 'https://sandbox.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-sandbox-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F1c4c5db6-cb62-487b-9724-8992e566bb58.png?auth=55b616dbc28ddb730e6b2875a28f9741304585478a05d06fda4fbf3a249f405f&width=80&quality=70&smart=false'
                                }
                            },
                            name: 'Alfredo Leuco',
                            type: 'author'
                        }
                    ]
                }
            };

            const config = {
                isCustomVoiceCandidate: true
            };

            expect(shouldHighlightCustomVoice(article, config)).toBe(false);
        });

        it('should return false if the article is not marked as a custom voice candidate', () => {
            const article = {
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    voice: '4031',
                                    image: 'https://sandbox.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-sandbox-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F1c4c5db6-cb62-487b-9724-8992e566bb58.png?auth=55b616dbc28ddb730e6b2875a28f9741304585478a05d06fda4fbf3a249f405f&width=80&quality=70&smart=false'
                                }
                            },
                            name: 'Carlos Pagni',
                            type: 'author'
                        }
                    ]
                }
            };

            const config = {
                isCustomVoiceCandidate: false
            };

            expect(shouldHighlightCustomVoice(article, config)).toBe(false);
        });

        it('should return false if the input data is empty or undefined', () => {
            expect(shouldHighlightCustomVoice()).toBe(false);
            expect(shouldHighlightCustomVoice(null, null)).toBe(false);
            expect(shouldHighlightCustomVoice({}, {})).toBe(false);
        });

        it('should return true when all conditions are met, including audio generated', () => {
            const article = {
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    voice: '4031',
                                    image: 'https://sandbox.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-sandbox-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F1c4c5db6-cb62-487b-9724-8992e566bb58.png'
                                }
                            },
                            name: 'Carlos Pagni',
                            type: 'author'
                        }
                    ]
                },
                promo_items: {
                    audio_nota: {
                        embed: {
                            config: {
                                audio_status: AUDIO_STATUS.UPDATED_AUDIO
                            }
                        }
                    }
                }
            };

            const config = { isCustomVoiceCandidate: true };

            expect(shouldHighlightCustomVoice(article, config)).toBe(true);
        });

        it('should return false if audio_status is not correct', () => {
            const article = {
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    voice: '4031',
                                    image: 'https://sandbox.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-sandbox-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F1c4c5db6-cb62-487b-9724-8992e566bb58.png'
                                }
                            },
                            name: 'Carlos Pagni',
                            type: 'author'
                        }
                    ]
                },
                promo_items: {
                    audio_nota: {
                        embed: {
                            config: {
                                audio_status: 8
                            }
                        }
                    }
                }
            };

            const config = { isCustomVoiceCandidate: true };

            expect(shouldHighlightCustomVoice(article, config)).toBe(false);
        });

        it('should return false if audio_status is missing', () => {
            const article = {
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    voice: '4031',
                                    image: 'https://sandbox.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-sandbox-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F1c4c5db6-cb62-487b-9724-8992e566bb58.png'
                                }
                            },
                            name: 'Carlos Pagni',
                            type: 'author'
                        }
                    ]
                },
                promo_items: {
                    audio_nota: {
                        embed: {
                            config: {}
                        }
                    }
                }
            };

            const config = { isCustomVoiceCandidate: true };

            expect(shouldHighlightCustomVoice(article, config)).toBe(false);
        });

        it('should return false if promo_items.audio_nota does not exist', () => {
            const article = {
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    voice: '4031',
                                    image: 'https://sandbox.lanacion.com.ar/resizer/v2/image.png'
                                }
                            },
                            name: 'Carlos Pagni',
                            type: 'author'
                        }
                    ]
                },
                promo_items: {}
            };

            const config = { isCustomVoiceCandidate: true };

            expect(shouldHighlightCustomVoice(article, config)).toBe(false);
        });

        it('should return false if republicar_audio.text is "No mostrar audio"', () => {
            const article = {
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    voice: '4031',
                                    image: 'https://sandbox.lanacion.com.ar/resizer/v2/image.png'
                                }
                            },
                            name: 'Carlos Pagni',
                            type: 'author'
                        }
                    ]
                },
                promo_items: {
                    audio_nota: {
                        embed: {
                            config: {
                                audio_status: AUDIO_STATUS.CREATED_AUDIO
                            }
                        }
                    }
                },
                label: {
                    republicar_audio: {
                        text: 'No mostrar audio'
                    }
                }
            };

            const config = { isCustomVoiceCandidate: true };

            expect(shouldHighlightCustomVoice(article, config)).toBe(false);
        });
    });

    describe('getIndexOfFeature', () => {
        it('returns the custom index if isException is true (bn_player_horizontal diagramation)', () => {
            document.body.innerHTML = `
                <section data-diagramacion-id="bn_player_horizontal">
                  <article data-feature-id="Mq6lzDXf"></article>
                </section>
            `;

            const elementChain = document.querySelector(
                '[data-diagramacion-id="bn_player_horizontal"]'
            );

            const index = getIndexOfFeature({
                elementChain,
                isException: true,
                customIndex: 0,
                featureId: 'Mq6lzDXf'
            });

            expect(index).toBe(0);
        });

        it('returns the correct index using findIndex when diagramation is not bn_player_horizontal', () => {
            document.body.innerHTML = `
            <section data-diagramacion-id="bn_player_3_grid">
            <article data-feature-id="f0fR1PJ7ScLF7U1"></article>
            <article data-feature-id="f0fr3ZokRcLF7Io"></article>
            <article data-feature-id="f0ffxZZTRcLF731"></article>
            <article data-feature-id="f0ff3iCZRcLF738"></article>
          </section>
            `;

            const elementChain = document.querySelector(
                '[data-diagramacion-id="bn_player_3_grid"]'
            );

            const index = getIndexOfFeature({
                elementChain,
                isException: false,
                featureId: 'f0fr3ZokRcLF7Io'
            });

            expect(index).toBe(1);
        });

        it('returns -1 when the featureId is not found in elementChain', () => {
            document.body.innerHTML = `
              <section data-diagramacion-id="bn_player_3_grid">
                <article data-feature-id="f0fR1PJ7ScLF7U1"></article>
                <article data-feature-id="f0fr3ZokRcLF7Io"></article>
              </section>
            `;

            const elementChain = document.querySelector(
                '[data-diagramacion-id="bn_player_3_grid"]'
            );

            const index = getIndexOfFeature({
                elementChain,
                isException: false,
                featureId: 'Mq6lzDXf'
            });

            expect(index).toBe(-1);
        });
    });

    describe('isSubtypeLiveblog', () => {
        it('should return true for subtype liveblog editorial', () => {
            const article = {
                subtype: '11'
            };
            expect(isSubtypeLiveblog(article)).toBe(true);
        });

        it('should return true for subtype liveblog', () => {
            const article = {
                subtype: '6'
            };
            expect(isSubtypeLiveblog(article)).toBe(true);
        });

        it('should return false for subtype noticia', () => {
            const article = {
                subtype: '1'
            };
            expect(isSubtypeLiveblog(article)).toBe(false);
        });

        it('should return false when the article data is not defined or null', () => {
            expect(isSubtypeLiveblog(null)).toBe(false);
            expect(isSubtypeLiveblog()).toBe(false);
        });
    });
});

describe('generateLazyLoadEmbedCode', () => {
    it('should return the embed code with the thumbnail and data-src for a valid YouTube video (no autoplay)', () => {
        const embedCode =
            '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>';
        const result = generateLazyLoadEmbedCode(embedCode);

        expect(result).toContain('src=""');
        expect(result).toContain(
            'style="background-image: url(https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg); background-size: cover; background-position: center; width: 100%; height: 100%;"'
        );
        expect(result).toContain(
            'data-src="https://www.youtube.com/embed/dQw4w9WgXcQ"'
        );

        expect(result).toMatch(/id="youtube-[\w\d]+"/);
    });

    it('should return the embed code with autoplay and mute when autoplay is present', () => {
        const embedCode =
            '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allowfullscreen></iframe>';
        const result = generateLazyLoadEmbedCode(embedCode);

        expect(result).toContain('src=""');
        expect(result).toContain(
            'style="background-image: url(https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg); background-size: cover; background-position: center; width: 100%; height: 100%;"'
        );

        expect(result).toContain(
            'data-src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"'
        );
    });

    it('should return the original embed code if the YouTube ID is invalid or not present', () => {
        const embedCode =
            '<iframe src="https://www.example.com/embed/video" frameborder="0" allowfullscreen></iframe>';
        const result = generateLazyLoadEmbedCode(embedCode);

        expect(result).toBe(embedCode);
    });

    it('should generate a unique id for each call', () => {
        const embedCode1 =
            '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>';
        const embedCode2 =
            '<iframe src="https://www.youtube.com/embed/abcdefg" frameborder="0" allowfullscreen></iframe>';

        const result1 = generateLazyLoadEmbedCode(embedCode1);
        const result2 = generateLazyLoadEmbedCode(embedCode2);

        const id1 = result1.match(/id="([a-z0-9-]+)"/)[1];
        const id2 = result2.match(/id="([a-z0-9-]+)"/)[1];

        expect(id1).not.toBe(id2);
    });

    describe('Test function getCllBoard', () => {
        it('should return an empty object if inputUrl is undefined', () => {
            const result = getCllBoard(undefined);
            expect(result).toEqual({});
        });

        it('should return an empty object if inputUrl is null', () => {
            const result = getCllBoard(null);
            expect(result).toEqual({});
        });

        it('should return an empty object if inputUrl is an empty string', () => {
            const result = getCllBoard('');
            expect(result).toEqual({});
        });

        it('should return the embedCode and classNames with a valid transformed URL', () => {
            const input =
                ' https://canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/ ';

            const result = getCllBoard(input);
            expect(result).toEqual({
                embedCode: `<iframe src=https://widget-canchallena.clanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/widget/?isHome=true title="Embebido canchallena" class="w-100 h-57" scrolling="no" > </iframe>`,
                classNames: 'h-57'
            });
        });
    });

    describe('buildCardConfig', () => {
        it('should pass an empty array as authors when editor authors is an empty string', () => {
            const showSectionSpy = jest.spyOn(helperModule, 'showSection');
            const customVoiceSpy = jest
                .spyOn(helperModule, 'shouldHighlightCustomVoice')
                .mockReturnValue(false);

            const articleWithSection = {
                _id: 'article-economia',
                taxonomy: {
                    primary_section: {
                        _id: '/economia',
                        name: 'Economía',
                        path: '/economia'
                    }
                }
            };

            const config = {
                articleData: {
                    content: articleWithSection,
                    transformed: articleWithSection
                },
                configData: {
                    chainData: {
                        config: {
                            withSection: true,
                            cardSize: 'm'
                        }
                    },
                    appData: {
                        isHome: false,
                        renderables: []
                    },
                    editorData: {
                        variant: 'regular',
                        authors: '',
                        description: ''
                    },
                    customFields: {}
                },
                authorData: {
                    quantity: 1,
                    marqueeImg: 'https://static.test/avatar.png'
                },
                mediaData: {
                    type: 'image',
                    withMedia: true
                },
                displayData: {
                    searchableField: () => null
                }
            };

            const { sectionContent } = buildCardConfig(config);

            expect(showSectionSpy).toHaveBeenCalledWith(
                expect.objectContaining({ authors: [] })
            );
            expect(sectionContent).toBe('Economía');

            showSectionSpy.mockRestore();
            customVoiceSpy.mockRestore();
        });
    });
});
