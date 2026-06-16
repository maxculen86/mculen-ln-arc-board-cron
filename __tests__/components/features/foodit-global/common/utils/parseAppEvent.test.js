import { parseAppEvent } from '../../../../../../components/features/foodit-global/common/utils/parseAppEvent';

describe('parseAppEvent', () => {
    it('separates event name from params and serializes params as JSON', () => {
        const result = parseAppEvent({
            event: 'e_linkclick',
            category: 'interaction',
            label: 'receta'
        });
        expect(result.event).toBe('e_linkclick');
        expect(result.eventJsonData).toBe(
            JSON.stringify({ category: 'interaction', label: 'receta' })
        );
    });

    it('returns empty string for event when event field is missing', () => {
        const result = parseAppEvent({ category: 'interaction' });
        expect(result.event).toBe('');
        expect(result.eventJsonData).toBe(
            JSON.stringify({ category: 'interaction' })
        );
    });

    it('returns empty JSON object when called with no arguments', () => {
        const result = parseAppEvent();
        expect(result.event).toBe('');
        expect(result.eventJsonData).toBe('{}');
    });
});
