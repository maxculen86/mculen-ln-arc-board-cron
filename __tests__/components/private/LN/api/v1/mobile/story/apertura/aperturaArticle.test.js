import aperturaArticle from '../../../../../../../../../components/private/LN/api/v1/mobile/story/apertura/aperturaArticle';
import article from '../../../../../../../../../__mocks__/data/articles/SGLHVRAV2VGFHB5OZZ57PKYAVQ.json';

describe('Test aperura article imagen/video validacion defensiva', () => {
    test('Medio destacado Básico "Origen del vídeo" con una imagen', () => {
        const resp = aperturaArticle(article);
    });
});
