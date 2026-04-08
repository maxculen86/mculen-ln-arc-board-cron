import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { preload } from 'react-dom';
import PreloadFooditImages from '../../../../../../../components/features/foodit-global/common/image/preloadImage/foodit';
import {
    getHomeOpeningImages,
    getPromoItemsImages
} from '../../../../../../../components/features/foodit-global/common/image/preloadImage/_helper';
import { getImagesToLoadWithPicture } from '../../../../../../../components/private/LN/common/utils/mediaHelper';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock(
    '../../../../../../../components/features/foodit-global/common/image/preloadImage/_helper',
    () => ({
        getHomeOpeningImages: jest.fn(),
        getPromoItemsImages: jest.fn()
    })
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/image/preloadImage/components/preloadAcuFirstImage',
    () => ({
        PreloadAcuFirstImage: jest.fn(({ id }) => (
            <div data-testid="preload-acu-first-image" data-id={id} />
        ))
    })
);

jest.mock(
    '../../../../../../../components/private/LN/common/utils/mediaHelper',
    () => ({
        getImagesToLoadWithPicture: jest.fn()
    })
);

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    preload: jest.fn()
}));

let mockEjesHomeMock = [
    {
        imageProps: { src: 'eje1.jpg' }
    },
    {
        imageProps: { src: 'eje2.jpg' }
    }
];

jest.mock(
    '../../../../../../../components/features/foodit-global/common/subcategorias/helpers',
    () => ({
        get ejesHomeMock() {
            return mockEjesHomeMock;
        }
    })
);

describe('Components - Features - Foodit-global - Common - Image - PreloadFooditImages', () => {
    const mockDeployment = jest.fn(path => `https://example.com${path}`);
    const mockContextPath = '/pf';

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders PreloadAcuFirstImage when layout matches componentRequiredLayouts', () => {
        const globalContent = { _id: 'test-id' };

        render(
            <PreloadFooditImages
                layout="Foodit-acumulado"
                globalContent={globalContent}
            />
        );

        const preloadAcuFirstImage = screen.getByTestId(
            'preload-acu-first-image'
        );
        expect(preloadAcuFirstImage).toBeInTheDocument();
        expect(preloadAcuFirstImage).toHaveAttribute('data-id', 'test-id');
    });

    it('renders PreloadImages with only opening images for layout "Foodit-home"', () => {
        const renderables = [{}, {}];
        const mockOpeningUrls = [
            { resizedUrl: 'opening-url1' },
            { resizedUrl: 'opening-url2' }
        ];
        const mockImages = [
            { mediaPreload: '(min-width: 600px)', href: 'opening-url1' },
            { mediaPreload: '(max-width: 599px)', href: 'opening-url2' }
        ];

        getHomeOpeningImages.mockReturnValue(mockOpeningUrls);
        getImagesToLoadWithPicture.mockReturnValue(mockImages);

        render(
            <PreloadFooditImages
                layout="Foodit-home"
                renderables={renderables}
                isAdmin={false}
                contextPath={mockContextPath}
                deployment={mockDeployment}
            />
        );

        expect(getHomeOpeningImages).toHaveBeenCalledWith(renderables, false);
        expect(getImagesToLoadWithPicture).toHaveBeenCalledWith(
            true,
            mockOpeningUrls
        );
        expect(preload).toHaveBeenCalledTimes(mockImages.length);
        mockImages.forEach((image, index) => {
            expect(preload).toHaveBeenNthCalledWith(
                index + 1,
                image.href,
                expect.objectContaining({
                    as: 'image',
                    fetchPriority: 'high',
                    media: image.mediaPreload
                })
            );
        });
    });

    describe('Foodit-home layout when ejesHomeMock is empty', () => {
        beforeEach(() => {
            mockEjesHomeMock = [];
        });

        afterEach(() => {
            mockEjesHomeMock = [
                { imageProps: { src: 'eje1.jpg' } },
                { imageProps: { src: 'eje2.jpg' } }
            ];
        });

        it('renders PreloadImages only with opening images when ejesHomeMock is empty for "Foodit-home"', () => {
            const renderables = [{}, {}];
            const mockOpeningUrls = [{ resizedUrl: 'opening-url1' }];
            const mockImages = [
                { mediaPreload: '(min-width: 600px)', href: 'opening-url1' }
            ];

            getHomeOpeningImages.mockReturnValue(mockOpeningUrls);
            getImagesToLoadWithPicture.mockReturnValue(mockImages);

            render(
                <PreloadFooditImages
                    layout="Foodit-home"
                    renderables={renderables}
                    isAdmin={false}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            expect(getHomeOpeningImages).toHaveBeenCalledWith(
                renderables,
                false
            );

            expect(getImagesToLoadWithPicture).toHaveBeenCalledWith(
                true,
                mockOpeningUrls
            );

            expect(preload).toHaveBeenCalledTimes(1);
        });
    });

    describe('Video Poster Domain Tests', () => {
        const { useContent } = require('fusion:content');

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should use foodit domain for video poster when isInApertura is true', () => {
            const mockVideoContent = {
                poster: 'https://foodit.lanacion.com.ar/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FatylCTVp%2Fposter.jpg?width=420&height=280'
            };

            useContent.mockReturnValue(mockVideoContent);

            const mockOpeningUrls = [{ resizedUrl: mockVideoContent.poster }];
            getHomeOpeningImages.mockReturnValue(mockOpeningUrls);
            getImagesToLoadWithPicture.mockReturnValue([
                {
                    mediaPreload: '(min-width: 320px)',
                    href: mockVideoContent.poster
                },
                {
                    mediaPreload: '(min-width: 320px)',
                    href: 'https://example.com/pf/resources/foodit/assets/images/ejes/eje1.jpg'
                }
            ]);

            render(
                <PreloadFooditImages
                    layout="Foodit-home"
                    renderables={[]}
                    isAdmin={false}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            expect(getHomeOpeningImages).toHaveBeenCalled();

            expect(preload).toHaveBeenCalledWith(
                expect.stringContaining('foodit.lanacion.com.ar'),
                expect.any(Object)
            );
        });

        it('should use external resizer domain for video poster when isInApertura is false', () => {
            const mockVideoContent = {
                poster: 'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2Fsgmv18Ps%2Fposter.jpg?width=420&height=280'
            };

            useContent.mockReturnValue(mockVideoContent);

            const mockOpeningUrls = [{ resizedUrl: mockVideoContent.poster }];
            getHomeOpeningImages.mockReturnValue(mockOpeningUrls);
            getImagesToLoadWithPicture.mockReturnValue([
                {
                    mediaPreload: '(min-width: 320px)',
                    href: mockVideoContent.poster
                },
                {
                    mediaPreload: '(min-width: 320px)',
                    href: 'https://example.com/pf/resources/foodit/assets/images/ejes/eje1.jpg'
                }
            ]);

            render(
                <PreloadFooditImages
                    layout="Foodit-home"
                    renderables={[]}
                    isAdmin={false}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            expect(getHomeOpeningImages).toHaveBeenCalled();

            expect(preload).toHaveBeenCalledWith(
                expect.stringContaining('sandbox-resizer.glanacion.com'),
                expect.any(Object)
            );
        });

        it('should have fetchPriority="high" for video poster preload in apertura', () => {
            const mockVideoContent = {
                poster: 'https://foodit.lanacion.com.ar/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FatylCTVp%2Fposter.jpg?width=420&height=280'
            };

            useContent.mockReturnValue(mockVideoContent);

            const mockOpeningUrls = [{ resizedUrl: mockVideoContent.poster }];
            getHomeOpeningImages.mockReturnValue(mockOpeningUrls);
            getImagesToLoadWithPicture.mockReturnValue([
                {
                    mediaPreload: '(min-width: 320px)',
                    href: mockVideoContent.poster
                }
            ]);

            render(
                <PreloadFooditImages
                    layout="Foodit-home"
                    renderables={[]}
                    isAdmin={false}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            expect(preload).toHaveBeenCalledWith(
                expect.stringContaining('foodit.lanacion.com.ar'),
                expect.objectContaining({
                    as: 'image',
                    fetchPriority: 'high'
                })
            );
        });
    });

    it('renders PreloadImages with URLs from getPromoItemsImages for layout "Foodit-ficha-receta"', () => {
        const globalContent = { someKey: 'someValue' };
        const mockUrls = ['promo-url1', 'promo-url2'];
        const mockImages = [
            { mediaPreload: '(min-width: 600px)', href: 'promo-url1' },
            { mediaPreload: '(max-width: 599px)', href: 'promo-url2' }
        ];

        getPromoItemsImages.mockReturnValue(mockUrls);
        getImagesToLoadWithPicture.mockReturnValue(mockImages);

        render(
            <PreloadFooditImages
                layout="Foodit-ficha-receta"
                globalContent={globalContent}
            />
        );

        expect(getPromoItemsImages).toHaveBeenCalledWith(
            globalContent,
            'Foodit-ficha-receta'
        );

        expect(getImagesToLoadWithPicture).toHaveBeenCalledWith(true, mockUrls);

        expect(preload).toHaveBeenCalledTimes(mockImages.length);
        mockImages.forEach((image, index) => {
            expect(preload).toHaveBeenNthCalledWith(
                index + 1,
                image.href,
                expect.objectContaining({
                    as: 'image',
                    fetchPriority: 'high',
                    media: image.mediaPreload
                })
            );
        });
    });

    it('renders empty PreloadImages when layout does not match any configuration', () => {
        getImagesToLoadWithPicture.mockReturnValue([]);

        render(<PreloadFooditImages layout="unknown-layout" />);

        expect(preload).not.toHaveBeenCalled();
    });

    it('renders PreloadImages with URLs from imagesToPreload fallback when not in componentRequiredLayouts', () => {
        const globalContent = { someKey: 'someValue' };
        const mockUrls = ['fallback-url1'];
        const mockImages = [
            { mediaPreload: '(min-width: 600px)', href: 'fallback-url1' }
        ];

        getPromoItemsImages.mockReturnValue(mockUrls);
        getImagesToLoadWithPicture.mockReturnValue(mockImages);

        render(
            <PreloadFooditImages
                layout="Foodit-recipe-paywall"
                globalContent={globalContent}
            />
        );

        expect(getPromoItemsImages).toHaveBeenCalledWith(
            globalContent,
            'Foodit-recipe-paywall'
        );

        expect(preload).toHaveBeenCalledTimes(1);
    });
});
