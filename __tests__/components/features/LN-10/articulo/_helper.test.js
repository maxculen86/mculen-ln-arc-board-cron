import responseVideoSource from '../../../../../__mocks__/data/videos/responseVideoSource.json';
import responseArticleSourceNota from '../../../../../__mocks__/data/articles/2CIOHVMKJBHKDMMHH2WBIZGJWE.json';
import responseRelatedImageSource from '../../../../../__mocks__/data/images/responseRelatedImageSource.json';
import {
    getMediaData,
    validateVariant
} from '../../../../../components/features/LN-10/article/_helper';

describe('Components - Features - LN-10 - Article - _helper', () => {
    const getProps = ({ video, image, customFields } = {}) => {
        return {
            article: responseArticleSourceNota,
            video,
            image,
            customFields
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
            height: 513,
            src:
                'https://resizer.glanacion.com/resizer/YYmrDx8O3WnsLCiQC11HpsEf9J4=/309x206/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif',
            srcset:
                'https://resizer.glanacion.com/resizer/ukSW4gU9iBtaPSnmCq696TxMqqQ=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 879w, https://resizer.glanacion.com/resizer/rUtO9Zp3kIlYQscYiKTu-WAmsHE=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 1119w, https://resizer.glanacion.com/resizer/O8Q1PaEr9K7hBEBuOSqnHFtZ3KQ=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 768w, https://resizer.glanacion.com/resizer/DyiPCWqItlg8Q2LbS-quVA7u79U=/351x234/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 351w, https://resizer.glanacion.com/resizer/YYmrDx8O3WnsLCiQC11HpsEf9J4=/309x206/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KU5FGXJCYJFDDFJPDRWQYBOTMM.jfif 309w',
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
                        image: responseRelatedImageSource
                    })
                )
            ).toStrictEqual({
                poster:
                    'https://resizer.glanacion.com/resizer/vpxxoKfhImzI_W82siKEcwquXAM=/233x155/smart/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/11-23-2021/t_e27fe874604b4ba4b7a9de68ea999a82_name_file_1280x720_2000_v3_1_.jpg',
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
                height: 513,
                src:
                    'https://resizer.glanacion.com/resizer/Puhv2-iJdf6Y6DErcwLMgiEifCM=/233x155/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg',
                srcset:
                    'https://resizer.glanacion.com/resizer/vjH1_o4q0jC6lH1IpllN2UDmiDE=/298x198/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 298w, https://resizer.glanacion.com/resizer/DRUkkKA5aC45uO9plJYdGPpsA3c=/318x212/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 318w, https://resizer.glanacion.com/resizer/Puhv2-iJdf6Y6DErcwLMgiEifCM=/233x155/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 233w, https://resizer.glanacion.com/resizer/g015FBRgOi_TXYHheBdlWv1aikI=/375x250/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 375w, https://resizer.glanacion.com/resizer/IkSjQ7MFvxSD_9GtTNQ11rKdlas=/320x213/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg 320w',
                width: 768
            });
        });
    });
    test('should test validateVariant function', () => {
        expect(validateVariant('author', 1)).toStrictEqual('author');
        expect(validateVariant('author', 2)).toStrictEqual('regular');
        expect(validateVariant('regular', 1)).toStrictEqual('regular');
    });
});
