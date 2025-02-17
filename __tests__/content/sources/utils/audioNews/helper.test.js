import isNoteListenable from '../../../../../content/sources/utils/audioNews/helper';
import responseArticleSource from '../../../../../__mocks__/data/articles/responseArticleSource.json';

describe('Test - isNoteListenable', () => {
    const data = {
        ...responseArticleSource,
        source: {
            ...responseArticleSource.source,
            system: 'composer'
        },
        label: {
            republicar_audio: {
                display: true
            }
        },
        taxonomy: {
            primary_section: {
                _id: '/espectaculos'
            }
        },
        subtype: '1',
        content_elements: [
            {
                type: 'text',
                content: 'Un parrafo'
            }
        ],
        first_publish_date: '2023-11-24T18:06:59.601Z'
    };

    describe('When the note is of spectacles', () => {
        const casesTruthy = [
            [
                'It should return true when the source is composer, the subtype is enabled, and the publish date is 23/11/2023 onwards.',
                data
            ],
            [
                'should return true even if the section has children.',
                {
                    ...data,
                    taxonomy: {
                        primary_section: {
                            _id: '/espectaculos/cartelera-de-cine/'
                        }
                    }
                }
            ],
            [
                'should return true when the prop republicar_audio is not defiend',
                {
                    ...data,
                    label: {}
                }
            ],
            [
                'Should return false when republicar_audio text is empty ""',
                {
                    ...data,
                    label: {
                        republicar_audio: {
                            display: true,
                            text: ''
                        }
                    }
                }
            ],
            [
                'Should return true when republicar_audio text is "No"',
                {
                    ...data,
                    label: {
                        republicar_audio: {
                            display: true,
                            text: 'No'
                        }
                    }
                }
            ],
            [
                'Should return true when republicar_audio text is "Si"',
                {
                    ...data,
                    label: {
                        republicar_audio: {
                            display: true,
                            text: 'Si'
                        }
                    }
                }
            ],
            [
                'Should return true when the primary section is "/estados-unidos/california"',
                {
                    ...data,
                    taxonomy: {
                        primary_section: {
                            _id: '/estados-unidos/california'
                        }
                    },
                    first_publish_date: '2025-11-24T18:06:59.601Z'
                }
            ],
            [
                'Should return true when the primary section is "estados-unidos"',
                {
                    ...data,
                    taxonomy: {
                        primary_section: {
                            _id: '/estados-unidos'
                        }
                    },
                    first_publish_date: '2025-11-24T18:06:59.601Z'
                }
            ]
        ];

        it.each(casesTruthy)('%s', (message, data) => {
            expect(isNoteListenable(data)).toBeTruthy();
        });

        it('should return false when the publish date is before 23/11/2023', () => {
            expect(
                isNoteListenable({
                    ...data,
                    display_date: '2022-09-15T18:06:59.601Z',
                    first_publish_date: ''
                })
            ).toBeFalsy();
        });
    });

    describe('Cases for the rest of the sections', () => {
        const response = {
            ...data,
            taxonomy: {
                primary_section: {
                    _id: '/economia'
                }
            },
            first_publish_date: '2023-11-24T18:06:59.601Z'
        };

        it('It should return true when the source is composer, the subtype is enabled, and the publish date is 23/11/2023 onwards.', () => {
            expect(isNoteListenable(response)).toBeTruthy();
        });

        const casesFalsy = [
            [
                'Should return false when the publish date is 23/11/2023 before.',
                {
                    ...response,
                    first_publish_date: '2022-09-21T18:06:59.601Z'
                }
            ],
            [
                'Should return false when the subtype is not enabled.',
                {
                    ...response,
                    subtype: '9'
                }
            ],
            [
                'should return false when the origin source is not composer',
                {
                    ...response,
                    source: {
                        system: 'LN-9'
                    }
                }
            ],
            ['Should return false when data is not defined', undefined],
            [
                'Should return false when the note has no paragraphs',
                {
                    ...response,
                    content_elements: [
                        {
                            type: 'image',
                            content: 'image.png'
                        }
                    ]
                }
            ],
            [
                'Should return false when the type is not defined in contentElements',
                {
                    ...response,
                    content_elements: [
                        {
                            type: undefined
                        }
                    ]
                }
            ],
            [
                'Should return false when the contentElements is not defined',
                {
                    ...response,
                    content_elements: [undefined]
                }
            ],
            [
                'Should return false when republicar_audio text is "No mostrar audio"',
                {
                    ...response,
                    label: {
                        republicar_audio: {
                            display: true,
                            text: 'No mostrar audio'
                        }
                    }
                }
            ],
            [
                'Should return false when the primary section is "juegos"',
                {
                    ...response,
                    taxonomy: {
                        primary_section: {
                            _id: '/juegos'
                        }
                    }
                }
            ],
            [
                'Should return false when the primary section is "newsletters"',
                {
                    ...response,
                    taxonomy: {
                        primary_section: {
                            _id: '/newsletters'
                        }
                    }
                }
            ],
            [
                'Should return false when the primary section is "/estados-unidos/california" and first_publish_date < 2025/02/17',
                {
                    ...response,
                    taxonomy: {
                        primary_section: {
                            _id: '/estados-unidos/california'
                        }
                    },
                    first_publish_date: '2023-11-24T18:06:59.601Z'
                }
            ],
            [
                'Should return false when the primary section is "estados-unidos" and first_publish_date < 2025/02/17',
                {
                    ...response,
                    taxonomy: {
                        primary_section: {
                            _id: '/estados-unidos'
                        }
                    },
                    first_publish_date: '2023-11-24T18:06:59.601Z'
                }
            ]
        ];

        it.each(casesFalsy)('%s', (message, response) => {
            expect(isNoteListenable(response)).toBeFalsy();
        });
    });
});
