import { validateArticleFeature } from '../../../../../components/private/LN/common/utils/cajaTemasValidators';
import responseVideoSource from '../../../../../__mocks__/data/videos/responseVideoSource.json';

describe('Test of return validateArticleFeature', () => {
    const id = 'H53R624KARDARCICFNEC7ZC7YA';
    const content = {};
    const image = {};
    const video = responseVideoSource;
    const layout = '';
    const type = 'warning';
    const imageId = 'abc-123';
    const videoId = '123-abc';

    test('Test return when id is undefiend', () => {
        const id = undefined;
        expect(
            validateArticleFeature(
                id,
                content,
                image,
                video,
                layout,
                imageId,
                videoId
            )
        ).toStrictEqual({
            type,
            message: 'El campo Id de la Nota es obligatorio.'
        });
    });

    test('Test return when content is undefiend', () => {
        const content = undefined;
        expect(
            validateArticleFeature(
                id,
                content,
                image,
                video,
                layout,
                imageId,
                videoId
            )
        ).toStrictEqual({
            type,
            message: 'El ID de la nota es incorrecto.'
        });
    });

    test('Test return when image is null', () => {
        const image = null;
        expect(
            validateArticleFeature(
                id,
                content,
                image,
                video,
                layout,
                imageId,
                videoId
            )
        ).toStrictEqual({
            type,
            message: 'El ID de la imagen es incorrecto.'
        });
    });

    test('Test return when video is null', () => {
        const video = null;
        expect(
            validateArticleFeature(
                id,
                content,
                image,
                video,
                layout,
                imageId,
                videoId
            )
        ).toStrictEqual({
            type,
            message: 'El ID del video es incorrecto.'
        });
    });

    test('Test return when video exceeds the allowed size', () => {
        expect(
            validateArticleFeature(
                id,
                content,
                image,
                video,
                layout,
                imageId,
                videoId
            )
        ).toStrictEqual({
            type,
            message: 'El tamaño del video debe ser inferior a 2MB (Megabytes).'
        });
    });

    test('Test return when layout is grilla1', () => {
        const layout = 'grilla1';
        expect(
            validateArticleFeature(
                id,
                content,
                image,
                video,
                layout,
                imageId,
                videoId
            )
        ).toStrictEqual(null);
    });

    test('Test return when layout is grillaVideo1', () => {
        const layout = 'grillaVideo1';
        expect(
            validateArticleFeature(
                id,
                content,
                image,
                video,
                layout,
                imageId,
                videoId
            )
        ).toStrictEqual(null);
    });
});
