import React from 'react';
import { preload } from 'react-dom';
import {
    wikiImagesWithWWW,
    getImagesToLoadWithPicture,
    LinkImagePreload
} from '../../../../../../components/private/LN/common/utils/mediaHelper';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import wikiSourceData from '../../../../../../__mocks__/data/wikiTag/wikiSourceData.json';

jest.mock(
    'fusion:environment',
    () => {
        return {
            RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
            SITE_LANACION: 'https://www.lanacion.com.ar'
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:properties',
    () => () => ({
        getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
    }),
    { virtual: true }
);

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    preload: jest.fn()
}));

describe('Private - LN - Common - Utils -> mediaHelper', () => {
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

    const pixelDensityResizedUrls = [
        {
            option: {
                configPixelRatio: {
                    forScreenWidth: 320,
                    xDescriptor: '2x'
                },
                media_preload: '(max-width: 767px)',
                minScreenWidth: 1024,
                width: 640
            },
            resizedUrl: 'https://example.com/image-640.jpg'
        },
        {
            option: {
                media_preload: '(max-width: 767px)',
                minScreenWidth: 320,
                width: 320
            },
            resizedUrl: 'https://example.com/image-320.jpg'
        }
    ];

    describe('Tests - helper - getImagesToLoadWithPicture', () => {
        const result = [
            {
                minWidth: 375,
                maxWidth: undefined,
                srcSet: 'https://resizer.glanacion.com/resizer/2C46C1OxpfsbGfEXgTI8TmRVBdc=/375x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
            },
            {
                minWidth: 320,
                maxWidth: undefined,
                srcSet: 'https://resizer.glanacion.com/resizer/30UWxzQATknCwslKE3HABSqPEXE=/300x200/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
            }
        ];

        test('should return an array of object with the props minWidth and srcSet', () => {
            expect(
                getImagesToLoadWithPicture(false, mockDataResizedUrls)
            ).toStrictEqual(result);
        });

        test('should return an array of object with the props maxWidth and srcSet', () => {
            expect(
                getImagesToLoadWithPicture(false, [
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
                    srcSet: 'https://resizer.glanacion.com/resizer/30UWxzQATknCwslKE3HABSqPEXE=/300x200/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
                }
            ]);
        });

        test('The srcSet of size 320 should contain the images for each pixel density according to the configuration', () => {
            expect(
                getImagesToLoadWithPicture(false, [
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
                srcSet: 'https://resizer.glanacion.com/resizer/30UWxzQATknCwslKE3HABSqPEXE=/300x200/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg, https://resizer.glanacion.com/resizer/AnidcDn2RnPhDMHCW90l68efmJI=/500x333/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg 2x'
            });
        });

        test('should not return the srcSet with pixel density if the prop xDescriptor or forScreenWidth is not specified. ', () => {
            expect(
                getImagesToLoadWithPicture(false, [
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
                    srcSet: 'https://resizer.glanacion.com/resizer/AnidcDn2RnPhDMHCW90l68efmJI=/500x333/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
                },
                ...result
            ]);
        });

        test('should return a emptyString when the parameters is not defined', () => {
            expect(getImagesToLoadWithPicture(false, undefined)).toStrictEqual(
                []
            );
        });
    });

    describe('Tests - helper - LinkImagePreload', () => {
        beforeEach(() => {
            preload.mockClear();
        });

        test('Load image with tag picture: Should call preload for each image with valid attributes.', () => {
            const resultImages = [
                {
                    mediaPreload: '(min-width: 320px) and (max-width: 375px)',
                    href: 'https://resizer.glanacion.com/resizer/30UWxzQATknCwslKE3HABSqPEXE=/300x200/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
                },
                {
                    mediaPreload: '(min-width: 375)',
                    href: 'https://resizer.glanacion.com/resizer/2C46C1OxpfsbGfEXgTI8TmRVBdc=/375x250/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VCRD7CO2NJFN3MPKC7FVFNPKPE.jpg'
                }
            ];

            render(
                <LinkImagePreload
                    resizedUrls={mockDataResizedUrls}
                    isLoadWithPicture={true}
                />
            );

            expect(preload).toHaveBeenCalledTimes(2);
            resultImages.forEach(({ mediaPreload, href }) => {
                expect(preload).toHaveBeenCalledWith(
                    href,
                    expect.objectContaining({
                        as: 'image',
                        fetchPriority: 'high',
                        media: mediaPreload
                    })
                );
            });
        });

        test('keeps imageSrcSet support enabled for existing consumers by default', () => {
            render(<LinkImagePreload resizedUrls={pixelDensityResizedUrls} />);

            expect(
                preload.mock.calls.some(
                    ([, options]) => options && options.imageSrcSet
                )
            ).toBe(true);
        });

        test('can disable imageSrcSet for note openings rendered with picture', () => {
            render(
                <LinkImagePreload
                    resizedUrls={pixelDensityResizedUrls}
                    disableImageSrcSet
                />
            );

            expect(preload).toHaveBeenCalledTimes(2);
            preload.mock.calls.forEach(([, options]) => {
                expect(options).not.toHaveProperty('imageSrcSet');
            });
        });

        test('should not call preload when resizedUrls is empty', () => {
            const { container } = render(
                <LinkImagePreload resizedUrls={[]} isLoadWithPicture={false} />
            );

            expect(preload).not.toHaveBeenCalled();
            expect(container).toMatchInlineSnapshot(`<div />`);
        });
    });
});
