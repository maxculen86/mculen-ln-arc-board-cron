jest.mock('fusion:environment', () => ({
    ARC_STATIC: '',
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

// Se mockea getImageProps para aislar buildPrimaryImageOfPage de la logica interna de OG.
// Dado que jest.mock se hoistea, jest.fn() debe declararse inline, sin referencias a variables externas.
jest.mock('../../../../../common/utils/getMetasOGHelper', () => ({
    getImageProps: jest.fn()
}));

import {
    buildPrimaryImageOfPage,
    getSchemaImages
} from '../newsArticleSchemaHelper';
import { getImageProps } from '../../../../../common/utils/getMetasOGHelper';

const PLACEHOLDER = 'https://www.lanacion.com.ar/placeholder.jpg';

const DEFAULT_IMAGE_PROPS = {
    url: PLACEHOLDER,
    height: '630',
    width: '1200',
    type: 'image/png',
    alt: 'Placeholder'
};

const baseBasicImage = {
    type: 'image',
    url: 'https://resizer.glanacion.com/basic-image.jpg',
    caption: 'Caption de prueba'
};

const acuOgImgWithUrl = {
    url: 'https://resizer.glanacion.com/custom-og.jpg',
    height: '630',
    width: '1200',
    additional_properties: { mime_type: 'image/jpeg' }
};

describe('newsArticleSchemaHelper', () => {
    describe('buildPrimaryImageOfPage', () => {
        beforeEach(() => {
            getImageProps.mockReset();
            getImageProps.mockReturnValue(DEFAULT_IMAGE_PROPS);
        });

        // --- Custom OG image ---

        it('passes acuOgImg to getImageProps when custom OG image is provided', () => {
            getImageProps.mockReturnValue({
                url: 'https://www.lanacion.com.ar/custom-og.jpg',
                height: '630',
                width: '1200',
                type: 'image/jpeg',
                alt: ''
            });

            buildPrimaryImageOfPage({
                basicImage: baseBasicImage,
                placeholder: PLACEHOLDER,
                acuOgImg: acuOgImgWithUrl
            });

            expect(getImageProps).toHaveBeenCalledWith(
                acuOgImgWithUrl,
                baseBasicImage,
                PLACEHOLDER,
                ''
            );
        });

        it('returns ImageObject URL, width and height aligned with custom OG image', () => {
            getImageProps.mockReturnValue({
                url: 'https://www.lanacion.com.ar/custom-og.jpg',
                height: '630',
                width: '1200',
                type: 'image/jpeg',
                alt: ''
            });

            const result = buildPrimaryImageOfPage({
                basicImage: baseBasicImage,
                placeholder: PLACEHOLDER,
                acuOgImg: acuOgImgWithUrl
            });

            expect(result['@type']).toBe('ImageObject');
            expect(result.url).toBe(
                'https://www.lanacion.com.ar/custom-og.jpg'
            );
            expect(result.width).toBe(1200);
            expect(result.height).toBe(630);
        });

        // --- Fallback seguro (sin acuOgImg) ---

        it('passes empty acuOgImg to getImageProps when not provided (fallback to promo_items.basic)', () => {
            buildPrimaryImageOfPage({
                basicImage: baseBasicImage,
                placeholder: PLACEHOLDER
            });

            expect(getImageProps).toHaveBeenCalledWith(
                {},
                baseBasicImage,
                PLACEHOLDER,
                ''
            );
        });

        it('returns a valid ImageObject from fallback when acuOgImg is absent', () => {
            const result = buildPrimaryImageOfPage({
                basicImage: baseBasicImage,
                placeholder: PLACEHOLDER
            });

            expect(result).not.toBeNull();
            expect(result['@type']).toBe('ImageObject');
            expect(result.url).toBe(PLACEHOLDER);
        });

        it('does not throw when acuOgImg is an empty object', () => {
            expect(() =>
                buildPrimaryImageOfPage({
                    basicImage: baseBasicImage,
                    placeholder: PLACEHOLDER,
                    acuOgImg: {}
                })
            ).not.toThrow();
        });

        it('does not throw when acuOgImg is undefined', () => {
            expect(() =>
                buildPrimaryImageOfPage({
                    basicImage: baseBasicImage,
                    placeholder: PLACEHOLDER,
                    acuOgImg: undefined
                })
            ).not.toThrow();
        });

        // --- Non-image basicImage (guard de regresión) ---

        it('returns null when basicImage.type is not "image" and acuOgImg is absent', () => {
            const result = buildPrimaryImageOfPage({
                basicImage: {
                    type: 'video',
                    url: 'https://example.com/video.mp4'
                },
                placeholder: PLACEHOLDER
            });

            expect(result).toBeNull();
            expect(getImageProps).not.toHaveBeenCalled();
        });

        it('returns null when basicImage is an empty object', () => {
            const result = buildPrimaryImageOfPage({
                basicImage: {},
                placeholder: PLACEHOLDER
            });

            expect(result).toBeNull();
        });

        // --- Estructura del resultado ---

        it('includes description when basicImage has a caption', () => {
            const result = buildPrimaryImageOfPage({
                basicImage: { ...baseBasicImage, caption: 'Mi caption' },
                placeholder: PLACEHOLDER
            });

            expect(result.description).toBe('Mi caption');
        });

        it('does not include description key when basicImage has no caption', () => {
            const basicImageWithoutCaption = {
                type: 'image',
                url: 'https://resizer.glanacion.com/img.jpg'
            };
            const result = buildPrimaryImageOfPage({
                basicImage: basicImageWithoutCaption,
                placeholder: PLACEHOLDER
            });

            expect(result).not.toHaveProperty('description');
        });

        // --- No regresión: getSchemaImages no se ve afectado ---

        it('getSchemaImages export is still available and unmodified', () => {
            expect(typeof getSchemaImages).toBe('function');
        });
    });
});
