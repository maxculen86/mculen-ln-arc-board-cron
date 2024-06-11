import {
    findTemplate,
    getInterval,
    shouldBeExcluded
} from '../../../../../components/private/common/utils/metarefreshHelper';

describe('findTemplate func', () => {
    it('should return "nota" for type "story" or "results"', () => {
        expect(findTemplate('story')).toBe('nota');
        expect(findTemplate('results')).toBe('nota');
    });

    it('should return "home_deportes" for type "/deportes"', () => {
        expect(findTemplate('/deportes')).toBe('home_deportes');
    });

    it('should return "home" for any other type', () => {
        expect(findTemplate('other')).toBe('home');
    });
});

describe('getInterval func', () => {
    it('should return the correct interval for "Estados Unidos" category', () => {
        const type = 'story';
        const resolution = 'tablet';
        const config = {
            nota_estados_unidos: '5',
            nota_mobile: '10'
        };
        const category = 'Estados Unidos';

        const result = getInterval(type, resolution, config, category);

        expect(result).toBe(5000);
    });

    it('should return the correct interval for other categories', () => {
        const type = 'story';
        const resolution = 'tablet';
        const config = {
            nota_mobile: '10'
        };
        const category = 'Other';

        const result = getInterval(type, resolution, config, category);

        expect(result).toBe(10000);
    });

    it('should return 0 if config is not provided', () => {
        const type = 'story';
        const resolution = 'tablet';
        const config = null;
        const category = 'Other';

        const result = getInterval(type, resolution, config, category);

        expect(result).toBe(0);
    });
});

describe('shouldBeExcluded func', () => {
    it('should return true if content_elements contains raw_html, oembed_response, or video', () => {
        const globalContent = {
            content_elements: [{ type: 'raw_html' }]
        };

        expect(shouldBeExcluded({ globalContent })).toBe(true);
    });

    it('should return true if promo_items.basic is of type video', () => {
        const globalContent = {
            promo_items: { basic: { type: 'video' } }
        };

        expect(shouldBeExcluded({ globalContent })).toBe(true);
    });

    it('should return true if label.metarefresh.text is "No"', () => {
        const globalContent = {
            label: { metarefresh: { text: 'No' } }
        };

        expect(shouldBeExcluded({ globalContent })).toBe(true);
    });

    it('should return false if none of the conditions are met', () => {
        const globalContent = {
            label: { metarefresh: { text: 'Yes' } },
            content_elements: [{ type: 'text' }],
            promo_items: { basic: { type: 'image' } }
        };

        expect(shouldBeExcluded({ globalContent })).toBe(false);
    });
});
