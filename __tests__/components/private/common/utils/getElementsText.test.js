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

    it('should ignore unsupported non-textual elements', () => {
        const input = [
            { type: 'video', url: '...' },
            { type: 'divider' },
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

    it('should normalize &nbsp; to regular spaces', () => {
        const input = [
            {
                type: 'text',
                content: 'Texto&nbsp;con&nbsp;espacios&nbsp;duros'
            }
        ];

        expect(getElementsText(input)).toBe('Texto con espacios duros');
    });

    it('should include text from list items in the extracted body', () => {
        const input = [
            { type: 'text', content: 'Texto inicial.' },
            {
                type: 'list',
                items: [
                    { type: 'text', content: 'Primer bullet' },
                    { type: 'text', content: 'Segundo <strong>bullet</strong>' }
                ]
            },
            { type: 'text', content: 'Texto final.' }
        ];

        expect(getElementsText(input)).toBe(
            'Texto inicial. Primer bullet Segundo bullet Texto final.'
        );
    });

    it('should include text from nested lists as plain text', () => {
        const input = [
            {
                type: 'list',
                items: [
                    { type: 'text', content: 'Bullet padre' },
                    {
                        type: 'list',
                        items: [
                            { type: 'text', content: 'Bullet hijo 1' },
                            { type: 'text', content: 'Bullet hijo 2' }
                        ]
                    }
                ]
            }
        ];

        expect(getElementsText(input)).toBe(
            'Bullet padre Bullet hijo 1 Bullet hijo 2'
        );
    });

    it('should include untyped list items when they contain textual content', () => {
        const input = [
            {
                type: 'quote',
                subtype: 'blockquote',
                content_elements: [
                    { type: 'text', content: 'Intro de cita' },
                    {
                        type: 'list',
                        items: [
                            { content: 'Bullet sin type 1' },
                            { content: '<strong>Bullet sin type 2</strong>' }
                        ]
                    }
                ]
            }
        ];

        expect(getElementsText(input)).toBe(
            'Intro de cita Bullet sin type 1 Bullet sin type 2'
        );
    });

    it('should include header content in the extracted body', () => {
        const input = [
            { type: 'header', content: 'Subtitulo principal' },
            { type: 'text', content: 'Parrafo.' }
        ];

        expect(getElementsText(input)).toBe('Subtitulo principal Parrafo.');
    });

    it('should include quote text content and ignore citation for blockquote', () => {
        const input = [
            {
                type: 'quote',
                subtype: 'blockquote',
                content_elements: [
                    { type: 'text', content: 'Texto de cita' },
                    { type: 'text', content: '<strong>Continuacion</strong>' }
                ],
                citation: { type: 'text', content: 'Autor cita' }
            }
        ];

        expect(getElementsText(input)).toBe('Texto de cita Continuacion');
    });

    it('should include pullquote citation as plain text', () => {
        const input = [
            {
                type: 'quote',
                subtype: 'pullquote',
                content_elements: [{ type: 'text', content: 'Texto de cita' }],
                citation: { type: 'text', content: 'Autor cita' }
            }
        ];

        expect(getElementsText(input)).toBe('Texto de cita Autor cita');
    });

    it('should include table header and rows as plain text', () => {
        const input = [
            {
                type: 'table',
                header: [
                    { _id: 'h1', content: 'Columna 1' },
                    { _id: 'h2', content: 'Columna 2' }
                ],
                rows: [
                    [
                        { _id: 'r1c1', content: 'Fila 1 A' },
                        { _id: 'r1c2', content: 'Fila 1 B' }
                    ],
                    [
                        { _id: 'r2c1', content: 'Fila 2 A' },
                        { _id: 'r2c2', content: 'Fila 2 B' }
                    ]
                ]
            }
        ];

        expect(getElementsText(input)).toBe(
            'Columna 1 Columna 2 Fila 1 A Fila 1 B Fila 2 A Fila 2 B'
        );
    });
});
