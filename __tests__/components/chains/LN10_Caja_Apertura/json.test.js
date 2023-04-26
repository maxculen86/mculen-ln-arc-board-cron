import GetCajaManual from '../../../../components/private/LN/api/global/components/chains/LN10/getCajaManual';
import LN10CajaApertura from '../../../../components/chains/LN10_Caja_Apertura/json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock('../../../../components/chains/utils/getChildrenBySection.js', () => {
    return {
        __esModule: true,
        default: params => {
            if (!params) {
                return null;
            }
            return params.renderables;
        }
    };
});

jest.mock(
    '../../../../components/private/LN/api/global/components/common/utils/_helpers.js',
    () => {
        return {
            __esModule: true,
            validateChildrensApi: children => {
                if (!children) {
                    return null;
                }
                return children;
            }
        };
    }
);

jest.mock(
    '../../../../components/chains/LN10_Caja_Apertura/common/_helper-WebApi.js',
    () => {
        return {
            __esModule: true,
            validateChain: (childrenRenders, layout, isInOpening) => {
                if (layout === 'error') {
                    return { message: 'error lalala' };
                }
                return null;
            }
        };
    }
);

jest.mock(
    '../../../../components/private/LN/api/global/components/chains/LN10/getCajaManual',
    () => {
        return {
            __esModule: true,
            default: (props, typeChain) => {
                return this;
            }
        };
    }
);

describe('components - chains - LN10_Caja_Apertura - json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn');
        console.warn.mockImplementation(() => null);
    });
    const propsChain = {};
    propsChain.id = '1';
    propsChain.customFields = {
        layout: 'bn_1_3_grid',
        initialPosition: 1,
        hideTitle: false,
        hideCaja: false,
        title: 'Tensión política',
        url: 'https://www.lanacion.com.ar/ultimas-noticias/',
        pbInternal_cloneId: 'c0fUbCAOj3bz5Bd',
        idCollection: 'LJSSBABHGJGGDLLAOOGFOFXXIY',
        typeChain: null,
        nameChain: 'LN10_Caja_Manual',
        idRender: 'c0fw64w2jaz0cQV'
    };
    propsChain.children = [1, 2, 3];
    propsChain.renderables = [
        {
            props: {
                id: '1'
            },
            children: [1, 2, 3]
        },
        {
            props: {
                id: '2'
            },
            children: [1, 2, 3]
        },
        {
            props: {
                id: '3'
            },
            children: [1, 2, 3]
        },
        {
            props: {
                id: '4'
            },
            children: [1, 2, 3]
        }
    ];

    test('LN10 Caja Apertura OK', () => {
        const props = Object.assign({}, propsChain);

        const cajaApertura = LN10CajaApertura;
        const resultChain = new cajaApertura(props);
        resultChain.renderResponse = jest.fn().mockImplementation(props => {
            return {
                information: { ...props.customFields },
                articles: []
            };
        });
        resultChain.props = props;
        resultChain.state = {};

        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaApertura = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(Object.keys(resultCajaApertura).sort()).toEqual(
            ['articles', 'information'].sort()
        );
    });

    test('LN10 Caja Apertura when children is null', () => {
        const props = Object.assign({}, propsChain);
        props.children = null;
        const cajaApertura = LN10CajaApertura;
        const resultChain = new cajaApertura(props);
        resultChain.renderResponse = jest.fn().mockImplementation(props => {
            return {
                information: { ...props.customFields },
                articles: []
            };
        });
        resultChain.props = props;
        resultChain.state = {};

        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaApertura = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaApertura).toBeNull();
    });

    test('LN10 Caja Apertura when validate is Error', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        customFields.layout = 'error';
        props.customFields = customFields;

        const cajaApertura = LN10CajaApertura;
        const resultChain = new cajaApertura(props);
        resultChain.renderResponse = jest.fn().mockImplementation(props => {
            return {
                information: { ...props.customFields },
                articles: []
            };
        });
        resultChain.props = props;
        resultChain.state = {};

        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaApertura = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaApertura).toBeNull();
    });

    test('LN10 Caja Manual when hideCaja is null', () => {
        const props = Object.assign({}, propsChain);

        const customFields = Object.assign({}, propsChain.customFields);
        customFields.hideCaja = null;
        props.customFields = customFields;

        const cajaApertura = LN10CajaApertura;
        const resultChain = new cajaApertura(props);
        resultChain.renderResponse = jest.fn().mockImplementation(props => {
            return {
                information: { ...props.customFields },
                articles: []
            };
        });
        resultChain.props = props;
        resultChain.state = {};

        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaApertura = resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaApertura.information.hideCaja).toBe(false);
    });
    test('LN10 Caja Apertura when throw Error', () => {
        const props = Object.assign({}, propsChain);

        const cajaApertura = LN10CajaApertura;
        const resultChain = new cajaApertura(props);
        resultChain.renderResponse = jest.fn().mockImplementation(props => {
            throw new Error('Error');
        });
        resultChain.props = props;
        resultChain.state = {};

        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaApertura = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaApertura.Message).toBe('Error');
        expect(resultCajaApertura.Success).toBe(false);
    });
});
