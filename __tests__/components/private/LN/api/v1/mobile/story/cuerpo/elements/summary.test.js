import summary from '../../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/summary';

describe('components - private - LN - api - v1 - mobile - story - cuerpo - elements - summary', () => {
    describe('summary tests for correct output expected', () => {
        it.each([
            [
                { items: ['Item 1', 'Item 2', 'Item 3'] },
                {
                    _t: 'article_summary',
                    title: 'RESUMEN DE NOTA',
                    disclaimer: 'Resumen generada por inteligencia artificial',
                    type: 'ul',
                    items: [
                        { _t: 'li', value: 'Item 1' },
                        { _t: 'li', value: 'Item 2' },
                        { _t: 'li', value: 'Item 3' }
                    ]
                }
            ],
            [
                { items: ['Item 1', 'Item 2', 'Item 3'], type: 'ol' },
                {
                    _t: 'article_summary',
                    title: 'RESUMEN DE NOTA',
                    disclaimer: 'Resumen generada por inteligencia artificial',
                    type: 'ul',
                    items: [
                        { _t: 'li', value: 'Item 1' },
                        { _t: 'li', value: 'Item 2' },
                        { _t: 'li', value: 'Item 3' }
                    ]
                }
            ],
            [
                {
                    items: [
                        'Item 1',
                        'Item 2 with special characters: & < >',
                        'Item 3'
                    ]
                },
                {
                    _t: 'article_summary',
                    title: 'RESUMEN DE NOTA',
                    disclaimer: 'Resumen generada por inteligencia artificial',
                    type: 'ul',
                    items: [
                        { _t: 'li', value: 'Item 1' },
                        {
                            _t: 'li',
                            value: 'Item 2 with special characters: & < >'
                        },
                        { _t: 'li', value: 'Item 3' }
                    ]
                }
            ],
            [
                { items: ['Item 1', 'Item 2', 'Item 3'] },
                {
                    _t: 'article_summary',
                    title: 'RESUMEN DE NOTA',
                    disclaimer: 'Resumen generada por inteligencia artificial',
                    type: 'ul',
                    items: [
                        { _t: 'li', value: 'Item 1' },
                        { _t: 'li', value: 'Item 2' },
                        { _t: 'li', value: 'Item 3' }
                    ]
                }
            ],
            [
                { items: ['Item 1', 'Item 2', 'Item 3'] },
                {
                    _t: 'article_summary',
                    title: 'RESUMEN DE NOTA',
                    disclaimer: 'Resumen generada por inteligencia artificial',
                    type: 'ul',
                    items: [
                        { _t: 'li', value: 'Item 1' },
                        { _t: 'li', value: 'Item 2' },
                        { _t: 'li', value: 'Item 3' }
                    ]
                }
            ]
        ])(
            'should return the summary object with correct properties and values when %j',
            (nodo, expected) => {
                const dataNota = {};
                const result = summary(nodo, dataNota);
                expect(result).toEqual(expected);
            }
        );
    });

    describe('summary tests for null responses', () => {
        const cases = [
            [{ items: [] }],
            [null],
            [undefined],
            [{ items: ['', '', ''] }],
            [{ items: [undefined, undefined, undefined] }],
            [{ items: [null, null, null] }],
            [{ items: undefined }],
            [{ items: null }]
        ];

        it.each(cases)('should return null when Nodo is %j', nodo => {
            const result = summary(nodo);
            expect(result).toBeNull();
        });
    });
});
