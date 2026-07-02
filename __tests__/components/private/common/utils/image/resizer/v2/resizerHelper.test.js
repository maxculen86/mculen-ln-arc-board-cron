import * as resizerHelper from '../../../../../../../../components/private/common/utils/image/resizer/v2/resizerHelper';

import {
    resizeArcImage,
    resizeImgUrl,
    resizeUrlCollection
} from '../../../../../../../../components/private/common/utils/image/resizer/v2/resizerHelper';

jest.mock(
    'fusion:environment',
    () => {
        return {
            IS_SANDBOX: 'true',
            API_ENV: 'prod',
            SITE_LANACION: 'https://sandbox.lanacion.com.ar',
            SITE_FOODIT: 'https://foodit-sandbox.lanacion.com.ar/',
            RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com'
        };
    },
    { virtual: true }
);

describe('Common - Resizer', () => {
    describe('buildQueryParams', () => {
        const arcImage = {
            _id: 'J43DRG7ZGZCANB6PYJG2VQ35QY',
            additional_properties: {
                originalUrl:
                    'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Wilbert.jpg'
            },
            auth: {
                1: '1f6894f8d079227a933'
            }
        };

        test('Should return empty string without arcImage data', () => {
            expect(resizerHelper.buildQueryParams({})).toEqual('');
        });

        test('Should return string with auth, width, height, quality and smart params', () => {
            const queryParams = resizerHelper.buildQueryParams({
                newWidth: 1200,
                newHeight: 1200,
                filterQuality: 70,
                arcImage
            });
            expect(queryParams).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&width=1200&height=1200&quality=70&smart=true'
            );
        });

        test('Should return string with auth params', () => {
            expect(
                resizerHelper.buildQueryParams({
                    arcImage
                })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&quality=70&smart=false'
            );
        });

        test('Should return string with Width params', () => {
            expect(
                resizerHelper.buildQueryParams({ newWidth: 1200, arcImage })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&width=1200&quality=70&smart=false'
            );
        });

        test('should return string with all params but without Width param', () => {
            expect(
                resizerHelper.buildQueryParams({ newWidth: [], arcImage })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&quality=70&smart=false'
            );
        });

        test('should return string with Height params', () => {
            expect(
                resizerHelper.buildQueryParams({ newHeight: 1200, arcImage })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&height=1200&quality=70&smart=false'
            );
        });

        test('should return string with height params but without focal if both height and width are not provided', () => {
            expect(
                resizerHelper.buildQueryParams({
                    arcImage,
                    newHeight: 1200,
                    focalPoint: [10, 15]
                })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&height=1200&quality=70&smart=false'
            );
        });
        test('should return string with height, width and focal params (only focal set when height and width are provided)', () => {
            expect(
                resizerHelper.buildQueryParams({
                    arcImage,
                    newHeight: 1200,
                    newWidth: 800,
                    smartCropExcluded: true,
                    focalPoint: [10, 15]
                })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&width=800&height=1200&quality=70&smart=false&focal=10,15'
            );
        });
        test('should return string with smartCrop true when focalPoint its not provided or invalid', () => {
            expect(
                resizerHelper.buildQueryParams({
                    arcImage,
                    newHeight: 1200,
                    newWidth: 800,
                    smartCropExcluded: true,
                    focalPoint: []
                })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&width=800&height=1200&quality=70&smart=true'
            );
        });
    });

    describe('isResizerV2 function', () => {
        const v1Url =
            'https://resizer.glanacion.com/resizer/nvXI-Drw6YuzQFcRuFJ4q_7PhU8=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3IFEHM7KAFCWRJQIO4B36IHNLU.jpg';
        const v2Url =
            'https://resizer.glanacion.com/resizer/v2/574B3ES775FGPMKR7SZ6TMTPVA.JPG?auth=67e2472eccb2fcf95e748698005353559059303fbfff9c7df6d0d6d7a60619c9&width=768&quality=80&smart=true';
        it('Should return false for v1 urls', () => {
            expect(resizerHelper.isResizerV2(v1Url)).toBeFalsy();
        });
        it('Should return false for any other string urls', () => {
            expect(resizerHelper.isResizerV2('')).toBeFalsy();
            expect(resizerHelper.isResizerV2('prueba')).toBeFalsy();
        });
        it('Should return false for invalid paramethers', () => {
            expect(resizerHelper.isResizerV2()).toBeFalsy();
            expect(resizerHelper.isResizerV2(null)).toBeFalsy();
            expect(resizerHelper.isResizerV2({})).toBeFalsy();
        });
        it('Should return true for v2 urls', () => {
            expect(resizerHelper.isResizerV2(v2Url)).toBeTruthy();
        });
    });
    describe('isResizerV1 function', () => {
        const v1Url =
            'https://resizer.glanacion.com/resizer/nvXI-Drw6YuzQFcRuFJ4q_7PhU8=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3IFEHM7KAFCWRJQIO4B36IHNLU.jpg';
        const v2Url =
            'https://resizer.glanacion.com/resizer/v2/574B3ES775FGPMKR7SZ6TMTPVA.JPG?auth=67e2472eccb2fcf95e748698005353559059303fbfff9c7df6d0d6d7a60619c9&width=768&quality=80&smart=true';
        const externalUrl =
            'https://s3.amazonaws.com/arc-authors/lanacionar/2089284.png';
        it('Should return true for v1 urls', () => {
            expect(resizerHelper.isResizerV1(v1Url)).toBeTruthy();
        });
        it('Should return false for any other string urls', () => {
            expect(resizerHelper.isResizerV1('')).toBeFalsy();
            expect(resizerHelper.isResizerV1('prueba')).toBeFalsy();
        });
        it('Should return false for invalid paramethers', () => {
            expect(resizerHelper.isResizerV1()).toBeFalsy();
            expect(resizerHelper.isResizerV1(null)).toBeFalsy();
            expect(resizerHelper.isResizerV1({})).toBeFalsy();
        });
        it('Should return false for v2 urls', () => {
            expect(resizerHelper.isResizerV1(v2Url)).toBeFalsy();
        });
        it('Should return false for external urls', () => {
            expect(resizerHelper.isResizerV1(externalUrl)).toBeFalsy();
        });
    });

    describe('Common - Resizer - updateHeight fn', () => {
        const opt = {
            width: 768,
            height: 513
        };
        it('Should return new height for vertical images, according to proportion', () => {
            const height = resizerHelper.updateHeight(2880, 1944, opt);
            expect(height).toBe(1137);
        });
        it('Should return same height for horizontal images', () => {
            const opt = {
                width: 768,
                height: 513
            };
            const height = resizerHelper.updateHeight(1944, 2880, opt);
            expect(height).toBe(513);
        });
        it('Should return same height for images with proportion set', () => {
            opt.proportion = '2:3';
            const height = resizerHelper.updateHeight(2880, 1944, opt);
            expect(height).toBe(513);
        });
    });

    describe('Common - Resizer - autoHeight fn', () => {
        it('return correct proportional height from original height and width for vertical images', () => {
            const height = resizerHelper.autoHeight(2000, 1000, 500);
            expect(height).toBe(1000);

            const height2 = resizerHelper.autoHeight(2880, 1944, 320);
            expect(height2).toBe(474);
        });
        it('Should return correct proportional height from original height and width for horizontal images', () => {
            const height = resizerHelper.autoHeight(1000, 2000, 1000);
            expect(height).toBe(500);

            const height2 = resizerHelper.autoHeight(1944, 2880, 320);
            expect(height2).toBe(216);
        });
        it('Should return null if originalHeight originalWidth or newWidth are not valid numbers', () => {
            expect(resizerHelper.autoHeight('2', 1944, 288)).toBe(0);
            expect(resizerHelper.autoHeight({}, {}, {})).toBe(0);
        });
        it('Should not return NaN values', () => {
            expect(resizerHelper.autoHeight(0, 0, 0)).toBe(0);
        });
    });

    it('should return height according proportion', () => {
        const height = resizerHelper.setHeight(1200, 800, '3:2');
        expect(height).toBe(800);
    });

    it('should return 372 for width 559 and proportion 3:2 (regression test)', () => {
        const height = resizerHelper.setHeight(559, 0, '3:2');
        expect(height).toBe(372);
    });

    it('should return the correct focal string', () => {
        const focalStr = resizerHelper.setStrFocal(500, 450);
        expect(focalStr).toBe('495,455:505,445');
    });

    test('should use smartCrop', () => {
        const mockValues = {
            resizeOptions: {
                width: 298,
                height: 200,
                media: '(min-width: 1280px)',
                useFullSize: true,
                proportion: '3:2'
            },
            originalWidth: 2000,
            originalHeight: 1333,
            focalPoint: [],
            smartCropExcluded: false
        };

        resizerHelper.setCropMethod({ ...mockValues });
    });

    test('should use filter focal', () => {
        const mockValues = {
            defaultResizeWithSmart: {
                width: 298,
                height: 200,
                media: '(min-width: 1280px)',
                useFullSize: true,
                proportion: '3:2',
                isNotSmart: true
            },
            originalWidth: 2000,
            originalHeight: 1333,
            focalPoint: [500, 200],
            smartCropExcluded: false
        };

        resizerHelper.setCropMethod({ ...mockValues });
    });

    describe('baseUrl function', () => {
        const siteLanacion = 'https://sandbox.lanacion.com.ar';
        const siteFoodit = 'https://foodit-sandbox.lanacion.com.ar';
        const resizerUrlPublic = 'https://resizer.glanacion.com';
        const customResizerUrl = 'https://custom-resizer.example.com';

        const baseUrlCases = [
            [
                'When isAdmin false and isInApertura true should return https://sandbox.lanacion.com.ar/',
                {
                    testArguments: [{ isAdmin: false, isInApertura: true }],
                    testResult: siteLanacion
                }
            ],
            [
                'When isAdmin false, isInApertura true and arcSite "foodit" should return https://foodit-sandbox.lanacion.com.ar/',
                {
                    testArguments: [
                        {
                            isAdmin: false,
                            isInApertura: true,
                            arcSite: 'foodit'
                        }
                    ],
                    testResult: siteFoodit
                }
            ],
            [
                'When isAdmin true and isInApertura true should return https://sandbox.lanacion.com.ar/',
                {
                    testArguments: [{ isAdmin: true, isInApertura: true }],
                    testResult: siteLanacion
                }
            ],
            [
                'When isAdmin true and isInApertura false should return https://sandbox.lanacion.com.ar/',
                {
                    testArguments: [{ isAdmin: true, isInApertura: false }],
                    testResult: siteLanacion
                }
            ],
            [
                'When isAdmin false and isInApertura false should return https://sandbox.lanacion.com.ar/',
                {
                    testArguments: [{ isAdmin: false, isInApertura: false }],
                    testResult: siteLanacion
                }
            ],
            [
                'When arcSite is foodit and isInApertura false should keep resizer domain',
                {
                    testArguments: [
                        {
                            isAdmin: false,
                            isInApertura: false,
                            arcSite: 'foodit'
                        }
                    ],
                    testResult: resizerUrlPublic
                }
            ],
            [
                'When arcSite is foodit and custom resizerUrl exists should keep custom resizer domain',
                {
                    testArguments: [
                        {
                            isAdmin: false,
                            isInApertura: false,
                            arcSite: 'foodit',
                            resizerUrl: customResizerUrl
                        }
                    ],
                    testResult: customResizerUrl
                }
            ],
            [
                'When arcSite is lanacionar and custom resizerUrl exists should keep site domain',
                {
                    testArguments: [
                        {
                            isAdmin: false,
                            isInApertura: false,
                            arcSite: 'lanacionar',
                            resizerUrl: customResizerUrl
                        }
                    ],
                    testResult: siteLanacion
                }
            ]
        ];

        test.each(baseUrlCases)(
            '%s',
            (message, { testArguments, testResult }) => {
                const result = resizerHelper.baseUrl(...testArguments);
                expect(result).toEqual(testResult);
            }
        );
    });

    describe('replaceUrlResizerToWWW baseUrlOverride parameter', () => {
        test('should use baseUrlOverride for url, resized_urls and resized_urls_zoom', () => {
            const result = resizerHelper.replaceUrlResizerToWWW(
                {
                    type: 'image',
                    url: 'https://sandbox-resizer.glanacion.com/resizer/v2/wiki-image.png?auth=123&width=320',
                    resized_urls: [
                        {
                            resizedUrl:
                                'https://sandbox-resizer.glanacion.com/resizer/v2/wiki-image.png?auth=123&width=420'
                        }
                    ],
                    resized_urls_zoom: [
                        {
                            resizedUrl:
                                'https://sandbox-resizer.glanacion.com/resizer/v2/wiki-image.png?auth=123&width=640'
                        }
                    ]
                },
                'la-nacion-ar',
                'https://www.lanacion.com.ar'
            );

            expect(result.url).toBe(
                'https://www.lanacion.com.ar/resizer/v2/wiki-image.png?auth=123&width=320'
            );
            expect(result.resized_urls[0].resizedUrl).toBe(
                'https://www.lanacion.com.ar/resizer/v2/wiki-image.png?auth=123&width=420'
            );
            expect(result.resized_urls_zoom[0].resizedUrl).toBe(
                'https://www.lanacion.com.ar/resizer/v2/wiki-image.png?auth=123&width=640'
            );
        });
    });
});
describe('Common - Resizer - updateHeight fn', () => {
    const opt = {
        width: 768,
        height: 513
    };
    it('Should return new height for vertical images, according to proportion', () => {
        const height = resizerHelper.updateHeight(2880, 1944, opt);
        expect(height).toBe(1137);
    });
    it('Should return same height for horizontal images', () => {
        const opt = {
            width: 768,
            height: 513
        };
        const height = resizerHelper.updateHeight(1944, 2880, opt);
        expect(height).toBe(513);
    });
    it('Should return same height for images with proportion set', () => {
        opt.proportion = '2:3';
        const height = resizerHelper.updateHeight(2880, 1944, opt);
        expect(height).toBe(513);
    });
});

describe('Tests resizer helper', () => {
    const filterQuality = 70;
    const smartCropExcluded = false;
    const focalPoint = [];
    const defaultResizeWithSmart = {
        width: 320,
        height: 213,
        useFullSize: true,
        proportion: '3:2'
    };
    const originalHeight = 549;
    const originalWidth = 976;

    const arcImage = {
        _id: 'J43DRG7ZGZCANB6PYJG2VQ35QY',
        additional_properties: {
            originalUrl:
                'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/Wilbert.jpg'
        },
        auth: {
            1: '5fc021d6cb100a1e636789f166523834845bae53e918308417ee6a0bcafbf069'
        }
    };

    const _resizeOptions = [
        {
            width: 309,
            height: 206,
            proportion: '3:2',
            media_preload: '(max-width: 375px)'
        },
        {
            width: 351,
            height: 234,
            proportion: '3:2',
            media_preload: '(min-width: 375.1px and max-width: 768px)'
        },
        {
            width: 768,
            height: 512,
            proportion: '3:2',
            media_preload: '(min-width: 768.1px and max-width: 1024px)'
        },
        {
            width: 879,
            height: 586,
            media: '(min-width: 1280px)',
            proportion: '3:2',
            media_preload: '(min-width: 1280.1px)'
        },
        {
            width: 1200,
            height: 746,
            proportion: '3:2',
            media_preload: '(min-width: 1024.1px and max-width: 1280px)'
        }
    ];

    describe('resizeArcImage', () => {
        const promoItems = {
            _id: 'J43DRG7ZGZCANB6PYJG2VQ35QY',
            additional_properties: {
                fullSizeResizeUrl:
                    'rOia9tQrJSvFalApJUoiM7LmF88=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
                galleries: [],
                mime_type: 'image/jpeg',
                originalName:
                    'https://c.files.bbci.co.uk/AD33/production/_126593344_mediaitem126593343.jpg',
                originalUrl:
                    'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
                proxyUrl:
                    'rOia9tQrJSvFalApJUoiM7LmF88=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
                published: true,
                resizeUrl:
                    'rOia9tQrJSvFalApJUoiM7LmF88=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
                restricted: false,
                thumbnailResizeUrl:
                    'XariBOP5f8WS-4e1CqTTHBx9m8Q=/300x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
                version: 0
            },
            auth: {
                1: '1f6894f8d079227a933c5b63e67a9d263f2c20ac045aa3c992ab691cbcc7fff9'
            },
            height: 549,
            source: {
                additional_properties: { editor: 'photo center' },
                edit_url:
                    'https://sandbox.lanacionar.arcpublishing.com/photo/J43DRG7ZGZCANB6PYJG2VQ35QY',
                system: 'photo center'
            },
            type: 'image',
            url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
            width: 976
        };

        const optionsFinal = [
            {
                width: 309,
                height: 206,
                proportion: '3:2',
                media_preload: '(max-width: 375px)'
            },
            {
                width: 351,
                height: 234,
                proportion: '3:2',
                media_preload: '(min-width: 375.1px and max-width: 768px)'
            },
            {
                width: 768,
                height: 512,
                proportion: '3:2',
                media_preload: '(min-width: 768.1px and max-width: 1024px)'
            },
            {
                width: 879,
                height: 586,
                media: '(min-width: 1280px)',
                proportion: '3:2',
                media_preload: '(min-width: 1280.1px)'
            },
            {
                width: 1200,
                height: 746,
                proportion: '3:2',
                media_preload: '(min-width: 1024.1px and max-width: 1280px)'
            }
        ];
        const zoomSizes = [
            { width: 1920, height: 1280, media: '(min-width: 1280px)' },
            { width: 1200, height: 800, media: '(min-width: 1024px)' },
            { width: 1023, height: 682, media: '(min-width: 768px)' },
            { width: 768, height: 512, media: '(min-width: 360px)' },
            { width: 360, height: 240, media: '(min-width: 320px)' }
        ];
        const shouldExcludeCrop = false;
        const defaultResize = {
            width: 768,
            height: 513,
            media: '(min-width: 768px)'
        };

        test('resizeArcImage', () => {
            const resizerImage = resizeArcImage({
                arcImage: promoItems,
                resizeOptions: optionsFinal,
                zoomSizes,
                smartCropExcluded: shouldExcludeCrop,
                defaultResize
            });
            expect(resizerImage).toMatchSnapshot();
        });
    });

    describe('When is not admin and is not isInapertura', () => {
        describe('ResizerUrl function', () => {
            test('Should return a Resized url with correct params and sandbox base url', () => {
                const resizerUrl = resizeImgUrl({
                    originalWidth,
                    originalHeight,
                    defaultResizeWithSmart,
                    focalPoint,
                    smartCropExcluded,
                    filterQuality,
                    isInApertura: true,
                    isAdmin: false,
                    arcImage
                });
                expect(resizerUrl).toEqual(
                    'https://sandbox.lanacion.com.ar/resizer/v2/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=5fc021d6cb100a1e636789f166523834845bae53e918308417ee6a0bcafbf069&width=320&height=213&quality=70&smart=true'
                );
            });
        });

        describe('resizeUrlCollection function', () => {
            test('should return array with resized urls with options', () => {
                const res = resizeUrlCollection({
                    originalWidth,
                    originalHeight,
                    defaultResizeWithSmart: _resizeOptions,
                    focalPoint,
                    smartCropExcluded,
                    filterQuality,
                    arcImage
                });
                expect(res).toMatchSnapshot();
            });
        });
    });

    describe('When is admin and is isInApertura', () => {
        test('Should return a Resized url with correct params and site base url', () => {
            const resizerUrl = resizeImgUrl({
                originalWidth,
                originalHeight,
                defaultResizeWithSmart,
                focalPoint,
                smartCropExcluded,
                filterQuality,
                isInApertura: true,
                isAdmin: true,
                arcImage
            });
            expect(resizerUrl).toEqual(
                'https://sandbox.lanacion.com.ar/resizer/v2/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=5fc021d6cb100a1e636789f166523834845bae53e918308417ee6a0bcafbf069&width=320&height=213&quality=70&smart=true'
            );
        });
    });

    describe('Foodit brand scope', () => {
        test('Should keep resizer domain for Foodit images outside apertura', () => {
            const resizerUrl = resizeImgUrl({
                originalWidth,
                originalHeight,
                defaultResizeWithSmart,
                focalPoint,
                smartCropExcluded,
                filterQuality,
                arcSite: 'foodit',
                arcImage
            });

            expect(resizerUrl).toEqual(
                'https://resizer.glanacion.com/resizer/v2/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=5fc021d6cb100a1e636789f166523834845bae53e918308417ee6a0bcafbf069&width=320&height=213&quality=70&smart=true'
            );
        });

        test('Should use Foodit site domain for Foodit apertura images', () => {
            const resizerUrl = resizeImgUrl({
                originalWidth,
                originalHeight,
                defaultResizeWithSmart,
                focalPoint,
                smartCropExcluded,
                filterQuality,
                isInApertura: true,
                arcSite: 'foodit',
                arcImage
            });

            expect(resizerUrl).toEqual(
                'https://foodit-sandbox.lanacion.com.ar/resizer/v2/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=5fc021d6cb100a1e636789f166523834845bae53e918308417ee6a0bcafbf069&width=320&height=213&quality=70&smart=true'
            );
        });
    });

    describe('getSlugForImage', () => {
        it('should return empty string from object', () => {
            const imageData = {};

            const result = resizerHelper.getSlugForImage(imageData);
            expect(result).toBe('');
        });

        it('should return slug from loremtextramdon lorem', () => {
            const imageData = { alt_text: 'loremtextramdon lorem' };

            const result = resizerHelper.getSlugForImage(imageData);
            expect(result).toBe('loremtextramdon-');
        });

        it('should return slug from loremtextramdon', () => {
            const imageData = { alt_text: 'loremtextramdon' };

            const result = resizerHelper.getSlugForImage(imageData);
            expect(result).toBe('loremtextramdo-');
        });

        it('should return slug from text greater than 50 charts', () => {
            const imageData = {
                alt_text:
                    'loremtextramdonasdgfsdfanwjkndlkandansdnasmdporuhsjfhuqeysktpñlaisu'
            };

            const result = resizerHelper.getSlugForImage(imageData);
            expect(result).toBe(
                'loremtextramdonasdgfsdfanwjkndlkandansdnasmdporuh-'
            );
        });
    });
});
