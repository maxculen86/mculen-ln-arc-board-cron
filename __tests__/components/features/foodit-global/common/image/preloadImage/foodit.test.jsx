import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

describe('Components - Features - Foodit-global - Common - Image - PreloadFooditImages', () => {
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

    it('renders PreloadImages with URLs from getHomeOpeningImages for layout "Foodit-home"', () => {
        const renderables = [{}, {}];
        const mockUrls = ['url1', 'url2'];
        const mockImages = [
            { mediaPreload: '(min-width: 600px)', href: 'url1' },
            { mediaPreload: '(max-width: 599px)', href: 'url2' }
        ];

        getHomeOpeningImages.mockReturnValue(mockUrls);
        getImagesToLoadWithPicture.mockReturnValue(mockImages);

        render(
            <PreloadFooditImages
                layout="Foodit-home"
                renderables={renderables}
                isAdmin={false}
            />
        );

        expect(getHomeOpeningImages).toHaveBeenCalledWith(renderables, false);
        expect(getImagesToLoadWithPicture).toHaveBeenCalledWith(true, mockUrls);

        const linkElements = screen.getAllByRole('link', { hidden: true });
        expect(linkElements).toHaveLength(mockImages.length);

        mockImages.forEach((image, index) => {
            expect(linkElements[index]).toHaveAttribute('href', image.href);
            expect(linkElements[index]).toHaveAttribute('rel', 'preload');
            expect(linkElements[index]).toHaveAttribute('as', 'image');
            expect(linkElements[index]).toHaveAttribute(
                'fetchpriority',
                'high'
            );
            expect(linkElements[index]).toHaveAttribute(
                'media',
                image.mediaPreload
            );
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

            const mockUrls = [{ resizedUrl: mockVideoContent.poster }];
            getHomeOpeningImages.mockReturnValue(mockUrls);
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
                />
            );

            expect(getHomeOpeningImages).toHaveBeenCalled();

            const linkElements = screen.getAllByRole('link', { hidden: true });
            expect(linkElements.length).toBeGreaterThan(0);

            const posterLink = linkElements.find(link =>
                link.getAttribute('href')?.includes('foodit.lanacion.com.ar')
            );
            expect(posterLink).toBeInTheDocument();
        });

        it('should use external resizer domain for video poster when isInApertura is false', () => {
            const mockVideoContent = {
                poster: 'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2Fsgmv18Ps%2Fposter.jpg?width=420&height=280'
            };

            useContent.mockReturnValue(mockVideoContent);

            const mockUrls = [{ resizedUrl: mockVideoContent.poster }];
            getHomeOpeningImages.mockReturnValue(mockUrls);
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
                />
            );

            expect(getHomeOpeningImages).toHaveBeenCalled();

            const linkElements = screen.getAllByRole('link', { hidden: true });
            expect(linkElements.length).toBeGreaterThan(0);

            const posterLink = linkElements.find(link =>
                link
                    .getAttribute('href')
                    ?.includes('sandbox-resizer.glanacion.com')
            );
            expect(posterLink).toBeInTheDocument();
        });

        it('should have fetchPriority="high" for video poster preload in apertura', () => {
            const mockVideoContent = {
                poster: 'https://foodit.lanacion.com.ar/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FatylCTVp%2Fposter.jpg?width=420&height=280'
            };

            useContent.mockReturnValue(mockVideoContent);

            const mockUrls = [{ resizedUrl: mockVideoContent.poster }];
            getHomeOpeningImages.mockReturnValue(mockUrls);
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
                />
            );

            const linkElements = screen.getAllByRole('link', { hidden: true });
            const videoPosterLink = linkElements.find(link =>
                link.getAttribute('href')?.includes('foodit.lanacion.com.ar')
            );

            expect(videoPosterLink).toHaveAttribute('fetchpriority', 'high');
            expect(videoPosterLink).toHaveAttribute('rel', 'preload');
            expect(videoPosterLink).toHaveAttribute('as', 'image');
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

        const linkElements = screen.getAllByRole('link', { hidden: true });
        expect(linkElements).toHaveLength(mockImages.length);

        mockImages.forEach((image, index) => {
            expect(linkElements[index]).toHaveAttribute('href', image.href);
            expect(linkElements[index]).toHaveAttribute('rel', 'preload');
            expect(linkElements[index]).toHaveAttribute('as', 'image');
            expect(linkElements[index]).toHaveAttribute(
                'fetchpriority',
                'high'
            );
            expect(linkElements[index]).toHaveAttribute(
                'media',
                image.mediaPreload
            );
        });
    });

    it('renders empty PreloadImages when layout does not match any configuration', () => {
        getImagesToLoadWithPicture.mockReturnValue([]);

        render(<PreloadFooditImages layout="unknown-layout" />);

        const linkElements = screen.queryAllByRole('link', { hidden: true });
        expect(linkElements).toHaveLength(0);
    });
});
