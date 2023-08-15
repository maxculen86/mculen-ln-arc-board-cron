import {
    resizeImgUrl,
    resizeUrlCollection,
    resizeArcImage
} from '../../../../../../../../components/private/common/utils/image/resizer/v2/buildResizerUrls';

jest.mock('fusion:environment', () => {
    return {
        IS_SANDBOX: 'true',
        API_ENV: 'prod',
        SITE_LANACION: 'https://sandbox.lanacion.com.ar',
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com'
    };
});

describe('Common - Resizer - v2 - resizerFactory', () => {
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
                    '/resizer/rOia9tQrJSvFalApJUoiM7LmF88=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
                galleries: [],
                mime_type: 'image/jpeg',
                originalName:
                    'https://c.files.bbci.co.uk/AD33/production/_126593344_mediaitem126593343.jpg',
                originalUrl:
                    'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
                proxyUrl:
                    '/resizer/rOia9tQrJSvFalApJUoiM7LmF88=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
                published: true,
                resizeUrl:
                    '/resizer/rOia9tQrJSvFalApJUoiM7LmF88=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
                restricted: false,
                thumbnailResizeUrl:
                    '/resizer/XariBOP5f8WS-4e1CqTTHBx9m8Q=/300x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
                version: 0
            },
            auth: {
                '1':
                    '1f6894f8d079227a933c5b63e67a9d263f2c20ac045aa3c992ab691cbcc7fff9'
            },
            height: 549,
            source: {
                additional_properties: { editor: 'photo center' },
                edit_url:
                    'https://sandbox.lanacionar.arcpublishing.com/photo/J43DRG7ZGZCANB6PYJG2VQ35QY',
                system: 'photo center'
            },
            type: 'image',
            url:
                'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
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
                    'https://sandbox.lanacion.com.ar/resizer/v2/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=5fc021d6cb100a1e636789f166523834845bae53e918308417ee6a0bcafbf069&width=320&height=213&quality=70&smart=false'
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
        test('Should return a Resized url with correct params and glanacion base url', () => {
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
                'https://resizer.glanacion.com/resizer/v2/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=5fc021d6cb100a1e636789f166523834845bae53e918308417ee6a0bcafbf069&width=320&height=213&quality=70&smart=false'
            );
        });
    });
});
