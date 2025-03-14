import { buildResizedImages } from '../../../../../../../../components/private/common/utils/image/resizer/v2/resizerFactory';

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://www.lanacion.com.ar'
    };
});

describe('buildResizedImages', () => {
    const originalUrl =
        'https://cdn.jwplayer.com/v2/media/aomrvRI3/poster.jpg?width=720';
    const originalAuth =
        'bef8ead2c43f676487979088e7adfe15e9215e3058b867308017c97da846459d';
    it('should return an empty array if images is null or undefined', () => {
        expect(buildResizedImages(null, originalUrl, originalAuth)).toEqual([]);
        expect(
            buildResizedImages(undefined, originalUrl, originalAuth)
        ).toEqual([]);
    });

    it('should build resized images by correctly updating the src', () => {
        const images = [
            {
                src: 'https://cdn.jwplayer.com/v2/media/aomrvRI3/poster.jpg?width=320',
                width: 320
            },
            {
                src: 'https://cdn.jwplayer.com/v2/media/aomrvRI3/poster.jpg?width=480',
                width: 480
            }
        ];

        const result = buildResizedImages(images, originalUrl, originalAuth);

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({
            src: `https://www.lanacion.com.ar/resizer/v2/${encodeURIComponent(originalUrl)}?auth=${originalAuth}&width=320&quality=70&smart=false`,
            width: 320
        });
        expect(result[1]).toEqual({
            src: `https://www.lanacion.com.ar/resizer/v2/${encodeURIComponent(originalUrl)}?auth=${originalAuth}&width=480&quality=70&smart=false`,
            width: 480
        });
    });

    it('should use the default width (720) if width is not provided in the image', () => {
        const images = [
            {
                src: 'https://cdn.jwplayer.com/v2/media/aomrvRI3/poster.jpg?width=320'
            }
        ];

        const result = buildResizedImages(images, originalUrl, originalAuth);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            src: `https://www.lanacion.com.ar/resizer/v2/${encodeURIComponent(originalUrl)}?auth=${originalAuth}&width=720&quality=70&smart=false`
        });
    });

    it('should not mutate the original images array', () => {
        const images = [
            {
                src: 'https://cdn.jwplayer.com/v2/media/aomrvRI3/poster.jpg?width=320',
                width: 320
            }
        ];
        const imagesOriginal = JSON.parse(JSON.stringify(images));

        buildResizedImages(images, originalUrl, originalAuth);
        expect(images).toEqual(imagesOriginal);
    });
});
