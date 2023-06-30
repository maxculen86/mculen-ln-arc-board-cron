import summary from '../../../../../../../../../../components/private/LN/api/v1/global/story/cuerpo/elements/summary';

describe('components - private - LN - api - v1 - global - story - cuerpo - elements - summary', () => {
    describe('summary tests for correct output expected', () => {
        it.each([
            [
                { items: ['Item 1', 'Item 2', 'Item 3'] },
                {
                    _t: 'p',
                    valor: {
                        _t: 'article_summary',
                        title: 'RESUMEN DE NOTA',
                        disclaimer:
                            'Realizado con inteligencia artificial.',
                        type: 'ul',
                        valor: [
                            { _t: 'li', valor: 'Item 1' },
                            { _t: 'li', valor: 'Item 2' },
                            { _t: 'li', valor: 'Item 3' }
                        ]
                    }
                }
            ],
            [
                { items: ['Item 1', 'Item 2', 'Item 3'], type: 'ol' },
                {
                    _t: 'p',
                    valor: {
                        _t: 'article_summary',
                        title: 'RESUMEN DE NOTA',
                        disclaimer:
                            'Realizado con inteligencia artificial.',
                        type: 'ul',
                        valor: [
                            { _t: 'li', valor: 'Item 1' },
                            { _t: 'li', valor: 'Item 2' },
                            { _t: 'li', valor: 'Item 3' }
                        ]
                    }
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
                    _t: 'p',
                    valor: {
                        _t: 'article_summary',
                        title: 'RESUMEN DE NOTA',
                        disclaimer:
                            'Realizado con inteligencia artificial.',
                        type: 'ul',
                        valor: [
                            { _t: 'li', valor: 'Item 1' },
                            {
                                _t: 'li',
                                valor: 'Item 2 with special characters: & < >'
                            },
                            { _t: 'li', valor: 'Item 3' }
                        ]
                    }
                }
            ],
            [
                { items: ['Item 1', 'Item 2', 'Item 3'] },
                {
                    _t: 'p',
                    valor: {
                        _t: 'article_summary',
                        title: 'RESUMEN DE NOTA',
                        disclaimer:
                            'Realizado con inteligencia artificial.',
                        type: 'ul',
                        valor: [
                            { _t: 'li', valor: 'Item 1' },
                            { _t: 'li', valor: 'Item 2' },
                            { _t: 'li', valor: 'Item 3' }
                        ]
                    }
                }
            ],
            [
                { items: ['Item 1', 'Item 2', 'Item 3'] },
                {
                    _t: 'p',
                    valor: {
                        _t: 'article_summary',
                        title: 'RESUMEN DE NOTA',
                        disclaimer:
                            'Realizado con inteligencia artificial.',
                        type: 'ul',
                        valor: [
                            { _t: 'li', valor: 'Item 1' },
                            { _t: 'li', valor: 'Item 2' },
                            { _t: 'li', valor: 'Item 3' }
                        ]
                    }
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
            console.log('resultado', result);
            expect(result).toBeNull();
        });
    });
});
