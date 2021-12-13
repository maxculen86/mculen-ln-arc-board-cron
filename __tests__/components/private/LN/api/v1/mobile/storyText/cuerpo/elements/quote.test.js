import quote from '../../../../../../../../../../components/private/LN/api/v1/mobile/storyText/cuerpo/elements/quote';

describe('components - private - LN - api - v1 - mobile - storyText - cuerpo - elements - quote', () => {
    it('Test Ok', () => {
        const itemQuote = {
            _id: 'I6Y2MRMRYFHNXN4BJH6YNK26DQ',
            type: 'quote',
            content_elements: [
                {
                    _id: 'BJVAPUQPQVHVRCXY4FP6IDJ7WU',
                    content: 'Esto es un destacado',
                    type: 'text'
                },
                {
                    _id: 'BJVAPUQPQVHVRCXY4FP6IDJ7WP',
                    content: '<b>Esto es un destacado</b>',
                    type: 'text'
                }
            ],
            citation: { content: 'Xime Paparella', type: 'text' },
            subtype: 'blockquote'
        };
        const resp = quote(itemQuote);
        expect(resp).toEqual('Esto es un destacado\nEsto es un destacado');
    });
    it('Test Ok subtype pullquote', () => {
        const itemQuote = {
            _id: 'EEZYOOQC4VBWLLQRBKUPOBP6ZA',
            type: 'quote',
            content_elements: [
                {
                    _id: 'I4WRWGICKZHEHFOWN3NTWNIAFQ',
                    additional_properties: {
                        comments: [],
                        inline_comments: []
                    },
                    content: 'Esto es una cita',
                    type: 'text'
                }
            ],
            subtype_label: 'pullquote',
            citation: { content: 'Ignacio Madrid', type: 'text' },
            subtype: 'pullquote',
            additional_properties: {
                _id: 'S7V4ZEWWYJCVPMKAMF6LW72MOY',
                comments: []
            }
        };
        const resp = quote(itemQuote);
        expect(resp).toEqual('Esto es una cita\nIgnacio Madrid');
    });

    it('Test para validar si el elemento content_elements es vacio', () => {
        const itemQuote = {
            _id: 'I6Y2MRMRYFHNXN4BJH6YNK26DQ',
            type: 'quote',
            content_elements: [],
            citation: { content: 'Xime Paparella', type: 'text' },
            subtype: 'blockquote'
        };
        const resp = quote(itemQuote);
        expect(resp).toEqual(null);
    });

    it('Test para validar si todos sus elementos son vacios', () => {
        const itemQuote = {
            _id: 'I6Y2MRMRYFHNXN4BJH6YNK26DQ',
            type: 'quote',
            content_elements: [],
            citation: { content: '', type: 'text' },
            subtype: 'blockquote'
        };
        const resp = quote(itemQuote);
        expect(resp).toEqual(null);
    });

    it('Test para validar si  sus elementos no existen', () => {
        const itemQuote = {
            _id: 'I6Y2MRMRYFHNXN4BJH6YNK26DQ',
            type: 'quote',
            subtype: 'blockquote'
        };
        const resp = quote(itemQuote);
        expect(resp).toEqual(null);
    });
    it('Test para validar si el elemento es null', () => {
        const resp = quote(null);
        expect(resp).toEqual(null);
    });
});
