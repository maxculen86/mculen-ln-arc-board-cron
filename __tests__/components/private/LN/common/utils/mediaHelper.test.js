import React from 'react';
import {
    buildScriptResizeSSRInfography,
    wikiImagesWithWWW,
    getImagesToLoadWithPicture,
    LinkImagePreload
} from '../../../../../../components/private/LN/common/utils/mediaHelper';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import getProperties from 'fusion:properties';
import articlePictureOpening from '../../../../../../__mocks__/data/articles/4HFO7YPZBFEYVB6K5XY6IFV3XY';
import articleVideoOpening from '../../../../../../__mocks__/data/articles/KMD6TFFRHRC7XBPE2DDNKOTALE';
import wikiSourceData from '../../../../../../__mocks__/data/wikiTag/wikiSourceData.json';

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

describe('Private - LN - Common - Utils -> mediaHelper', () => {
    const url =
        'https://especialess3.lanacion.com.ar/18/mundial/mundial2018-historicos/';
    const promoItems = {
        basic: {
            _id: '6POSMWEMKZCZBHINVUG3F4O3BY',
            content: `<iframe class="pym" id="LNcreativa" frameborder="0" width="100%" height="800" scrolling="no" src="${url}"></iframe>`,
            type: 'raw_html'
        }
    };
    const outputType = 'default';

    it('Deberia retornar script al ser llamado con los parametros correctos, con promo_items.basic', () => {
        const component = buildScriptResizeSSRInfography(promoItems);
        expect(component).toBeTruthy();
        expect(component.type).toStrictEqual('script');
        expect(component.props.type).toStrictEqual('text/javascript');
        expect(component.props.dangerouslySetInnerHTML.__html).toContain(url);
        expect(component.props.dangerouslySetInnerHTML.__html).toContain(
            promoItems.basic._id
        );
        expect(component).toMatchSnapshot();
    });

    const promoItemsMultimedia = {
        apertura_multimedia: {
            ...promoItems.basic
        }
    };
    it('Deberia retornar script al ser llamado con promo_items.apertura_multimedia', () => {
        const component = buildScriptResizeSSRInfography(promoItemsMultimedia);
        expect(component).toBeTruthy();
        expect(component.type).toStrictEqual('script');
        expect(component.props.type).toStrictEqual('text/javascript');
        expect(component.props.dangerouslySetInnerHTML.__html).toContain(url);
        expect(component.props.dangerouslySetInnerHTML.__html).toContain(
            promoItemsMultimedia.apertura_multimedia._id
        );
    });
    it('Deberia retornar nulo al ser llamado con los parametros incorrectos', () => {
        promoItems.basic.content = '<opta-widget></opta-widget>';
        expect(buildScriptResizeSSRInfography()).toBeNull();
        expect(buildScriptResizeSSRInfography({})).toBeNull();
        expect(buildScriptResizeSSRInfography(undefined)).toBeNull();
        expect(buildScriptResizeSSRInfography(promoItems)).toBeNull();
    });
    it('Deberia retornar nulo al ser llamado apertura imagen o video', () => {
        expect(
            buildScriptResizeSSRInfography(articlePictureOpening.promo_items)
        ).toBeNull();
        expect(
            buildScriptResizeSSRInfography(articleVideoOpening.promo_items)
        ).toBeNull();
    });
    describe('wikiImageWithWWW util', () => {
        it('Should return the resized urls with WWW', () => {
            const imagesWithWWW = wikiImagesWithWWW(wikiSourceData);
            expect(imagesWithWWW).toStrictEqual([
                {
                    option: {
                        height: 480,
                        proportion: '2:3',
                        width: 320
                    },
                    resizedUrl:
                        'https://www.lanacion.com.ar/resizer/gCybFe_noQ_U5fN_EZ_G5qYkj7Q=/320x480/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
                },
                {
                    option: {
                        height: 630,
                        proportion: '2:3',
                        width: 420
                    },
                    resizedUrl:
                        'https://www.lanacion.com.ar/resizer/AgZWlsRI2ABRxZ4bxpUbM7PLYrE=/420x630/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
                },
                {
                    option: {
                        height: 960,
                        proportion: '2:3',
                        width: 640
                    },
                    resizedUrl:
                        'https://www.lanacion.com.ar/resizer/hL0FJguUDWOHcqU8kM2ZUXrI9eo=/640x960/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
                },
                {
                    option: {
                        height: 1260,
                        proportion: '2:3',
                        width: 840
                    },
                    resizedUrl:
                        'https://www.lanacion.com.ar/resizer/Xy2RqNNoAVp8cjAoKJ9VfNT9OrA=/840x1260/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
                }
            ]);
        });
    });

    const mockDataResizedUrls = [
        {
            option: {
                height: 250,
                media_preload: '(min-width: 375)',
                minScreenWidth: 375,
                width: 375
            },
            resizedUrl:
                'https://resizer.glanacion.com/resizer/2C46C1OxpfsbGfEXgTI8TmRVBdc=/375x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
        },
        {
            option: {
                height: 200,
                media_preload: '(min-width: 320px) and (max-width: 375px)',
                minScreenWidth: 320,
                width: 300
            },
            resizedUrl:
                'https://resizer.glanacion.com/resizer/30UWxzQATknCwslKE3HABSqPEXE=/300x200/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
        }
    ];

    describe('Tests - helper - getImagesToLoadWithPicture', () => {
        const result = [
            {
                minWidth: 375,
                maxWidth: undefined,
                srcSet:
                    'https://resizer.glanacion.com/resizer/2C46C1OxpfsbGfEXgTI8TmRVBdc=/375x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
            },
            {
                minWidth: 320,
                maxWidth: undefined,
                srcSet:
                    'https://resizer.glanacion.com/resizer/30UWxzQATknCwslKE3HABSqPEXE=/300x200/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
            }
        ];

        test('should return an array of object with the props minWidth and srcSet', () => {
            expect(
                getImagesToLoadWithPicture(mockDataResizedUrls)
            ).toStrictEqual(result);
        });

        test('should return an array of object with the props maxWidth and srcSet', () => {
            expect(
                getImagesToLoadWithPicture([
                    ...mockDataResizedUrls,
                    {
                        option: {
                            height: 200,
                            maxScreenWidth: 320,
                            width: 200
                        },
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/30UWxzQATknCwslKE3HABSqPEXE=/300x200/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
                    }
                ])
            ).toStrictEqual([
                ...result,
                {
                    minWidth: undefined,
                    maxWidth: 320,
                    srcSet:
                        'https://resizer.glanacion.com/resizer/30UWxzQATknCwslKE3HABSqPEXE=/300x200/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
                }
            ]);
        });

        test('The srcSet of size 320 should contain the images for each pixel density according to the configuration', () => {
            expect(
                getImagesToLoadWithPicture([
                    {
                        option: {
                            configPixelRatio: {
                                forScreenWidth: 320,
                                xDescriptor: '2x'
                            },
                            height: 450,
                            minScreenWidth: 1024,
                            width: 768
                        },
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/AnidcDn2RnPhDMHCW90l68efmJI=/500x333/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
                    },
                    ...mockDataResizedUrls
                ])[2]
            ).toStrictEqual({
                minWidth: 320,
                maxWidth: undefined,
                srcSet:
                    'https://resizer.glanacion.com/resizer/30UWxzQATknCwslKE3HABSqPEXE=/300x200/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg, https://resizer.glanacion.com/resizer/AnidcDn2RnPhDMHCW90l68efmJI=/500x333/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg 2x'
            });
        });

        test('should not return the srcSet with pixel density if the prop xDescriptor or forScreenWidth is not specified. ', () => {
            expect(
                getImagesToLoadWithPicture([
                    {
                        option: {
                            configPixelRatio: {
                                forScreenWidth: 320
                            },
                            height: 450,
                            minScreenWidth: 1024,
                            width: 768
                        },
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/AnidcDn2RnPhDMHCW90l68efmJI=/500x333/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
                    },
                    ...mockDataResizedUrls
                ])
            ).toStrictEqual([
                {
                    minWidth: 1024,
                    maxWidth: undefined,
                    srcSet:
                        'https://resizer.glanacion.com/resizer/AnidcDn2RnPhDMHCW90l68efmJI=/500x333/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
                },
                ...result
            ]);
        });

        test('should return a emptyString when the parameters is not defined', () => {
            expect(getImagesToLoadWithPicture(undefined)).toStrictEqual([]);
        });
    });

    describe('Tests - helper - LinkImagePreload', () => {
        test('Load image with tag picture: Should return a preload link for each image with the valid attributes for a preloaded image.', () => {
            const { container } = render(
                <LinkImagePreload
                    resizedUrls={mockDataResizedUrls}
                    isLoadWithPicture={true}
                />
            );

            const resultImages = [
                {
                    mediaPreload: '(min-width: 320px) and (max-width: 375px)',
                    srcSet:
                        'https://resizer.glanacion.com/resizer/30UWxzQATknCwslKE3HABSqPEXE=/300x200/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
                },
                {
                    mediaPreload: '(min-width: 375)',
                    srcSet:
                        'https://resizer.glanacion.com/resizer/2C46C1OxpfsbGfEXgTI8TmRVBdc=/375x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
                }
            ];

            expect(container.querySelectorAll('[as=image]')).toHaveLength(2);
            expect(container.querySelectorAll('[rel=preload]')).toHaveLength(2);
            expect(container.querySelectorAll('link')).toHaveLength(2);
            expect(
                container.querySelectorAll('[fetchpriority=high]')
            ).toHaveLength(2);

            resultImages.forEach(({ mediaPreload, srcSet }) => {
                expect(
                    container.querySelector(`[imagesrcset="${srcSet}"]`)
                ).toBeDefined();

                expect(
                    container.querySelector(`[media="${mediaPreload}"]`)
                ).toBeDefined();
            });

            expect(container).toMatchSnapshot();
        });

        test('Load image without tag picture: Should return only a preload link', () => {
            const { container } = render(
                <LinkImagePreload
                    resizedUrls={mockDataResizedUrls}
                    isLoadWithPicture={false}
                />
            );

            expect(container.querySelectorAll('link')).toHaveLength(1);
            expect(container).toMatchSnapshot();
        });

        test('should a empty node when the resizedUrls is not defined', () => {
            const { container } = render(
                <LinkImagePreload resizedUrls={[]} isLoadWithPicture={false} />
            );

            expect(container).toMatchInlineSnapshot(`<div />`);
        });
    });
});
