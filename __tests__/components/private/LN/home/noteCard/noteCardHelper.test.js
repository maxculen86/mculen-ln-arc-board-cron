import {
    initialElementInPB,
    featuresValidator
} from '../../../../../../components/private/LN/home/components/noteCard/noteCardHelper';

describe('components - private - LN - home - noteCard - noteCardHelper', () => {
    describe('Eager load validation test', () => {
        const renderables = [
            {
                collection: 'features',
                type: 'LN-common/cajaAnticipo',
                props: {
                    collection: 'features',
                    type: 'LN-common/cajaAnticipo',
                    id: 'f0fsKOIpLgGn7O3',
                    name: null,
                    contentConfig: {
                        contentService: '',
                        contentConfigValues: {},
                        inherit: true
                    },
                    customFields: {
                        title: 'hola jc',
                        link: null,
                        hide: true,
                        hideBadge: null
                    },
                    displayProperties: {},
                    localEdits: {},
                    variants: {}
                }
            },
            {
                collection: 'features',
                type: 'LN-common/bomba',
                props: {
                    collection: 'features',
                    type: 'LN-common/bomba',
                    id: 'f0fcLtIhSP7E7tK',
                    name: null,
                    contentConfig: {
                        contentService: '',
                        contentConfigValues: {},
                        inherit: true
                    },
                    customFields: {
                        chapita: '',
                        authors: '',
                        lead: 'QATAR 2022. ',
                        title: 'Arranca el Mundial',
                        noteId: 'YKFWJP34VFGSFOJZJZXAKZ5IHE',
                        imageId: 'LO6KMEFWNFF3JCALSTGPHVUNQM',
                        hideFeature: false,
                        hideImage: false,
                        description:
                            'Se están realizando movilizaciones en 22 provincias del país para reclamar al Gobierno la generación de puestos de trabajo y asistencia a los comedores; el Movimiento Evita y Barrios de Pie suspendieron la marcha de apoyo a Alberto Fernández',
                        hideDescription: false,
                        chapitaStyle: '',
                        video: '',
                        html: ''
                    },
                    displayProperties: {},
                    localEdits: {},
                    variants: {}
                }
            },
            {
                collection: 'chains',
                type: 'Ln_Caja_Manual',
                props: {
                    collection: 'chains',
                    type: 'Ln_Caja_Manual',
                    id: 'c0fPfzfGzoyT4VC',
                    name: 'home---apertura-1-1',
                    customFields: {
                        layout: 'grillaVideo1',
                        initialPosition: 1,
                        hideTitle: true,
                        pbInternal_cloneId: 'c0fPfzfGzoyT4VC',
                        hideCaja: true,
                        imageId: 'D5BZF3XZ7JDUNJZWGSNJWHIHJQ'
                    },
                    displayProperties: {}
                },
                children: [
                    {
                        collection: 'features',
                        type: 'LN-common/articulo',
                        props: {
                            collection: 'features',
                            type: 'LN-common/articulo',
                            id: 'f0fydg8uyoyT4Qm',
                            name: null,
                            contentConfig: {
                                contentService: '',
                                contentConfigValues: {},
                                inherit: true
                            },
                            customFields: {
                                noteId: 'SUW6AQPARNCGLBDM2YOUGGC474',
                                lead: '',
                                imageId: '',
                                chapitaStyle: '',
                                chapita: 'chapita 1',
                                video: '',
                                html:
                                    '<iframe width="560" height="250" src="https://www.youtube.com/embed/IOSVORAZnRY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                                hideImage: false
                            },
                            displayProperties: {},
                            localEdits: {},
                            variants: {}
                        }
                    }
                ]
            },
            {
                collection: 'chains',
                type: 'Ln_Caja_Manual',
                props: {
                    collection: 'chains',
                    type: 'Ln_Caja_Manual',
                    id: 'c0fCdBNjvrxb3sF',
                    name: 'home---apertura-1',
                    customFields: {
                        layout: 'focalLeft3',
                        initialPosition: 1,
                        hideTitle: true,
                        pbInternal_cloneId: 'c0fCdBNjvrxb3sF',
                        hideCaja: false,
                        imageId: 'D5BZF3XZ7JDUNJZWGSNJWHIHJQ'
                    },
                    displayProperties: {}
                },
                children: [
                    {
                        collection: 'features',
                        type: 'LN-common/articulo',
                        props: {
                            collection: 'features',
                            type: 'LN-common/articulo',
                            id: 'f0faKOjixQPZ4i9',
                            name: null,
                            contentConfig: {
                                contentService: '',
                                contentConfigValues: {},
                                inherit: true
                            },
                            customFields: {
                                noteId: 'SUW6AQPARNCGLBDM2YOUGGC474',
                                lead: '',
                                imageId: '',
                                chapitaStyle: '',
                                chapita: 'chapita 1',
                                video: '',
                                html: '',
                                hideImage: false,
                                opinion: false,
                                hideDescription: false
                            },
                            displayProperties: {},
                            localEdits: {},
                            variants: {}
                        }
                    },
                    {
                        collection: 'features',
                        type: 'LN-common/articulo',
                        props: {
                            collection: 'features',
                            type: 'LN-common/articulo',
                            id: 'f0fasKhOPYdR2wW',
                            name: null,
                            contentConfig: {
                                contentService: '',
                                contentConfigValues: {},
                                inherit: true
                            },
                            customFields: {
                                noteId: 'BBU3ZCWFBRALRO4FZAHJ5XGW74',
                                lead: ' ',
                                description: 'nada',
                                chapita: 'chapita',
                                chapitaStyle: 'a-fondo',
                                imageId: '',
                                title: '',
                                video: '',
                                pbInternal_cloneId: 'f0fasKhOPYdR2wW'
                            },
                            displayProperties: {},
                            localEdits: {},
                            variants: {}
                        }
                    }
                ]
            }
        ];
        const firstElement = initialElementInPB(renderables);
        const { type } = firstElement;
        const shouldBeEager = featuresValidator[type]({
            element: firstElement,
            checkEager: true,
            note: 'YKFWJP34VFGSFOJZJZXAKZ5IHE'
        });

        test('First element should be bomba feature', () => {
            expect(firstElement).toStrictEqual({
                collection: 'features',
                type: 'LN-common/bomba',
                props: {
                    collection: 'features',
                    type: 'LN-common/bomba',
                    id: 'f0fcLtIhSP7E7tK',
                    name: null,
                    contentConfig: {
                        contentService: '',
                        contentConfigValues: {},
                        inherit: true
                    },
                    customFields: {
                        chapita: '',
                        authors: '',
                        lead: 'QATAR 2022. ',
                        title: 'Arranca el Mundial',
                        noteId: 'YKFWJP34VFGSFOJZJZXAKZ5IHE',
                        imageId: 'LO6KMEFWNFF3JCALSTGPHVUNQM',
                        hideFeature: false,
                        hideImage: false,
                        description:
                            'Se están realizando movilizaciones en 22 provincias del país para reclamar al Gobierno la generación de puestos de trabajo y asistencia a los comedores; el Movimiento Evita y Barrios de Pie suspendieron la marcha de apoyo a Alberto Fernández',
                        hideDescription: false,
                        chapitaStyle: '',
                        video: '',
                        html: ''
                    },
                    displayProperties: {},
                    localEdits: {},
                    variants: {}
                }
            });
        });
        test('The note with the same id in feature bomba should be eager load', () => {
            expect(shouldBeEager).toBe(true);
        });
        test('When feature has video instead image eagerLoad should be false', () => {
            const bomba = {
                collection: 'features',
                type: 'LN-common/bomba',
                props: {
                    collection: 'features',
                    type: 'LN-common/bomba',
                    id: 'f0fcLtIhSP7E7tK',
                    name: null,
                    customFields: {
                        chapita: '',
                        authors: '',
                        lead: 'QATAR 2022. ',
                        title: 'Arranca el Mundial',
                        noteId: 'YKFWJP34VFGSFOJZJZXAKZ5IHE',
                        imageId: 'LO6KMEFWNFF3JCALSTGPHVUNQM',
                        hideFeature: false,
                        hideImage: false,
                        description:
                            'Se están realizando movilizaciones en 22 provincias del país para reclamar al Gobierno la generación de puestos de trabajo y asistencia a los comedores; el Movimiento Evita y Barrios de Pie suspendieron la marcha de apoyo a Alberto Fernández',
                        hideDescription: false,
                        chapitaStyle: '',
                        video: 'ASJFOSDF0SDF79083W4WLDSF',
                        html: ''
                    }
                }
            };
            const loadEager = featuresValidator[type]({
                element: bomba,
                checkEager: true,
                note: 'YKFWJP34VFGSFOJZJZXAKZ5IHE'
            });
            expect(loadEager).toBe(false);
        });
        test('When first feature is cajaManual, only eager load when the note is in the first position of children', () => {
            const caja = {
                collection: 'chains',
                type: 'Ln_Caja_Manual',
                props: {
                    collection: 'chains',
                    type: 'Ln_Caja_Manual',
                    id: 'c0fCdBNjvrxb3sF',
                    name: 'home---apertura-1',
                    customFields: {
                        layout: 'focalLeft3',
                        initialPosition: 1,
                        hideTitle: true,
                        pbInternal_cloneId: 'c0fCdBNjvrxb3sF',
                        hideCaja: false,
                        imageId: 'D5BZF3XZ7JDUNJZWGSNJWHIHJQ'
                    },
                    displayProperties: {}
                },
                children: [
                    {
                        collection: 'features',
                        type: 'LN-common/articulo',
                        props: {
                            collection: 'features',
                            type: 'LN-common/articulo',
                            id: 'f0faKOjixQPZ4i9',
                            name: null,
                            contentConfig: {
                                contentService: '',
                                contentConfigValues: {},
                                inherit: true
                            },
                            customFields: {
                                noteId: 'SUW6AQPARNCGLDKI2YOUGGC567',
                                lead: '',
                                imageId: '',
                                chapitaStyle: '',
                                chapita: 'chapita 1',
                                video: '',
                                html: '',
                                hideImage: false,
                                opinion: false,
                                hideDescription: false
                            },
                            displayProperties: {},
                            localEdits: {},
                            variants: {}
                        }
                    },
                    {
                        collection: 'features',
                        type: 'LN-common/articulo',
                        props: {
                            collection: 'features',
                            type: 'LN-common/articulo',
                            id: 'f0faKOjixQPZ4i9',
                            name: null,
                            contentConfig: {
                                contentService: '',
                                contentConfigValues: {},
                                inherit: true
                            },
                            customFields: {
                                noteId: 'SUW6AQPARNCGLBDM2YOUGGC474',
                                lead: '',
                                imageId: '',
                                chapitaStyle: '',
                                chapita: 'chapita 1',
                                video: '',
                                html: '',
                                hideImage: false,
                                opinion: false,
                                hideDescription: false
                            },
                            displayProperties: {},
                            localEdits: {},
                            variants: {}
                        }
                    }
                ]
            };
            const loadEager = featuresValidator[type]({
                element: caja,
                checkEager: true,
                note: 'SUW6AQPARNCGLBDM2YOUGGC474'
            });

            expect(loadEager).toBe(false);
        });
    });
});
