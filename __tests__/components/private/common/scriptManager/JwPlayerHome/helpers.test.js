import { selectJwPlayerId } from '../../../../../../components/private/common/scriptManager/JwPlayerHome/helpers';

describe('selectJwPlayerId', () => {
    it('Returns Carousel Id if there is a visible Carousel in the UI', () => {
        const renderables = [
            {
                collection: 'chains',
                type: 'LN10_Caja_Carrusel',
                props: {
                    customFields: {
                        hideCarousel: false
                    }
                }
            },
            {
                collection: 'features',
                type: 'LN-10/videoPlayer'
            }
        ];

        const result = selectJwPlayerId(renderables);
        expect(result).toBe('OSRCuuxn');
    });

    it('returns Vertical Video Id if theres is a vertical video and no Carousel in the UI', () => {
        const renderables = [
            {
                collection: 'features',
                type: 'LN-10/videoPlayer'
            },
            {
                collection: 'features',
                type: 'LN-10/article'
            }
        ];

        const result = selectJwPlayerId(renderables);
        expect(result).toBe('tMVdYMxO');
    });

    it('returns null if there is no match', () => {
        const renderables = [];

        const result = selectJwPlayerId(renderables);
        expect(result).toBeNull();
    });
});
