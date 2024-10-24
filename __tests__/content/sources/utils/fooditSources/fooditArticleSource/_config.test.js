import {
    filterCustomPreparacion,
    fooditFormatInterstitialLink
} from '../../../../../../content/sources/utils/fooditSources/fooditArticleSource/_configs';

const mockIngredients = {
    _id: '4EZ3Y5WDI5HBREEAZ2ID64C4EY',
    type: 'custom_embed',
    subtype: 'custom-preparacion',
    additional_properties: {
        _id: 'T2HDGON2ANFNRP4MOX7GRIIQ3I',
        comments: []
    },
    embed: {
        id: '1b8dc7fc779637',
        url: 'https://www.lanacion.com.ar/',
        config: {
            titleList: 'Carne',
            typeList: 'preparacion',
            items: ['Paso 4', 'Paso 3', 'Paso 2', 'Paso 1']
        }
    }
};

describe('filterCustomPreparacion', () => {
    it('should return defensive object', () => {
        const result = filterCustomPreparacion();
        expect(result).toEqual({
            embed: {
                config: {
                    items: []
                }
            }
        });
    });

    it('should return a new object with only the first three items in the embed config items list', () => {
        const result = filterCustomPreparacion(mockIngredients);
        expect(result.embed.config.items).toHaveLength(3);
        expect(result.embed.config.items).toEqual([
            'Paso 4',
            'Paso 3',
            'Paso 2'
        ]);
    });
});

describe('Sources - Utils - fooditSources - fooditFormatInterstitialLink', () => {
    it('should NOT add a slash when there is a # after the last /', () => {
        const inputUrl = 'https://example.com/page/#section';
        const expectedUrl = 'https://example.com/page/#section'; // No se agrega la barra

        const result = fooditFormatInterstitialLink(inputUrl);

        expect(result).toBe(expectedUrl);
    });

    it('should add a slash if there is no # after the last /', () => {
        const inputUrl = 'https://example.com/page';
        const expectedUrl = 'https://example.com/page/'; // Se agrega la barra al final

        const result = fooditFormatInterstitialLink(inputUrl);

        expect(result).toBe(expectedUrl);
    });

    it('should add https to a URL missing protocol and format correctly', () => {
        const inputUrl = 'http://example.com/page';
        const expectedUrl = 'https://example.com/page/';

        const result = fooditFormatInterstitialLink(inputUrl);

        expect(result).toBe(expectedUrl);
    });

    it('should return an empty string for invalid URLs', () => {
        const invalidUrl = 'ht@tp://invalid-url';
        const expectedUrl = '';

        const result = fooditFormatInterstitialLink(invalidUrl);

        expect(result).toBe(expectedUrl);
    });

    it('should handle URLs without forward slashes or hash symbols correctly', () => {
        const inputUrl = 'https://example.com';
        const expectedUrl = 'https://example.com/'; // Se agrega la barra al final

        const result = fooditFormatInterstitialLink(inputUrl);

        expect(result).toBe(expectedUrl);
    });

    it('should not add a slash if the URL ends with a hash fragment', () => {
        const inputUrl = 'https://example.com/#section';
        const expectedUrl = 'https://example.com/#section'; // No se agrega la barra

        const result = fooditFormatInterstitialLink(inputUrl);

        expect(result).toBe(expectedUrl);
    });
});
