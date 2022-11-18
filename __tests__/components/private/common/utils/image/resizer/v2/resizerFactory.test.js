import { resizePromoItems } from '../../../../../../../../components/private/common/utils/image/resizer/v2/resizerFactory';

jest.mock('fusion:environment', () => {
    return {
        SITE_LANACION: 'https://sandbox.lanacion.com.ar/',
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com/',
        API_ENV: 'sandbox'
    };
});

describe('Common - Resizer - v2 - resizerFactory', () => {
    const subtype = 1;
    const zoomSizes = [
        { width: 1920, height: 1280, media: '(min-width: 1280px)' },
        { width: 1200, height: 800, media: '(min-width: 1024px)' },
        { width: 1023, height: 682, media: '(min-width: 768px)' },
        { width: 768, height: 512, media: '(min-width: 360px)' },
        { width: 360, height: 240, media: '(min-width: 320px)' }
    ];
    const presetsPromoItems = {
        sizes: [
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
        ]
    };

    const promoItems = {
        basic: {
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
            address: {},
            auth: {
                '1':
                    '1f6894f8d079227a933c5b63e67a9d263f2c20ac045aa3c992ab691cbcc7fff9'
            },
            created_date: '2022-09-07T11:00:27Z',
            height: 549,
            last_updated_date: '2022-09-07T11:00:27Z',
            licensable: false,
            owner: { id: 'sandbox.lanacionar' },
            source: {
                additional_properties: [Object],
                edit_url:
                    'https://sandbox.lanacionar.arcpublishing.com/photo/J43DRG7ZGZCANB6PYJG2VQ35QY',
                system: 'photo center'
            },
            status: 'published',
            type: 'image',
            url:
                'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
            version: '0.10.3',
            width: 976,
            display_date: '2022-09-07T08:00:21.3686076-03:00',
            first_publish_date: '2022-09-07T08:00:21.3686072-03:00',
            language: 'es-419',
            publish_date: '2022-09-07T08:00:21.3686072-03:00'
        }
    };

    test('should first', () => {
        const res = resizePromoItems(
            presetsPromoItems,
            zoomSizes,
            subtype,
            promoItems
        );
        console.log('QQQQQQQ', res);
    });
});

// example:
// const presetsPromoItems = {
//     sizes: [
//         {
//             width: 309,
//             height: 206,
//             proportion: '3:2',
//             media_preload: '(max-width: 375px)'
//         },
//         {
//             width: 351,
//             height: 234,
//             proportion: '3:2',
//             media_preload: '(min-width: 375.1px and max-width: 768px)'
//         },
//         {
//             width: 768,
//             height: 512,
//             proportion: '3:2',
//             media_preload: '(min-width: 768.1px and max-width: 1024px)'
//         },
//         {
//             width: 879,
//             height: 586,
//             media: '(min-width: 1280px)',
//             proportion: '3:2',
//             media_preload: '(min-width: 1280.1px)'
//         },
//         {
//             width: 1200,
//             height: 746,
//             proportion: '3:2',
//             media_preload: '(min-width: 1024.1px and max-width: 1280px)'
//         }
//     ]
// };
// const presetsDefault = undefined;
// const zoomSizes = [
//     { width: 1920, height: 1280, media: '(min-width: 1280px)' },
//     { width: 1200, height: 800, media: '(min-width: 1024px)' },
//     { width: 1023, height: 682, media: '(min-width: 768px)' },
//     { width: 768, height: 512, media: '(min-width: 360px)' },
//     { width: 360, height: 240, media: '(min-width: 320px)' }
// ];

// const subtyp = 1;
// const promoItems = {
//     basic: {
//         _id: 'J43DRG7ZGZCANB6PYJG2VQ35QY',
//         additional_properties: {
//             fullSizeResizeUrl:
//                 '/resizer/rOia9tQrJSvFalApJUoiM7LmF88=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
//             galleries: [],
//             mime_type: 'image/jpeg',
//             originalName:
//                 'https://c.files.bbci.co.uk/AD33/production/_126593344_mediaitem126593343.jpg',
//             originalUrl:
//                 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
//             proxyUrl:
//                 '/resizer/rOia9tQrJSvFalApJUoiM7LmF88=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
//             published: true,
//             resizeUrl:
//                 '/resizer/rOia9tQrJSvFalApJUoiM7LmF88=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
//             restricted: false,
//             thumbnailResizeUrl:
//                 '/resizer/XariBOP5f8WS-4e1CqTTHBx9m8Q=/300x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
//             version: 0
//         },
//         address: {},
//         auth: {
//             '1':
//                 '1f6894f8d079227a933c5b63e67a9d263f2c20ac045aa3c992ab691cbcc7fff9'
//         },
//         created_date: '2022-09-07T11:00:27Z',
//         height: 549,
//         last_updated_date: '2022-09-07T11:00:27Z',
//         licensable: false,
//         owner: { id: 'sandbox.lanacionar' },
//         source: {
//             additional_properties: [Object],
//             edit_url:
//                 'https://sandbox.lanacionar.arcpublishing.com/photo/J43DRG7ZGZCANB6PYJG2VQ35QY',
//             system: 'photo center'
//         },
//         status: 'published',
//         type: 'image',
//         url:
//             'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg',
//         version: '0.10.3',
//         width: 976,
//         display_date: '2022-09-07T08:00:21.3686076-03:00',
//         first_publish_date: '2022-09-07T08:00:21.3686072-03:00',
//         language: 'es-419',
//         publish_date: '2022-09-07T08:00:21.3686072-03:00'
//     }
// };
