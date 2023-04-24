import LN10CajaCanal from '../../../../components/chains/LN10_Caja_Canal/json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock('../../../../components/private/common/utils/get.js', () => {
    return {
        __esModule: true,
        default: (element, key, defaultValue) => {
            return [1, 2, 3, 4];
        }
    };
});

jest.mock(
    '../../../../components/chains/LN10_Caja_Collection/common/_helper-WebApi.js',
    () => {
        return {
            __esModule: true,
            validateChain: params => {
                if (params.layout === 'error') {
                    return { message: 'error lalala' };
                }
                return null;
            }
        };
    }
);

jest.mock(
    '../../../../components/private/LN/api/global/components/chains/LN10/getCajaCollection',
    () => {
        return {
            __esModule: true,
            default: (props, typeChain) => {
                return this;
            }
        };
    }
);

describe('components - chains - LN10_Caja_Canal - json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn');
        console.warn.mockImplementation(() => null);
    });
    const propsChain = {};
    propsChain.id = '1';
    propsChain.customFields = {
        layout: 'bnGrilla4',
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

    test('LN10 Caja Canal OK', () => {
        const props = Object.assign({}, propsChain);

        const cajaCanal = LN10CajaCanal;
        const resultChain = new cajaCanal(props);
        resultChain.renderResponse = jest.fn().mockImplementation(props => {
            return {
                information: { ...props.customFields },
                articles: []
            };
        });
        resultChain.props = props;
        resultChain.state = {};
        resultChain.state.articleList = {
            _id: 'AAABBBB',
            content_elements: [1, 2, 3, 4]
        };
        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaCanal = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(Object.keys(resultCajaCanal).sort()).toEqual(
            ['articles', 'information'].sort()
        );
    });

    test('LN10 Caja Canal when articleList is null', () => {
        const props = Object.assign({}, propsChain);

        const cajaCanal = LN10CajaCanal;
        const resultChain = new cajaCanal(props);
        resultChain.renderResponse = jest.fn().mockImplementation(props => {
            return {
                information: { ...props.customFields },
                articles: []
            };
        });
        resultChain.props = props;
        resultChain.state = {};
        resultChain.state.articleList = null;
        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaCanal = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaCanal).toBeNull();
    });

    test('LN10 Caja Canal when state is null', () => {
        const props = Object.assign({}, propsChain);

        const cajaCanal = LN10CajaCanal;
        const resultChain = new cajaCanal(props);
        resultChain.renderResponse = jest.fn().mockImplementation(props => {
            return {
                information: { ...props.customFields },
                articles: []
            };
        });
        resultChain.props = props;
        resultChain.state = null;
        const resultCajaCanal = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaCanal).toBeNull();
    });

    test('LN10 Caja Canal when validate is Error', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        customFields.layout = 'error';
        props.customFields = customFields;

        const cajaCanal = LN10CajaCanal;
        const resultChain = new cajaCanal(props);
        resultChain.renderResponse = jest.fn().mockImplementation(props => {
            return {
                information: { ...props.customFields },
                articles: []
            };
        });
        resultChain.props = props;
        resultChain.state = {};
        resultChain.state.articleList = {
            _id: 'AAABBBB',
            content_elements: [1, 2, 3, 4]
        };
        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaCanal = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaCanal).toBeNull();
    });

    test('LN10 Caja Canal when renderResponse throw Error', () => {
        const props = Object.assign({}, propsChain);

        const cajaCanal = LN10CajaCanal;
        const resultChain = new cajaCanal(props);
        resultChain.renderResponse = jest.fn().mockImplementation(props => {
            throw new Error('Error');
        });
        resultChain.props = props;
        resultChain.state = {};
        resultChain.state.articleList = {
            _id: 'AAABBBB',
            content_elements: [1, 2, 3, 4]
        };
        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaCanal = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaCanal.Message).toBe('Error');
        expect(resultCajaCanal.Success).toBe(false);
    });
});
