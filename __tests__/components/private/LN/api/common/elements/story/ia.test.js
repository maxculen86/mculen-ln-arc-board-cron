import getIa from '../../../../../../../../components/private/LN/api/common/elements/story/ia';

describe('getIa', () => {
    it('should return structured object with summary when valid data is provided', () => {
        const input = {
            promo_items: {
                summary: {
                    embed: { config: { arrayBullets: ['point1', 'point2'] } }
                }
            }
        };
        const result = getIa(input);
        expect(result.summary).toEqual({
            title: 'Resumen de lectura',
            disclaimer: 'Realizado con Inteligencia Artificial',
            items: [{ value: 'point1' }, { value: 'point2' }]
        });
    });
    it('should return structured object with summary when summary data is provided', () => {
        const input = {
            promo_items: {
                summary: {
                    embed: { config: { arrayBullets: ['point1', 'point2'] } }
                }
            }
        };
        const result = getIa(input);
        expect(result.summary).toEqual({
            title: 'Resumen de lectura',
            disclaimer: 'Realizado con Inteligencia Artificial',
            items: [{ value: 'point1' }, { value: 'point2' }]
        });
    });

    it('should return null for summary if data is empty or undefined', () => {
        const input = {};
        const result = getIa(input);
        expect(result.summary).toBeNull();
    });
    it('should return null object when summary arrayBullets not has elements provided', () => {
        const input = {
            summary: { embed: { config: { arrayBullets: [] } } }
        };
        const result = getIa(input);
        expect(result.summary).toBeNull();
    });
    it('should return null object when summary arrayBullets is null', () => {
        const input = {
            summary: { embed: { config: { arrayBullets: null } } }
        };
        const result = getIa(input);
        expect(result.summary).toBeNull();
    });
    it('should hide summary when termica hide_articles_summary is true', () => {
        const input = {
            navigationTreeSource: {
                Termicas: { hide_articles_summary_apps: 'true' }
            },
            promo_items: {
                summary: {
                    embed: { config: { arrayBullets: ['point1', 'point2'] } }
                }
            }
        };
        const result = getIa(input);
        expect(result.summary).toBeNull();
    });
});
