import responseVideoSource from '../../../../../__mocks__/data/videos/responseVideoSource.json';
import responseArticleSourceNota from '../../../../../__mocks__/data/articles/2CIOHVMKJBHKDMMHH2WBIZGJWE.json';
import responseRelatedImageSource from '../../../../../__mocks__/data/images/responseRelatedImageSource.json';
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
    isInApertura
} from '../../../../../components/features/LN-10/article/_helper';
import contentElementesLiveblog from '../../../../../__mocks__/data/articles/contentElementsLiveblog.json';
import {
    renderablesWithBombaEager,
    renderablesWithChainAperturaEager
} from '../../../../../__mocks__/data/renderables/renderablesLN10eager.js';
import configLN10 from '../../../../../components/layouts/config/LN10-Home.config.json';
import { getMockRenderables } from '../../../../../__mocks__/data/renderables/renderablesForPreload';

describe('Components - Features - LN-10 - Article - _helper', () => {
    const getProps = ({
        video,
        image,
        customFields,
        renderables,
        shouldUseV2 = false
    } = {}) => {
        return {
            article: responseArticleSourceNota,
            video,
            image,
            customFields,
            renderables,
            shouldUseV2
        };
    };

    const videoId = 'abc-id-video';
    const imageId = 'abc-imageId';
    const iframe =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/sITCH5csTmo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';

    describe('Test function getMediaData', () => {
        const resultImageArticle = {
            alt:
                '¿Wanda Nara o la China Suárez?: Martín Tetaz definió de qué lado está',
            fetchPriority: 'low',
            height: 513,
            loading: 'lazy',
            src:
                'https://resizer.glanacion.com/resizer/YYmrDx8O3WnsLCiQC11HpsEf9J4=/309x206/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif',
            srcset:
                'https://resizer.glanacion.com/resizer/ukSW4gU9iBtaPSnmCq696TxMqqQ=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 879w, https://resizer.glanacion.com/resizer/rUtO9Zp3kIlYQscYiKTu-WAmsHE=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 1119w, https://resizer.glanacion.com/resizer/O8Q1PaEr9K7hBEBuOSqnHFtZ3KQ=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 768w, https://resizer.glanacion.com/resizer/DyiPCWqItlg8Q2LbS-quVA7u79U=/351x234/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 351w, https://resizer.glanacion.com/resizer/YYmrDx8O3WnsLCiQC11HpsEf9J4=/309x206/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 309w',
            type: 'image',
            width: 768
        };

        const resultHtml = {
            type: 'embedCode',
            embedCode: iframe
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
            ).toStrictEqual(resultHtml);
        });

        test('should return the video as priority when the image and video are defined in the customFields', () => {
            expect(
                getMediaData(
                    getProps({
                        customFields: {
                            video: videoId,
                            imageId
                        },
                        video: responseVideoSource,
                        image: responseRelatedImageSource,
                        shouldUseV2: true
                    })
                )
            ).toStrictEqual({
                poster:
                    'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fd3us6z9haan6vf.cloudfront.net%2F03-02-2023%2Ft_5d96c8dea565416da3f6f8875641a5ff_name_file_1280x720_2000_v3_1_.jpg?auth=e74e861f0ae9b8af4da45668d1d52202c5edfb13c0928ff93167d6fcf83308d8&width=768&quality=80&smart=false',
                src:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/LA_NACION/20220329/6243689bd601800001be77da/b7958f59-3bc1-4144-b134-eaec19e21716/t_4591bda568ae4e53b9e6fde00bf71c0f_name_VIDEO_SUPER/file_1280x720-2000-v3_1.mp4',
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
                alt:
                    '¿Wanda Nara o la China Suárez?: Martín Tetaz definió de qué lado está',
                fetchPriority: 'low',
                height: 513,
                loading: 'lazy',
                src:
                    'https://resizer.glanacion.com/resizer/Puhv2-iJdf6Y6DErcwLMgiEifCM=/233x155/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg',
                srcset:
                    'https://resizer.glanacion.com/resizer/vjH1_o4q0jC6lH1IpllN2UDmiDE=/298x198/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 298w, https://resizer.glanacion.com/resizer/DRUkkKA5aC45uO9plJYdGPpsA3c=/318x212/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 318w, https://resizer.glanacion.com/resizer/Puhv2-iJdf6Y6DErcwLMgiEifCM=/233x155/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 233w, https://resizer.glanacion.com/resizer/g015FBRgOi_TXYHheBdlWv1aikI=/375x250/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 375w, https://resizer.glanacion.com/resizer/IkSjQ7MFvxSD_9GtTNQ11rKdlas=/320x213/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 320w',
                type: 'image',
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
        test('Should return a class for video', () => {
            expect(
                showExtraClass(getTypeOfMedia({ video: '123' }), '', {
                    video: 'ln-70-video'
                })
            ).toStrictEqual('ln-70-video');
        });

        test('Should return a undefined if no match type with extraClass from config', () => {
            expect(
                showExtraClass(getTypeOfMedia({ image: '123' }), '', {
                    video: 'ln-70-video'
                })
            ).toStrictEqual(undefined);
        });

        test('Should return a class that match with video type', () => {
            expect(
                showExtraClass(
                    getTypeOfMedia({ image: '123', video: '123' }),
                    '--className',
                    {
                        video: 'ln-70-video',
                        image: 'ln-class'
                    }
                )
            ).toStrictEqual('ln-70-video --className');
        });

        test('Should return a class that match with video type', () => {
            expect(
                showExtraClass(getTypeOfMedia({ image: '123' }), '', {
                    video: 'ln-70-video',
                    image: 'ln-class'
                })
            ).toStrictEqual('ln-class');
        });

        test('Should return a undefined if no match type of media with extraClass from config', () => {
            expect(
                showExtraClass(getTypeOfMedia({ video: '123' }), '', {
                    image: 'ln-70-video'
                })
            ).toStrictEqual(undefined);
        });

        test('Should return a undefined if everything is empty', () => {
            expect(showExtraClass(getTypeOfMedia({}), '', {})).toStrictEqual(
                undefined
            );
        });
    });

    describe('Tests function getBadgetConfig', () => {
        test('Should return an object with the text and style it receives by parameter.', () => {
            expect(
                getBadgetConfig({
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
            const contentElementsWithoutPowerUps = contentElementesLiveblog.filter(
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
            featureId: 'f0fvqs5a1iKxLV'
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
});
