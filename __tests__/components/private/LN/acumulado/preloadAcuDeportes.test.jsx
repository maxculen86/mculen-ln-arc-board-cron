import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { preload } from 'react-dom';
import useGetArticlesToPreload from '../../../../../components/private/LN/common/hooks/useGetArticlesToPreload';
import PreloadAcuDeportes from '../../../../../components/private/LN/acumulado/preloadAcuDeportes';

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

jest.mock(
    '../../../../../components/private/LN/common/hooks/useGetArticlesToPreload'
);

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    preload: jest.fn()
}));

describe('Private - LN - Acumulado - ImagePreloadAcu', () => {
    beforeEach(() => {
        preload.mockClear();
    });

    test('render correctly acu deportes', () => {
        const deportesAcu = [
            {
                _id: 'R2AZ4XP6E5DCXPUBN5JKG4CIKQ',
                promo_items: {
                    basic: {
                        height: 513,
                        resized_urls: [
                            {
                                option: {
                                    height: 587,
                                    media_preload: '(min-width: 768px)',
                                    minScreenWidth: 768,
                                    proportion: '3:2',
                                    width: 880
                                },
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/-MrqOg4HvfTSpGz0qBteskmQ57k=/880x586/smart/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/F5SUTN77SNFS5FSED2VP3XG7ME.jpg'
                            },
                            {
                                option: {
                                    height: 280,
                                    media_preload: '(max-width: 767px)',
                                    proportion: '3:2',
                                    width: 420
                                },
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/xEoBQYutmMadkaA3DYp6Vx48j-s=/420x280/smart/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/F5SUTN77SNFS5FSED2VP3XG7ME.jpg'
                            }
                        ],
                        type: 'image',
                        url: 'https://resizer.glanacion.com/resizer/bLGgbX9w7lGlT-mI3aj-Sjw7wTc=/768x0/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/F5SUTN77SNFS5FSED2VP3XG7ME.jpg',
                        width: 768
                    }
                }
            }
        ];

        useGetArticlesToPreload.mockImplementation(() => deportesAcu);

        const mockProps = {
            collectionId: 'FPKJS5YHQVFGVD46GOLY7A265U',
            imageConfig: 'm',
            initialPosition: 3,
            isFocal: true,
            arcSite: 'la-nacion-ar'
        };

        render(<PreloadAcuDeportes {...mockProps} />);

        const { resized_urls: resizedUrls, type } =
            deportesAcu[0].promo_items.basic;

        expect(preload).toHaveBeenCalledTimes(resizedUrls.length);
        resizedUrls.forEach(({ resizedUrl, option }) => {
            expect(preload).toHaveBeenCalledWith(
                resizedUrl,
                expect.objectContaining({
                    as: type,
                    fetchPriority: 'high',
                    ...(option.media_preload && { media: option.media_preload })
                })
            );
        });
    });
});
