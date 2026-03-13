import getElementsText from '../../../../../components/private/common/utils/getElementsText';

describe('getElementsText', () => {
    it('should join multiple text elements and clean up the HTML tags', () => {
        const input = [
            { type: 'text', content: '<strong>Hola</strong>' },
            { type: 'image', url: 'foto.jpg' },
            { type: 'text', content: 'esto es <i>una prueba</i>.' }
        ];
        const result = getElementsText(input);
        expect(result).toBe('Hola esto es una prueba.');
    });

    it('should handle an empty array and return an empty string', () => {
        expect(getElementsText([])).toBe('');
    });

    it('should handle undefined or null values thanks to optional chaining', () => {
        expect(getElementsText(undefined)).toBe('');
        expect(getElementsText(null)).toBe('');
    });

    it('should not add extra spaces if there is only one text element', () => {
        const input = [{ type: 'text', content: 'Solo texto' }];
        expect(getElementsText(input)).toBe('Solo texto');
    });

    it('should ignore elements that are not of type "text"', () => {
        const input = [
            { type: 'video', url: '...' },
            { type: 'quote', content: 'Citado' }, // Aunque tenga content, el type no es text
            { type: 'image', url: '...' }
        ];
        expect(getElementsText(input)).toBe('');
    });

    it('should clean broken or incomplete tags (regex behavior)', () => {
        const input = [
            {
                type: 'text',
                content: '<div class="test">Texto con etiqueta mal cerrada <p'
            }
        ];
        expect(getElementsText(input).trim()).toBe(
            'Texto con etiqueta mal cerrada'
        );
    });

    it('should maintain the text if it does not contain any HTML tags', () => {
        const input = [{ type: 'text', content: 'Texto plano sin tags' }];
        expect(getElementsText(input)).toBe('Texto plano sin tags');
    });
});
