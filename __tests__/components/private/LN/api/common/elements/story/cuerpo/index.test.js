import { getSummaryElements } from '../../../../../../../../../components/private/LN/api/common/elements/story/cuerpo/index';

describe('components - private - LN - api - common - elements - story - cuerpo', () => {
    it('should throw an error when contentElements is empty', () => {
        const summary = { _id: '123', embed: { config: { arrayBullets: [] } } };
        const subtype = '1';
        const contentElements = undefined;

        expect(() =>
            getSummaryElements(summary, subtype, contentElements)
        ).toThrowError('The story does not have body');
    });

    it('should return contentElements when summary is empty', () => {
        const summary = {};
        const subtype = '1';
        const contentElements = [
            { _id: '456', type: 'text', text: 'Lorem ipsum' }
        ];

        const result = getSummaryElements(summary, subtype, contentElements);

        expect(result).toEqual(contentElements);
    });

    it('should add summary to contentElements and return when both are not empty', () => {
        const summary = {
            _id: '123',
            embed: {
                config: { arrayBullets: ['hola soy un resumen', 'yo tambien'] }
            }
        };
        const subtype = '1';
        const contentElements = [
            { _id: '456', type: 'text', text: 'Lorem ipsum' }
        ];

        const result = getSummaryElements(summary, subtype, contentElements);

        expect(result).toEqual([
            {
                _id: '123',
                type: 'summary',
                items: ['hola soy un resumen', 'yo tambien']
            },
            { _id: '456', type: 'text', text: 'Lorem ipsum' }
        ]);
    });

    it('should not add summary to contentElements when subtype is not in allowedNotesTypes', () => {
        const summary = { _id: '123', embed: { config: { arrayBullets: [] } } };
        const subtype = '2';
        const contentElements = [
            { _id: '456', type: 'text', text: 'Lorem ipsum' }
        ];

        const result = getSummaryElements(summary, subtype, contentElements);

        expect(result).toEqual(contentElements);
    });

    it('should always return an array', () => {
        const summary = { _id: '123', embed: { config: { arrayBullets: [] } } };
        const subtype = '1';
        const contentElements = [
            { _id: '456', type: 'text', text: 'Lorem ipsum' }
        ];

        const result = getSummaryElements(summary, subtype, contentElements);

        expect(Array.isArray(result)).toBe(true);
    });
});
