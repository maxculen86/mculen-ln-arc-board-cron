import { extractDataFromPromoItems } from '../../../../../../components/private/LN/common/utils/extractDataFromPromoItems';

describe('Test function extractDataFromPromoItems', () => {
    const PLACEHOLDER =
        'https://arc-static.glanacion.com/pf/resources/images/placeholderLN-1080.jpg?d=748';

    test('Return test of the function when it has an image', () => {
        const promoItems = {
            basic: {
                _id: 'PDGFPZHDQZFPFJS5T7OODPTM2Y',
                additional_properties: {},
                created_date: '2021-04-09T19:22:06Z',
                height: 513,
                publish_date: '2021-04-09T13:19:54.5433854-03:00',
                resized_urls: [
                    {
                        option: {
                            height: 586,
                            media: '(min-width: 1280px)',
                            media_preload: '(min-width: 1280.1px)',
                            width: 879
                        },
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/drek17X7bwdCa1ZSqg1XnqIAgwQ=/879x586/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/PDGFPZHDQZFPFJS5T7OODPTM2Y.png'
                    },
                    {
                        option: {
                            height: 746,
                            media_preload:
                                '(min-width: 1024.1px and max-width: 1280px)',
                            width: 1200
                        },
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/Fh6Ak-C6J7j34qoFkkstylQIlGQ=/1200x746/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/PDGFPZHDQZFPFJS5T7OODPTM2Y.png'
                    },
                    {
                        option: {
                            height: 512,
                            media_preload:
                                '(min-width: 768.1px and max-width: 1024px)'
                        },
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/8B0aqkMoviD_QL4EkzclUVoT850=/768x512/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/PDGFPZHDQZFPFJS5T7OODPTM2Y.png'
                    }
                ],
                type: 'image',
                url:
                    'https://resizer.glanacion.com/resizer/w7O_gR-MENRvEiU2q-vXFHLcH-A=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/PDGFPZHDQZFPFJS5T7OODPTM2Y.png',
                width: 768
            }
        };

        expect(
            extractDataFromPromoItems(promoItems, PLACEHOLDER)
        ).toStrictEqual({
            image: {
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                height: '746',
                url:
                    'https://resizer.glanacion.com/resizer/Fh6Ak-C6J7j34qoFkkstylQIlGQ=/1200x746/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/PDGFPZHDQZFPFJS5T7OODPTM2Y.png',
                width: '1200'
            },
            thumbnailUrl:
                'https://resizer.glanacion.com/resizer/w7O_gR-MENRvEiU2q-vXFHLcH-A=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/PDGFPZHDQZFPFJS5T7OODPTM2Y.png'
        });
    });

    test("Function return test when it doesn't have an image.", () => {
        expect(extractDataFromPromoItems(undefined, PLACEHOLDER)).toStrictEqual(
            {
                image: {
                    '@context': 'https://schema.org',
                    '@type': 'ImageObject',
                    height: '800',
                    url: PLACEHOLDER,
                    width: '1200'
                },
                thumbnailUrl: PLACEHOLDER
            }
        );
    });
});
