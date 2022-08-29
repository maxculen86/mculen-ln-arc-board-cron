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
    const mobileImageId = '456-cba';

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

    test('Return test when using the mobile photo field in a layout other than Grilla 1', () => {
        const mobileImage = {};
        expect(
            validateArticleFeature(
                id,
                content,
                image,
                video,
                layout,
                imageId,
                videoId,
                mobileImage,
                mobileImageId
            )
        ).toStrictEqual({
            type,
            message:
                'El campo "Foto Mobile" solo puede usarse con la diagramación Grilla 1'
        });
    });

    test('Test return when mobileImage is null and layout is Grilla 1', () => {
        const mobileImage = null;
        const layout = 'grilla1';
        expect(
            validateArticleFeature(
                id,
                content,
                image,
                video,
                layout,
                imageId,
                videoId,
                mobileImage,
                mobileImageId
            )
        ).toStrictEqual({
            type,
            message: 'El ID de la imagen para mobile es incorrecto.'
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
            message:
                'El tamaño del video debe ser inferior a 3 MB. Peso actual 10.02 MB'
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
