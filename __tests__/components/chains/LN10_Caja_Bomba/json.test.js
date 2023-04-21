import GetCajaManual from '../../../../components/private/LN/api/global/components/chains/LN10/getCajaManual';
import LN10CajaBomba from '../../../../components/chains/LN10_Caja_Bomba/json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock(
    '../../../../components/private/LN/common/utils/cajaTemasHelperLN10-WebApi',
    () => {
        return {
            __esModule: true,
            getChildrenFromSectionHome: (renderables, section, position) => {
                return [1, 2, 3];
            }
        };
    }
);

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
    '../../../../components/chains/LN10_Caja_Bomba/common/_helper-WebApi.js',
    () => {
        return {
            __esModule: true,
            validateChainBomba: (layout, children, isPreOpening) => {
                if (layout === 'error') {
                    return { message: 'error lalala' };
                }
                return null;
            },
            getIsPreOpening: (preOpeningChildren, chainId) => {
                return false;
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

describe('components - chains - LN10_Caja_Bomba - json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn');
        console.warn.mockImplementation(() => null);
    });
    const propsChain = {};
    propsChain.id = '1';
    propsChain.customFields = {
        layout: 'horizontal',
        initialPosition: 1,
        hideTitle: false,
        hideCaja: false,
        title: 'Tensión política',
        url: 'https://www.lanacion.com.ar/ultimas-noticias/',
        pbInternal_cloneId: 'c0fUbCAOj3bz5Bd',
        idCollection: 'LJSSBABHGJGGDLLAOOGFOFXXIY',
        typeChain: null,
        nameChain: 'LN10_Caja_Bomba',
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

    test('LN10 Caja Bomba OK', () => {
        const props = Object.assign({}, propsChain);

        const cajaBomba = LN10CajaBomba;
        const resultChain = new cajaBomba(props);
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
        const resultCajaBomba = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(Object.keys(resultCajaBomba).sort()).toEqual(
            ['articles', 'information'].sort()
        );
    });

    test('LN10 Caja Bomba when children is null', () => {
        const props = Object.assign({}, propsChain);
        props.children = null;
        const cajaBomba = LN10CajaBomba;
        const resultChain = new cajaBomba(props);
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
        const resultCajaBomba = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaBomba).toBeNull();
    });

    test('LN10 Caja Bomba when validate is Error', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        customFields.layout = 'error';
        props.customFields = customFields;

        const cajaBomba = LN10CajaBomba;
        const resultChain = new cajaBomba(props);
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
        const resultCajaBomba = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaBomba).toBeNull();
    });

    test('LN10 Caja Bomba when hideCaja is null', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        customFields.hideCaja = null;
        props.customFields = customFields;

        const cajaBomba = LN10CajaBomba;
        const resultChain = new cajaBomba(props);
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
        const resultCajaBomba = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaBomba.information.hideCaja).toBe(false);
    });

    test('LN10 Caja Bomba when throw Error', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        customFields.hideCaja = null;
        props.customFields = customFields;

        const cajaBomba = LN10CajaBomba;
        const resultChain = new cajaBomba(props);
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
        const resultCajaBomba = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaBomba.Message).toBe('Error');
        expect(resultCajaBomba.Success).toBe(false);
    });
});
