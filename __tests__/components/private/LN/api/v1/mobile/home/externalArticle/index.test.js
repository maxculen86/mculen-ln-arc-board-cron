import ExternalArticle from '../../../../../../../../../components/private/LN/api/v1/mobile/home/externalArticle';
import CardWebStory from '../../../../../../../../../components/private/LN/api/v1/mobile/home/externalArticle/cardWebStory';

jest.mock(
    '../../../../../../../../../components/private/LN/api/v1/mobile/home/externalArticle/cardWebStory/index'
);

describe('components - private - LN - api - v1 - mobile - home - externalArticle', () => {
    beforeEach(() => {
        CardWebStory.mockClear();
    });

    it('CardWebStory ok', () => {
        const article = {
            additionalProperties: {
                variant: 'webstories'
            }
        };

        CardWebStory.mockImplementationOnce(article => ({
            titulo: 'Mock Title',
            id: 'Mock ID',
            url: 'Mock URL',
            volanta: 'Mock Volanta',
            imagen: 'Mock Image'
        }));

        const result = ExternalArticle(article);

        expect(result).toMatchObject({
            design: { typeCard: 'webstories' },
            titulo: 'Mock Title',
            id: 'Mock ID',
            url: 'Mock URL',
            volanta: 'Mock Volanta',
            imagen: 'Mock Image'
        });
    });
    it('should return object with design property containing type card', () => {
        const article = {
            additionalProperties: {
                variant: 'webstories'
            }
        };

        CardWebStory.mockImplementationOnce(article => ({
            titulo: 'Mock Title',
            id: 'Mock ID',
            url: 'Mock URL',
            volanta: 'Mock Volanta',
            imagen: 'Mock Image'
        }));

        const result = ExternalArticle(article);
        expect(result.design.typeCard).toBe('webstories');
    });

    it('should return object with properties from component function', () => {
        const article = {
            additionalProperties: {
                variant: 'webstories'
            }
        };

        CardWebStory.mockImplementationOnce(article => ({
            titulo: 'Mock Title',
            id: 'Mock ID',
            url: 'Mock URL',
            volanta: 'Mock Volanta',
            imagen: 'Mock Image'
        }));

        const result = ExternalArticle(article);
        expect(result.titulo).toBe('Mock Title');
        expect(result.imagen).toBe('Mock Image');
        expect(result.volanta).toBe('Mock Volanta');
    });

    it.skip('should handle unsupported value for additional_properties.variant property', () => {
        const article = {
            additionalProperties: {
                variant: 'unsupported'
            }
        };

        CardWebStory.mockImplementationOnce(article => ({
            titulo: 'Mock Title',
            id: 'Mock ID',
            url: 'Mock URL',
            volanta: 'Mock Volanta',
            imagen: 'Mock Image'
        }));

        const result = ExternalArticle(article);
        expect(result.design.typeCard).toBe('webstories');
    });

    it('should handle falsy value other than undefined or null for additional_properties.variant property', () => {
        const article = {
            additionalProperties: {
                variant: false
            }
        };
        const result = ExternalArticle(article);
        expect(result.design.typeCard).toBe('webstories');
    });

    it('should handle missing additional_properties.variant property', () => {
        const article = {};
        const result = ExternalArticle(article);
        expect(result.design.typeCard).toBe('webstories');
    });

    it('should handle unexpected input types for article and tipo', () => {
        const article = 'not an object';
        const result = ExternalArticle(article);
        expect(result.design.typeCard).toBe('webstories');

        const article2 = {
            additionalProperties: {
                variant: 'webstories'
            }
        };
        const tipo = 123;
        const result2 = ExternalArticle(article2, tipo);
        expect(result2.design.typeCard).toBe('webstories');
    });
});
