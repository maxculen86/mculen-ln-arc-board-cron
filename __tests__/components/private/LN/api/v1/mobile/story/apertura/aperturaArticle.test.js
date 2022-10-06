import aperturaArticle from '../../../../../../../../../components/private/LN/api/v1/mobile/story/apertura/aperturaArticle';
import article from '../../../../../../../../../__mocks__/data/articles/SGLHVRAV2VGFHB5OZZ57PKYAVQ.json';

describe('Test aperura article imagen/video validacion defensiva', () => {
    test('Validacion', () => {
        const resp = aperturaArticle(article);
    });
});
