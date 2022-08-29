import getProperties from 'fusion:properties';
import transformWikiTagData from '../../../../content/sources/utils/transformWikiTagData';
import mockWikiTagPersonaRawData from '../../../../__mocks__/data/wikiTag/wikiTagPersonRawData.json';
import mockWikiTagPerson from '../../../../__mocks__/data/wikiTag/wikiTagPersona.json';
import getImageResized from '../../../../components/private/common/utils/getImageResized';

jest.mock('fusion:properties', () => () => ({
    getProperties: () => {
        return {
            imageConfig: {
                resize: {
                    default: [
                        {
                            width: 1033,
                            height: 768,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            media_preload: '(min-width: 768px)'
                        }
                    ],
                    wikiTag: {
                        promo_items: {
                            sizes: [
                                {
                                    width: 320,
                                    height: 480,
                                    proportion: '2:3'
                                },
                                {
                                    width: 420,
                                    height: 630,
                                    proportion: '2:3'
                                },
                                {
                                    width: 640,
                                    height: 960,
                                    proportion: '2:3'
                                },
                                {
                                    width: 840,
                                    height: 1260,
                                    proportion: '2:3'
                                }
                            ]
                        }
                    }
                }
            }
        };
    }
}));

jest.mock('../../../../components/private/common/utils/getImageResized', () =>
    jest.fn().mockReturnValueOnce([
        {
            option: {
                height: 480,
                proportion: '2:3',
                width: 320
            },
            resizedUrl:
                'https://resizer.glanacion.com/resizer/gCybFe_noQ_U5fN_EZ_G5qYkj7Q=/320x480/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
        },
        {
            option: {
                height: 630,
                proportion: '2:3',
                width: 420
            },
            resizedUrl:
                'https://resizer.glanacion.com/resizer/AgZWlsRI2ABRxZ4bxpUbM7PLYrE=/420x630/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
        },
        {
            option: {
                height: 960,
                proportion: '2:3',
                width: 640
            },
            resizedUrl:
                'https://resizer.glanacion.com/resizer/hL0FJguUDWOHcqU8kM2ZUXrI9eo=/640x960/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
        },
        {
            option: {
                height: 1260,
                proportion: '2:3',
                width: 840
            },
            resizedUrl:
                'https://resizer.glanacion.com/resizer/Xy2RqNNoAVp8cjAoKJ9VfNT9OrA=/840x1260/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
        }
    ])
);

describe('Content Sources: Tag Source - WikiTagData Transform', () => {
    it('Should return the correct format of data', () => {
        const siteProps = {
            imageConfig: 'wikiTag',
            arcSite: 'la-nacion-ar'
        };
        expect(
            transformWikiTagData(mockWikiTagPersonaRawData, siteProps)
        ).toStrictEqual(mockWikiTagPerson);
    });
});
