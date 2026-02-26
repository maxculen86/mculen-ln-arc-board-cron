import isNoteListenable, {
    isNoteListenableForApps
} from '../../../../../content/sources/utils/audioNews/helper';
import responseArticleSource from '../../../../../__mocks__/data/articles/responseArticleSource.json';
import {
    isAudioGenerated,
    isValidDate
} from '../../../../../content/sources/utils/audioNews/helper';

describe('Test - isNoteListenable', () => {
    const AUDIO_STATUS = {
        CREATED_AUDIO: 6,
        UPDATED_AUDIO: 7
    };

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
        first_publish_date: '2023-11-24T18:06:59.601Z',
        promo_items: {
            audio_nota: {
                embed: {
                    config: {
                        audio_status: AUDIO_STATUS.CREATED_AUDIO
                    }
                }
            }
        }
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
                    first_publish_date: '',
                    promo_items: {}
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

        const casesTruthy = [
            [
                'It should return true when the source is composer, the subtype is enabled, the publish date is after 23/11/2023, and audioStatus is valid.',
                {
                    ...response,
                    promo_items: {
                        audio_nota: {
                            embed: {
                                config: {
                                    audio_status: AUDIO_STATUS.CREATED_AUDIO
                                }
                            }
                        }
                    }
                }
            ],
            [
                'Should return true when audioStatus is missing, maintaining previous logic',
                {
                    ...response,
                    promo_items: {}
                }
            ],
            [
                'Should return true when promo_items.audio_nota exists but audio_status is missing',
                {
                    ...response,
                    promo_items: {
                        audio_nota: {
                            embed: {
                                config: {}
                            }
                        }
                    }
                }
            ],
            [
                'Should return true when audioStatus is valid and K&L is not "No mostrar audio"',
                {
                    ...response,
                    promo_items: {
                        audio_nota: {
                            embed: {
                                config: {
                                    audio_status: AUDIO_STATUS.CREATED_AUDIO
                                }
                            }
                        }
                    },
                    label: {
                        republicar_audio: {
                            display: true,
                            text: 'Si'
                        }
                    }
                }
            ]
        ];

        it.each(casesTruthy)('%s', (message, response) => {
            expect(isNoteListenable(response)).toBeTruthy();
        });

        const casesFalsy = [
            [
                'Should return false when the publish date is 23/11/2023 before.',
                {
                    ...response,
                    first_publish_date: '2022-09-21T18:06:59.601Z',
                    promo_items: {}
                }
            ],
            [
                'Should return false when the subtype is not enabled.',
                {
                    ...response,
                    subtype: '9',
                    promo_items: {}
                }
            ],
            [
                'Should return false when the subtype is not enabled (LIVEBLOG).',
                {
                    ...response,
                    subtype: '6',
                    promo_items: {}
                }
            ],
            [
                'should return false when the origin source is not composer',
                {
                    ...response,
                    source: {
                        system: 'LN-9'
                    },
                    promo_items: {}
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
                    ],
                    promo_items: {}
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
                    ],
                    promo_items: {}
                }
            ],
            [
                'Should return false when the contentElements is not defined',
                {
                    ...response,
                    content_elements: [undefined],
                    promo_items: {}
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
                    },
                    promo_items: {}
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
                    },
                    promo_items: {}
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
                    },
                    promo_items: {}
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
                    first_publish_date: '2023-11-24T18:06:59.601Z',
                    promo_items: {}
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
                    first_publish_date: '2023-11-24T18:06:59.601Z',
                    promo_items: {}
                }
            ],
            [
                'Should return false when audioStatus is invalid',
                {
                    ...response,
                    promo_items: {
                        audio_nota: {
                            embed: {
                                config: {
                                    audio_status: 8
                                }
                            }
                        }
                    }
                }
            ],
            [
                'Should return false when the note is published after the release date and audioStatus is null',
                {
                    ...response,
                    first_publish_date: '2025-04-02T00:00:00.000Z',
                    promo_items: {
                        audio_nota: {
                            embed: {
                                config: {
                                    audio_status: null
                                }
                            }
                        }
                    }
                }
            ],
            [
                'Should return false when audioStatus is valid but K&L text is "No mostrar audio"',
                {
                    ...response,
                    promo_items: {
                        audio_nota: {
                            embed: {
                                config: {
                                    audio_status: AUDIO_STATUS.CREATED_AUDIO
                                }
                            }
                        }
                    },
                    label: {
                        republicar_audio: {
                            display: true,
                            text: 'No mostrar audio'
                        }
                    }
                }
            ]
        ];

        it.each(casesFalsy)('%s', (message, response) => {
            expect(isNoteListenable(response)).toBeFalsy();
        });
    });
});

describe('isNoteListenableForApps (actualizado según nuevos requisitos)', () => {
    it('Should return true when audio is generated (6) and label says "No mostrar audio" — apps must allow TTS', () => {
        const data = {
            promo_items: {
                audio_nota: {
                    embed: { config: { audio_status: 6 } }
                }
            },
            label: { republicar_audio: { text: 'No mostrar audio' } }
        };

        const result = isNoteListenableForApps(data);
        expect(result).toBe(true); //el label no debe bloquear TTS en apps
    });

    it('Should return true when audio is generated and label allows it (sanity)', () => {
        const data = {
            promo_items: {
                audio_nota: {
                    embed: { config: { audio_status: 7 } }
                }
            },
            label: { republicar_audio: { text: 'Mostrar audio' } }
        };

        const result = isNoteListenableForApps(data);
        expect(result).toBe(true);
    });

    it('When audio_status exists but is NOT generated, it should fallback to wordCount logic (true if >=100)', () => {
        const data = {
            promo_items: {
                audio_nota: {
                    embed: { config: { audio_status: 5 } } // not generated
                }
            },
            subtype: '1',
            planning: { story_length: { word_count_actual: 120 } }
        };

        const result = isNoteListenableForApps(data);
        expect(result).toBe(true);
    });

    it('Collection-like item: no audio generated and no wordCount -> should return false', () => {
        const data = {
            source: { system: 'composer' },
            subtype: '1',
            first_publish_date: '20250101'
        };

        const result = isNoteListenableForApps(data);
        expect(result).toBe(false);
    });

    it('Collection-like item without audio and without wordCount should return false (even if subtype is disabled)', () => {
        const data = {
            source: { system: 'composer' },
            subtype: '7',
            first_publish_date: '20250101'
        };

        const result = isNoteListenableForApps(data);
        expect(result).toBe(false);
    });

    it('When audio_status exists but is NOT generated and there is NO wordCount -> should return false (no fallback available)', () => {
        const data = {
            promo_items: {
                audio_nota: {
                    embed: { config: { audio_status: 5 } } // not generated
                }
            },
            subtype: '1'
        };

        const result = isNoteListenableForApps(data);
        expect(result).toBe(false);
    });
});

describe('Test - isAudioGenerated', () => {
    const AUDIO_STATUS = {
        CREATED_AUDIO: 6,
        UPDATED_AUDIO: 7
    };

    it('should return true for CREATED_AUDIO', () => {
        expect(isAudioGenerated(AUDIO_STATUS.CREATED_AUDIO)).toBe(true);
    });

    it('should return true for UPDATED_AUDIO', () => {
        expect(isAudioGenerated(AUDIO_STATUS.UPDATED_AUDIO)).toBe(true);
    });

    it('should return false for an unknown audioStatus', () => {
        expect(isAudioGenerated(8)).toBe(false);
    });

    it('should return false for null status', () => {
        expect(isAudioGenerated(null)).toBe(false);
    });

    it('should return false for undefined status', () => {
        expect(isAudioGenerated(undefined)).toBe(false);
    });
});

describe('Test - isValidDate', () => {
    it('should return true for a date equal to releaseDate', () => {
        expect(isValidDate('20231123')).toBe(true);
    });

    it('should return true for a date after releaseDate', () => {
        expect(isValidDate('20241124')).toBe(true);
    });

    it('should return false for a date before releaseDate', () => {
        expect(isValidDate('20231122')).toBe(false);
    });

    it('should return true for a formatted date with dashes', () => {
        expect(isValidDate('2023-11-23')).toBe(true);
    });

    it('should return true for a formatted date with letters and time', () => {
        expect(isValidDate('2025-03-18T13:22:49.627Z')).toBe(true);
    });

    it('should return true for a valid date after a releaseDate', () => {
        expect(isValidDate('20250326', 20250325)).toBe(true);
    });

    it('should return false for a date before a releaseDate', () => {
        expect(isValidDate('20250320', 20250325)).toBe(false);
    });
    it('should return false for an empty date', () => {
        expect(isValidDate('')).toBe(false);
    });
    it.each(['5', '7', '8', '9', '16'])(
        'Should return false for disabled subtype %s in apps',
        subtype => {
            expect(
                isNoteListenableForApps({
                    source: { system: 'composer' },
                    subtype,
                    first_publish_date: '2025-04-01'
                })
            ).toBe(false);
        }
    );
});
