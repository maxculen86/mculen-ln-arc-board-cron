import * as fusionConsumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import GetDataToLinkImage from '../../../../../../components/private/common/utils/image/getDataToLinkImage';
import getImage from '../../../../../../components/private/common/utils/image/getImage';

// Data
import bombaOculta from '../../../../../../__mocks__/data/renderables/bomba/bombaOculta.json';
import bombaVisible from '../../../../../../__mocks__/data/renderables/bomba/bombaVisible.json';
import dataApertura from '../../../../../../__mocks__/data/renderables/dataApertura2.json';
import bombaVisibleOnlyNoteId from '../../../../../../__mocks__/data/renderables/bomba/bombaVisibleOnlyNoteId.json';

jest.mock(
    '../../../../../../components/private/common/utils/image/getImage',
    () => jest.fn()
);

describe('Common - GetDataToLinkImage', () => {
    /////////// NOTA ///////////
    describe('When section is note,', () => {
        const globalContent = {
            promo_items: {
                basic: {
                    resized_urls: [
                        {
                            option: {
                                height: 586,
                                media: '(min-width: 1280px)',
                                width: 879,
                                media_preload: '(min-width: 1280.1px)'
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/TH-VryessnZukr7fPtHGAp_SeKc=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
                        },
                        {
                            option: {
                                height: 746,
                                media: '(min-width: 1024px)',
                                width: 1119,
                                media_preload:
                                    '(min-width: 1024.1px and max-width: 1280px)'
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/Gx0v-uWdmqOZawzhVCa09zILHio=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
                        },
                        {
                            option: {
                                height: 512,
                                media: '(min-width: 768px)',
                                width: 768,
                                media_preload: '(max-width: 1024px)'
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/AtNn5RZblCnaBE4JRqbP8O5lCyw=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
                        }
                    ]
                }
            }
        };

        const articleToExclude = {
            ...globalContent,
            promo_items: {
                ...globalContent.promo_items,
                storytelling_mobile: {
                    resized_urls: [
                        {
                            option: {
                                height: 586,
                                media: '(min-width: 1280px)',
                                width: 879,
                                media_preload: '(min-width: 1280.1px)'
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/TH-VryessnZukr7fPtHGAp_SeKc=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
                        },
                        {
                            option: {
                                height: 746,
                                media: '(min-width: 1024px)',
                                width: 1119,
                                media_preload:
                                    '(min-width: 1024.1px and max-width: 1280px)'
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/Gx0v-uWdmqOZawzhVCa09zILHio=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
                        }
                    ]
                }
            }
        };

        const expected = [
            {
                media: '(min-width: 1280.1px)',
                resizedUrl:
                    'https://resizer.glanacion.com/resizer/TH-VryessnZukr7fPtHGAp_SeKc=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
            },
            {
                media: '(min-width: 1024.1px and max-width: 1280px)',

                resizedUrl:
                    'https://resizer.glanacion.com/resizer/Gx0v-uWdmqOZawzhVCa09zILHio=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
            },
            {
                media: '(max-width: 1024px)',

                resizedUrl:
                    'https://resizer.glanacion.com/resizer/AtNn5RZblCnaBE4JRqbP8O5lCyw=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
            }
        ];

        it('with resized Media, return array media data', () => {
            expect(GetDataToLinkImage(globalContent, 'nota')).toEqual(expected);
        });

        it('without resized Media, return empty Array', () => {
            expect(GetDataToLinkImage({}, 'nota')).toEqual([]);
        });

        it('STORYTELLING or FOTOAL100 without promo_items.storytelling_mobile, return array media data', () => {
            expect(
                GetDataToLinkImage({ ...globalContent, subtype: '4' }, 'nota')
            ).toEqual(expected);
            expect(
                GetDataToLinkImage({ ...globalContent, subtype: '8' }, 'nota')
            ).toEqual(expected);
        });

        it('STORYTELLING or FOTOAL100 with promo_items.storytelling_mobile, return empty Array', () => {
            expect(
                GetDataToLinkImage(
                    { ...articleToExclude, subtype: '4' },
                    'nota'
                )
            ).toEqual([]);
            expect(
                GetDataToLinkImage(
                    { ...articleToExclude, subtype: '8' },
                    'nota'
                )
            ).toEqual([]);
        });
    });

    /////////// HOME ///////////
    describe('When section is home', () => {
        const responseRelatedImageSource = {
            promo_items: {
                basic: {
                    _id: 'H53R624KARDARCICFNEC7ZC7YA',
                    type: 'image',
                    resized_urls: [
                        {
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/0-_Q3j7WaTgvazaqaWo1TlsdFYg=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg',
                            option: {
                                width: 768,
                                height: 512,
                                media: '(min-width: 768px)',
                                useFullSize: true,
                                proportion: '3:2',
                                media_preload:
                                    '(min-width: 768.1px and max-width: 1024px)'
                            }
                        },
                        {
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/v0nB_sKZ3HeDxcpmmYhzX6P49i0=/375x562/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg',
                            option: {
                                width: 375,
                                height: 562,
                                media: '(min-width: 375px)',
                                useFullSize: true,
                                proportion: '2:3',
                                media_preload:
                                    '(min-width: 375.1px and max-width: 768px)'
                            }
                        },
                        {
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/FtoYG9gG-lYJTikOJudK9UNhnWA=/320x480/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg',
                            option: {
                                width: 320,
                                height: 480,
                                media: '(min-width: 320px)',
                                useFullSize: true,
                                proportion: '2:3',
                                media_preload: '(max-width: 375px)'
                            }
                        }
                    ],
                    resized_urls_zoom: []
                }
            },
            _id:
                '193728078327a4eb5c153e21c6330c53325196e9228d8217fdeaac0d59ce5db1'
        };

        const responseArticleSourceNota = {
            _id: '3ZDQ542ANJHEBLH6HOKBTBR5J4',
            credits: {},
            promo_items: {
                basic: {
                    height: 513,
                    resized_urls: [
                        {
                            option: {
                                height: 512,
                                media: '(min-width: 768px)',
                                media_preload:
                                    '(min-width: 768.1px and max-width: 1024px)',
                                width: 768
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/0-_Q3j7WaTgvazaqaWo1TlsdFYg=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg'
                        },
                        {
                            option: {
                                height: 562,
                                media: '(min-width: 375px)',
                                media_preload:
                                    '(min-width: 375.1px and max-width: 768px)',
                                width: 375
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/v0nB_sKZ3HeDxcpmmYhzX6P49i0=/375x562/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg'
                        },
                        {
                            option: {
                                height: 480,
                                media: '(min-width: 320px)',
                                media_preload: '(max-width: 375px)',
                                width: 320
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/FtoYG9gG-lYJTikOJudK9UNhnWA=/320x480/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg'
                        }
                    ],
                    type: 'image',
                    url:
                        'https://resizer.glanacion.com/resizer/NkdwqqOol3BTGYVPvPGR2L1uKmQ=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/Q72OLPCCKJHUNA4YUYUK4LNY2Q.jpg',
                    width: 768
                }
            },
            publish_date: '2021-08-17T00:08:44Z',
            subtype: '1',
            website_url: '/lifestyle/titulo-random-3f2a24-nid16082021/'
        };

        const resizedUrls = [
            {
                media: '(min-width: 768.1px and max-width: 1024px)',
                resizedUrl:
                    'https://resizer.glanacion.com/resizer/0-_Q3j7WaTgvazaqaWo1TlsdFYg=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg'
            },
            {
                media: '(min-width: 375.1px and max-width: 768px)',
                resizedUrl:
                    'https://resizer.glanacion.com/resizer/v0nB_sKZ3HeDxcpmmYhzX6P49i0=/375x562/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg'
            },
            {
                media: '(max-width: 375px)',
                resizedUrl:
                    'https://resizer.glanacion.com/resizer/FtoYG9gG-lYJTikOJudK9UNhnWA=/320x480/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg'
            }
        ];

        it('without renderables, return empty Array', () => {
            expect(GetDataToLinkImage({}, 'home', [])).toEqual([]);
        });

        describe('with Bomba', () => {
            it('Visible with imageId, return Array with imageResizedUrls', () => {
                const renderables = bombaVisible;
                getImage.mockImplementation(() => responseRelatedImageSource);
                expect(GetDataToLinkImage({}, 'home', renderables)).toEqual(
                    resizedUrls
                );
            });

            it('Visible with noteId, return Array with imageResizedUrls', () => {
                const renderables = bombaVisibleOnlyNoteId;
                getImage.mockImplementation(() => responseArticleSourceNota);
                expect(GetDataToLinkImage({}, 'home', renderables)).toEqual(
                    resizedUrls
                );
            });

            it('Hiden, return Empty Array', () => {
                const renderables = bombaOculta;
                getImage.mockImplementation(() => {});
                expect(GetDataToLinkImage({}, 'home', renderables)).toEqual([]);
            });
        });
        describe('with Apertura', () => {
            it('Return Array with imageResizedUrls', () => {
                const renderables = dataApertura;
                getImage.mockImplementation(() => responseRelatedImageSource);
                expect(GetDataToLinkImage({}, 'home', renderables)).toEqual(
                    resizedUrls
                );
            });
        });
    });

    /////////// ACUMULADOS ///////////
    describe('When section is acumulado, return empty Array', () => {
        it('GetDataToLinkImage - acumulados', () => {
            const globalContent = {};
            const renderables = [];
            expect(
                GetDataToLinkImage(globalContent, 'acumulado', renderables)
            ).toEqual([]);
        });
    });

    /////////// DEFAULT ///////////
    describe('When section is undefined return empty array', () => {
        it('GetDataToLinkImage - nuevaSeccion', () => {
            const globalContent = {};
            const renderables = [];
            expect(
                GetDataToLinkImage(globalContent, 'nuevaSeccion', renderables)
            ).toEqual([]);
        });
    });

    describe('When the params is undefined', () => {
        it('without defined parameters, return empty Array', () => {
            expect(GetDataToLinkImage()).toEqual([]);
        });
    });
});
