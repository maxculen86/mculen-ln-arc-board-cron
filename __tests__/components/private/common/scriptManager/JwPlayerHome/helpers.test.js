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

    it('returns Vertical Video Id if there is a visible Caja Manual with vertical video inside', () => {
        const renderables = [
            {
                type: 'LN10_Caja_Manual',
                props: {
                    customFields: {
                        hideCaja: false
                    }
                },
                children: [
                    {
                        type: 'LN-10/videoPlayer'
                    }
                ]
            }
        ];

        const result = selectJwPlayerId(renderables);
        expect(result).toBe('tMVdYMxO');
    });

    it('returns Horizontal Video Id if there is a videoPlayerNota', () => {
        const renderables = [
            {
                collection: 'features',
                type: 'LN-10/videoPlayerNota'
            }
        ];

        const result = selectJwPlayerId(renderables);
        expect(result).toBe('XD8x4oQD');
    });

    it('returns null if there is no match', () => {
        const renderables = [];

        const result = selectJwPlayerId(renderables);
        expect(result).toBeNull();
    });
});
