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
        last_updated_date: '2022-09-21T18:06:59.601Z'
    };

    describe('When the note is of spectacles', () => {
        const casesTruthy = [
            [
                'It should return true when the source is composer, the subtype is enabled, and the publish date is 20/09/2022 onwards.',
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
            ]
        ];

        test.each(casesTruthy)('%s', (message, data) => {
            expect(isNoteListenable(data)).toBeTruthy();
        });

        test('should return false when the publish date is before 13/10/2022', () => {
            expect(
                isNoteListenable({
                    ...data,
                    last_updated_date: '2022-09-15T18:06:59.601Z'
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
            last_updated_date: '2022-10-21T18:06:59.601Z'
        };

        test('It should return true when the source is composer, the subtype is enabled, and the publish date is 20/09/2022 onwards.', () => {
            expect(isNoteListenable(response)).toBeTruthy();
        });

        const casesFalsy = [
            [
                'Should return false when the publish date is 13/10/2022 before.',
                {
                    ...response,
                    last_updated_date: '2022-09-21T18:06:59.601Z'
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
                'should return false when the prop republicar_audio is not defiend',
                {
                    ...response,
                    label: {}
                }
            ],
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
            ]
        ];

        test.each(casesFalsy)('%s', (message, response) => {
            expect(isNoteListenable(response)).toBeFalsy();
        });
    });
});
