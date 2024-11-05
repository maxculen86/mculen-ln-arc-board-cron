import getIa from '../../../../../../../../components/private/LN/api/common/elements/story/ia';

describe('getIa', () => {
    it('should return structured object with glossary when glossary data is provided', () => {
        const input = {
            promo_items: {
                glossary: {
                    embed: {
                        config: {
                            arrayData: [{ key: 'term1', value: 'definition1' }]
                        }
                    }
                }
            }
        };
        const result = getIa(input);
        expect(result.glossary).toEqual({
            title: 'Glosario',
            disclaimer: 'Realizado con Inteligencia Artificial',
            items: [{ key: 'term1', value: 'definition1' }]
        });
    });
    it('should return null object when glossary arrayData not has elements provided', () => {
        const input = {
            glossary: { embed: { config: { arrayData: [] } } }
        };
        const result = getIa(input);
        expect(result.glossary).toBeNull();
    });
    it('should return null object when glossary arrayData is null', () => {
        const input = {
            glossary: { embed: { config: { arrayData: null } } }
        };
        const result = getIa(input);
        expect(result.glossary).toBeNull();
    });
    it('should hide glossary when termica hide_articles_glossary_apps is true', () => {
        const input = {
            navigationTreeSource: {
                Termicas: { hide_articles_glossary_apps: 'true' }
            },
            promo_items: {
                glossary: {
                    embed: {
                        config: {
                            arrayData: [{ key: 'term1', value: 'definition1' }]
                        }
                    }
                }
            }
        };
        const result = getIa(input);
        expect(result.glossary).toBeNull();
    });
});
