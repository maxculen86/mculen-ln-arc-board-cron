import scriptVideoValidator from '../../../../../components/private/common/scriptManager/scriptVideoValidator';

describe('components - private - common - scriptManager - scriptVideoValidator', () => {
    it('should return true if contentElements contain a video', () => {
        const globalContent = {
            content_elements: [{ type: 'text' }, { type: 'video' }],
            subtype: 'article',
            promo_items: {}
        };

        expect(scriptVideoValidator(globalContent)).toBe(true);
    });

    it('should return true if promo_items.apertura_multimedia.type is video', () => {
        const globalContent = {
            content_elements: [],
            subtype: 'article',
            promo_items: {
                apertura_multimedia: { type: 'video' }
            }
        };

        expect(scriptVideoValidator(globalContent)).toBe(true);
    });

    it('should return true if promo_items.basic.type is video', () => {
        const globalContent = {
            content_elements: [],
            subtype: 'article',
            promo_items: {
                basic: { type: 'video' }
            }
        };

        expect(scriptVideoValidator(globalContent)).toBe(true);
    });

    it('should return false if there are no videos and subtype is FOTOAL100', () => {
        const globalContent = {
            content_elements: [],
            subtype: 'FOTOAL100',
            promo_items: {
                basic: { type: 'text' },
                apertura_multimedia: { type: 'text' }
            }
        };

        expect(scriptVideoValidator(globalContent)).toBe(false);
    });

    it('should return false if there are no videos in contentElements or promo_items', () => {
        const globalContent = {
            content_elements: [{ type: 'text' }],
            subtype: 'article',
            promo_items: {
                basic: { type: 'image' },
                apertura_multimedia: { type: 'gallery' }
            }
        };

        expect(scriptVideoValidator(globalContent)).toBe(false);
    });
});
