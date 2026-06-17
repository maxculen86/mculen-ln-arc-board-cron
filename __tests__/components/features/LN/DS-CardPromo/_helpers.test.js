import {
    buildTrackingData,
    buildLinkProps,
    getBadge,
    getImageSettings,
    isTagId
} from '../../../../../components/features/LN/DS-CardPromo/_helpers';

describe('DS-CardPromo - _helpers', () => {
    describe('buildTrackingData', () => {
        it('should build tracking data with all fields provided', () => {
            expect(
                buildTrackingData({
                    title: 'Crucigrama',
                    logoSrc: 'https://example.com/img.jpg',
                    buttonText: 'Jugar ahora',
                    href: '/juegos/crucigrama',
                    badge: 'NUEVO'
                })
            ).toEqual({
                'data-testid': 'card-promo',
                'data-title': 'Crucigrama',
                'data-img': 'https://example.com/img.jpg',
                'data-label': 'Jugar ahora',
                'data-href': '/juegos/crucigrama',
                'data-badge': 'NUEVO'
            });
        });

        it('should use "Jugar" as default label when buttonText is empty string', () => {
            const result = buildTrackingData({ buttonText: '' });
            expect(result['data-label']).toBe('Jugar');
        });

        it('should use "Jugar" as default label when buttonText is undefined', () => {
            const result = buildTrackingData({});
            expect(result['data-label']).toBe('Jugar');
        });

        it('should use provided buttonText when it is non-empty', () => {
            const result = buildTrackingData({ buttonText: 'Reproducir' });
            expect(result['data-label']).toBe('Reproducir');
        });

        it('should default to empty string when title is missing', () => {
            const result = buildTrackingData({});
            expect(result['data-title']).toBe('');
        });

        it('should default to empty string when logoSrc is missing', () => {
            const result = buildTrackingData({});
            expect(result['data-img']).toBe('');
        });

        it('should default to empty string when href is missing', () => {
            const result = buildTrackingData({});
            expect(result['data-href']).toBe('');
        });

        it('should default to empty string when badge is missing', () => {
            const result = buildTrackingData({});
            expect(result['data-badge']).toBe('');
        });

        it('should always include data-testid card-promo', () => {
            const result = buildTrackingData({});
            expect(result['data-testid']).toBe('card-promo');
        });
    });

    describe('buildLinkProps', () => {
        it('should build link props without contentType-specific attributes', () => {
            expect(
                buildLinkProps({ href: '/juegos', title: 'Juegos' })
            ).toEqual({
                href: '/juegos',
                target: '_self',
                title: 'Juegos'
            });
        });

        it('should add data-game-link when contentType is game', () => {
            const result = buildLinkProps({
                href: '/juegos',
                title: 'Juegos',
                contentType: 'game'
            });
            expect(result['data-game-link']).toBe('true');
        });

        it('should not add data-videopodcast-link when contentType is game', () => {
            const result = buildLinkProps({
                href: '/juegos',
                title: 'Juegos',
                contentType: 'game'
            });
            expect(result['data-videopodcast-link']).toBeUndefined();
        });

        it('should add data-videopodcast-link when contentType is podcast', () => {
            const result = buildLinkProps({
                href: '/podcast',
                title: 'Podcast',
                contentType: 'podcast'
            });
            expect(result['data-videopodcast-link']).toBe('true');
        });

        it('should not add data-game-link when contentType is podcast', () => {
            const result = buildLinkProps({
                href: '/podcast',
                title: 'Podcast',
                contentType: 'podcast'
            });
            expect(result['data-game-link']).toBeUndefined();
        });

        it('should not add game or podcast attributes for unknown contentType', () => {
            const result = buildLinkProps({
                href: '/other',
                title: 'Other',
                contentType: 'other'
            });
            expect(result['data-game-link']).toBeUndefined();
            expect(result['data-videopodcast-link']).toBeUndefined();
        });

        it('should always set target to _self', () => {
            expect(
                buildLinkProps({ href: '/test', title: 'Test' }).target
            ).toBe('_self');
        });
    });

    describe('getBadge', () => {
        it('should return null when isNew is undefined', () => {
            expect(getBadge(undefined)).toBeNull();
        });

        it('should return null when isNew is "NO"', () => {
            expect(getBadge('NO')).toBeNull();
        });

        it('should return null when isNew is empty string', () => {
            expect(getBadge('')).toBeNull();
        });

        it('should return "NUEVO" when isNew is "NUEVO"', () => {
            expect(getBadge('NUEVO')).toBe('NUEVO');
        });

        it('should return "NUEVO EPISODIO" when isNew is "NUEVO EPISODIO"', () => {
            expect(getBadge('NUEVO EPISODIO')).toBe('NUEVO EPISODIO');
        });

        it('should return "NUEVO PODCAST" when isNew is "NUEVO PODCAST"', () => {
            expect(getBadge('NUEVO PODCAST')).toBe('NUEVO PODCAST');
        });
    });

    describe('getImageSettings', () => {
        it('should return cardPromoT1 when diagramation is oneLargeFourSmall and isFirstCard is true', () => {
            expect(
                getImageSettings({
                    isFirstCard: true,
                    diagramation: 'oneLargeFourSmall'
                })
            ).toBe('cardPromoT1');
        });

        it('should return cardPromoDefault when isFirstCard is false even with oneLargeFourSmall', () => {
            expect(
                getImageSettings({
                    isFirstCard: false,
                    diagramation: 'oneLargeFourSmall'
                })
            ).toBe('cardPromoDefault');
        });

        it('should return cardPromoDefault for fourVertical regardless of isFirstCard', () => {
            expect(
                getImageSettings({
                    isFirstCard: true,
                    diagramation: 'fourVertical'
                })
            ).toBe('cardPromoDefault');
        });

        it('should return cardPromoDefault when diagramation is empty string', () => {
            expect(
                getImageSettings({ isFirstCard: true, diagramation: '' })
            ).toBe('cardPromoDefault');
        });

        it('should return cardPromoDefault when diagramation is undefined', () => {
            expect(getImageSettings({ isFirstCard: true })).toBe(
                'cardPromoDefault'
            );
        });

        it('should return cardPromoDefault for twoHorizontal', () => {
            expect(
                getImageSettings({
                    isFirstCard: true,
                    diagramation: 'twoHorizontal'
                })
            ).toBe('cardPromoDefault');
        });
    });

    describe('isTagId', () => {
        it('should return true for a valid tag id starting with /tema/', () => {
            expect(isTagId('/tema/politica')).toBe(true);
        });

        it('should return true for a nested tag id', () => {
            expect(isTagId('/tema/economia/finanzas')).toBe(true);
        });

        it('should be falsy when id is undefined', () => {
            expect(isTagId(undefined)).toBeFalsy();
        });

        it('should be falsy when id is empty string', () => {
            expect(isTagId('')).toBeFalsy();
        });

        it('should return false when id does not start with /tema/', () => {
            expect(isTagId('/juegos/crucigrama')).toBe(false);
        });

        it('should return false when id starts with /temas/ (no trailing slash match)', () => {
            expect(isTagId('/temas/politica')).toBe(false);
        });

        it('should return false when id is a number', () => {
            expect(isTagId(123)).toBe(false);
        });

        it('should return false for a sectionId that does not contain /tema/', () => {
            expect(isTagId('/deportes/futbol')).toBe(false);
        });
    });
});
