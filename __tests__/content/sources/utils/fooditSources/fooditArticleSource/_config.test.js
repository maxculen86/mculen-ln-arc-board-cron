import { filterCustomPreparacion } from '../../../../../../content/sources/utils/fooditSources/fooditArticleSource/_configs';

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
