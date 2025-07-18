import CajaJuegosV2 from '../../../../components/chains/LN10_Caja_Juegos_v2/json';

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});

describe('components - chains - LN10_Caja_Juegos_v2 - json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn');
        console.warn.mockImplementation(() => null);
    });
    const propsChain = {};
    propsChain.layout = 'LN10-Home_Main';
    propsChain.customFields = {
        logoId: '7OL6T4A565GY5J7G4ATJONVPJU',
        link: 'https://www.lanacion.com.ar/juegos/',
        title: 'Ln Juegos',
        hideTitle: false,
        navigator: '',
        buttonLogo: '',
        buttonText: '',
        linkButton: '',
        buttonStyle: 'generic',
        layout: 'fourVertical',
        hideCaja: null
    };
    propsChain.children = [
        {
            closed: 'NO',
            id: '/juegos/nexos',
            badge: 'NUEVO'
        },
        {
            closed: 'NO',
            id: '/juegos/panal-de-letras',
            badge: null
        },
        {
            closed: 'NO',
            id: '/juegos/palabra-oculta',
            badge: null
        },
        {
            closed: 'NO',
            id: '/juegos/memograma',
            badge: null
        },
        {
            closed: 'NO',
            id: '/juegos/crucigrama',
            badge: null
        },
        {
            closed: 'NO',
            id: '/juegos/diferencias',
            badge: null
        }
    ];

    test('The diagramation fourVertical must allow for rendering all the games that are loaded in the chain.', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        props.customFields = customFields;

        const chain = new CajaJuegosV2(props);
        const resultCajaJuegos = chain.render();
        expect(resultCajaJuegos.information.layout).toBe('fourVertical');
        expect(resultCajaJuegos.items.length).toBe(6);
    });

    test('It should return 5 items because the layout is LN-acumulado and diagramation is oneLargeFourSmall', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        props.customFields = { ...customFields, layout: 'oneLargeFourSmall' };
        props.layout = 'LN-acumulado';

        const chain = new CajaJuegosV2(props);
        const resultCajaJuegos = chain.render();

        expect(resultCajaJuegos.information.layout).toBe('oneLargeFourSmall');
        expect(resultCajaJuegos.items.length).toBe(5);
    });

    test('LN10 Caja Juegos v2 when hideCaja is null', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        customFields.hideCaja = null;
        props.customFields = customFields;

        const resultChain = new CajaJuegosV2(props);
        const result = resultChain.render();

        expect(result.information.hideCaja).toBe(false);
    });

    test('LN10 Caja Juegos v2 with validate Error', () => {
        const props = Object.assign({}, propsChain);
        props.layout = 'LN10-Home_Main';
        const customFields = Object.assign({}, propsChain.customFields);
        customFields.layout = 'twoHorizontal';
        props.customFields = customFields;

        const resultChain = new CajaJuegosV2(props);
        resultChain.render();

        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn.mock.calls[0][0]).toBe(
            'LN10-Home_Main - {"type":"warning","message":"Esta diagramación no está permitida en este layout"}'
        );
    });
});
