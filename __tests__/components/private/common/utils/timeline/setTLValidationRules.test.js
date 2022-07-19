import { setTLValidationRules } from '../../../../../../components/private/LN/common/utils/timeline';

describe('Private - Common - Utils - timeline - setTLValidationRules', () => {
    const globalMock = {
        articles: [
            {
                artPosition: '01',
                key: 'VOR7RYM4ORCKDIQ2LMLH6KQVVA',
                titleText:
                    'Se enojó Marcelo Gallardo: el Muñeco negó una crisis en River, destacó el bajo nivel de los árbitros y lamentó la falta de tiempo de trabajo',
                hour: {
                    key: null,
                    ref: null,
                    props: {
                        display_date: '2022-07-19T18:57:33.000Z',
                        size: '--fivexs',
                        labelEdicionImpresa: null,
                        isUltimasNoticias: false
                    },
                    _owner: null,
                    _store: {}
                },
                link:
                    '/deportes/futbol/marcelo-gallardo-conferencia-de-prensa-nid19072022/',
                articleData: {
                    _id: 'VOR7RYM4ORCKDIQ2LMLH6KQVVA',
                    content_restrictions: {
                        content_code: 'comun'
                    }
                },
                label: {}
            },
            {
                artPosition: '01',
                key: 'VOR7RYM4ORCKDIQ2LMLH6KQVVA',
                titleText:
                    'Se enojó Marcelo Gallardo: el Muñeco negó una crisis en River, destacó el bajo nivel de los árbitros y lamentó la falta de tiempo de trabajo',
                hour: {
                    key: null,
                    ref: null,
                    props: {
                        display_date: '2022-07-19T18:57:33.000Z',
                        size: '--fivexs',
                        labelEdicionImpresa: null,
                        isUltimasNoticias: false
                    },
                    _owner: null,
                    _store: {}
                },
                link:
                    '/deportes/futbol/marcelo-gallardo-conferencia-de-prensa-nid19072022/',
                articleData: {
                    _id: 'VOR7RYM4ORCKDIQ2LMLH6KQVVA',
                    content_restrictions: {
                        content_code: 'comun'
                    }
                },
                label: {}
            },
            {
                artPosition: '01',
                key: 'VOR7RYM4ORCKDIQ2LMLH6KQVVA',
                titleText:
                    'Se enojó Marcelo Gallardo: el Muñeco negó una crisis en River, destacó el bajo nivel de los árbitros y lamentó la falta de tiempo de trabajo',
                hour: {
                    key: null,
                    ref: null,
                    props: {
                        display_date: '2022-07-19T18:57:33.000Z',
                        size: '--fivexs',
                        labelEdicionImpresa: null,
                        isUltimasNoticias: false
                    },
                    _owner: null,
                    _store: {}
                },
                link:
                    '/deportes/futbol/marcelo-gallardo-conferencia-de-prensa-nid19072022/',
                articleData: {
                    _id: 'VOR7RYM4ORCKDIQ2LMLH6KQVVA',
                    content_restrictions: {
                        content_code: 'comun'
                    }
                },
                label: {}
            },
            {
                artPosition: '01',
                key: 'VOR7RYM4ORCKDIQ2LMLH6KQVVA',
                titleText:
                    'Se enojó Marcelo Gallardo: el Muñeco negó una crisis en River, destacó el bajo nivel de los árbitros y lamentó la falta de tiempo de trabajo',
                hour: {
                    key: null,
                    ref: null,
                    props: {
                        display_date: '2022-07-19T18:57:33.000Z',
                        size: '--fivexs',
                        labelEdicionImpresa: null,
                        isUltimasNoticias: false
                    },
                    _owner: null,
                    _store: {}
                },
                link:
                    '/deportes/futbol/marcelo-gallardo-conferencia-de-prensa-nid19072022/',
                articleData: {
                    _id: 'VOR7RYM4ORCKDIQ2LMLH6KQVVA',
                    content_restrictions: {
                        content_code: 'comun'
                    }
                },
                label: {}
            }
        ],
        source: 'byLastNews',
        sections: ['/deportes', '/economia']
    };

    const verifyErrors = validations => validations.every(v => !v.validation);
    const getSpecificError = (validations, message) =>
        validations.find(v => v.message === message && v.validation);

    it('works in regular case', () => {
        const validations = setTLValidationRules(globalMock);
        const noErrors = verifyErrors(validations);

        expect(Array.isArray(validations)).toBeTruthy();
        expect(validations).toHaveLength(3);
        expect(noErrors).toBeTruthy();
    });

    it('returns warning if source is not defined', () => {
        const props = { ...globalMock, source: undefined };
        const validations = setTLValidationRules(props);
        const noErrors = verifyErrors(validations);
        const validationError = getSpecificError(
            validations,
            'Debe especificar una fuente de notas'
        );

        expect(Array.isArray(validations)).toBeTruthy();
        expect(validations).toHaveLength(3);
        expect(noErrors).toBeFalsy();
        expect(validationError).toBeTruthy();
    });

    it('returns warning if source is byTagSection but sectionTagValue is undefined', () => {
        const props = {
            ...globalMock,
            source: 'byTagSection',
            sectionTagValue: undefined
        };

        const validations = setTLValidationRules(props);
        const noErrors = verifyErrors(validations);
        const validationError = getSpecificError(
            validations,
            'Debe especificar un tag, seccíon o id de collection'
        );

        expect(Array.isArray(validations)).toBeTruthy();
        expect(validations).toHaveLength(3);
        expect(noErrors).toBeFalsy();
        expect(validationError).toBeTruthy();
    });

    it('returns warning if source is byCollection but collectionId is undefined', () => {
        const props = {
            ...globalMock,
            source: 'byCollection',
            collectionId: undefined
        };

        const validations = setTLValidationRules(props);
        const noErrors = verifyErrors(validations);
        const validationError = getSpecificError(
            validations,
            'Debe especificar un tag, seccíon o id de collection'
        );

        expect(Array.isArray(validations)).toBeTruthy();
        expect(validations).toHaveLength(3);
        expect(noErrors).toBeFalsy();
        expect(validationError).toBeTruthy();
    });

    it('returns warning if articles is undefined', () => {
        const props = {
            ...globalMock,
            articles: undefined
        };

        const validations = setTLValidationRules(props);
        const noErrors = verifyErrors(validations);
        const validationError = getSpecificError(
            validations,
            'No se encontraron notas'
        );

        expect(Array.isArray(validations)).toBeTruthy();
        expect(validations).toHaveLength(3);
        expect(noErrors).toBeFalsy();
        expect(validationError).toBeTruthy();
    });

    it('returns warning if source is byLastNews but sections is undefined', () => {
        const props = {
            ...globalMock,
            source: 'byLastNews',
            sections: undefined
        };

        const validations = setTLValidationRules(props);
        const noErrors = verifyErrors(validations);
        const validationError = getSpecificError(
            validations,
            'Debe especificar un tag, seccíon o id de collection'
        );

        expect(Array.isArray(validations)).toBeTruthy();
        expect(validations).toHaveLength(3);
        expect(noErrors).toBeFalsy();
        expect(validationError).toBeTruthy();
    });
});
