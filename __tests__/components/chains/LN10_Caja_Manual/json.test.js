import GetCajaManual from '../../../../components/private/LN/api/global/components/chains/LN10/getCajaManual';
import LN10CajaManual from '../../../../components/chains/LN10_Caja_Manual/json';

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});

jest.mock(
    '../../../../components/private/LN/api/global/components/common/utils/_helpers.js',
    () => {
        return {
            __esModule: true,
            default: children => {
                if (!children) {
                    return null;
                }
                return children;
            },
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
    '../../../../components/private/LN/api/global/components/chains/common/respChildrens/index',
    () => {
        return {
            __esModule: true,
            default: (props, containerImage) => {
                if (props.flagError === 'error') {
                    throw new Error('Error');
                }
                return {
                    information: { ...props.customFields },
                    articles: []
                };
            }
        };
    }
);

jest.mock(
    '../../../../components/private/LN/api/global/components/chains/common/props/validatePropsChains.js',
    () => {
        return {
            __esModule: true,
            validatePropsChains: (props, typeChain, version) => {
                return props;
            }
        };
    }
);

describe('components - chains - LN10_Caja_Manual - json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn');
        console.warn.mockImplementation(() => null);
    });
    const propsChain = {};
    propsChain.id = 1;
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
                id: 1
            },
            children: [
                { collection: 'features', type: 'LN-10/article', props: {} },
                { collection: 'features', type: 'LN-10/article', props: {} },
                { collection: 'features', type: 'LN-10/article', props: {} },
                { collection: 'features', type: 'LN-10/article', props: {} },
                { collection: 'features', type: 'LN-10/article', props: {} }
            ]
        },
        {
            props: {
                id: 2
            },
            children: [1, 2, 3, 4]
        }
    ];

    it('LN10 Caja Manual OK', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        customFields.imageId = 'AAAAAABBBBBB';
        props.customFields = customFields;

        const getCajaManual = Object.getPrototypeOf(LN10CajaManual.prototype);
        getCajaManual.fetchContent = jest.fn();
        const cajaManual = LN10CajaManual;
        cajaManual.prototype.prototype = getCajaManual;
        const resultChain = new cajaManual(props);

        resultChain.state.containerImage = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaManual = resultChain.render();

        const resultGetCajaManual = getCajaManual.render();
        console.log(resultCajaManual);
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'state'].sort()
        );
        expect(resultCajaManual.information).toMatchObject({
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
        });
        expect(resultGetCajaManual).toBeNull();
    });

    it('LN10 Caja Manual when children is invalid', () => {
        const props = Object.assign({}, propsChain);
        props.children = null;
        const resultChain = new LN10CajaManual(props);
        resultChain.state.containerImage = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const result = resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'state'].sort()
        );
        expect(result).toBeNull();
    });

    it('LN10 Caja Manual when hideCaja is null', () => {
        const props = Object.assign({}, propsChain);

        const customFields = Object.assign({}, propsChain.customFields);
        customFields.hideCaja = null;
        props.customFields = customFields;

        const resultChain = new LN10CajaManual(props);
        resultChain.state.containerImage = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const result = resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'state'].sort()
        );
        expect(result.information.hideCaja).toBe(false);
    });
    it('LN10 Caja Manual with validate Error', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        customFields.layout = 'bnFondo';
        props.customFields = customFields;

        const resultChain = new LN10CajaManual(props);
        resultChain.state.containerImage = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'state'].sort()
        );
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn.mock.calls[0][0]).toBe(
            'bnFondo - {"type":"warning","message":"El estilo de caja seleccionado no corresponde para esta diagramación"}'
        );
    });

    it('LN10 Caja Manual when throw Error', () => {
        const props = Object.assign({}, propsChain);
        props.flagError = 'error';
        const resultChain = new LN10CajaManual(props);
        resultChain.state.containerImage = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const result = resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'state'].sort()
        );
        expect(result.Message).toBe('Error');
        expect(result.Success).toBe(false);
    });

    it('Test result LN10 Caja Manual with diagramacion = BnFondo should return right data', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        customFields.imageId = 'AAAAAABBBBBB';
        customFields.layout = 'bnFondo';
        customFields.chainStyle = 'red';
        props.customFields = customFields;

        const getCajaManual = Object.getPrototypeOf(LN10CajaManual.prototype);
        getCajaManual.fetchContent = jest.fn();
        const cajaManual = LN10CajaManual;
        cajaManual.prototype.prototype = getCajaManual;
        const resultChain = new cajaManual(props);

        resultChain.state.containerImage = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaManual = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'state'].sort()
        );
        expect(resultCajaManual.information).toMatchObject({
            layout: 'bnFondo',
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
        });
    });

    it('Test result LN10 Caja Manual with diagramacion = bn_player_horizontal should return right data', () => {
        const props = Object.assign({}, propsChain);
        const customFields = Object.assign({}, propsChain.customFields);
        customFields.layout = 'bn_player_horizontal';
        props.customFields = customFields;
        props.renderables = [
            {
                props: {
                    id: 1,
                    customFields: {
                        layout: 'bn_player_horizontal'
                    }
                },
                children: [
                    {
                        collection: 'features',
                        type: 'LN-10/videoPlayerNota',
                        props: {}
                    }
                ]
            }
        ];

        const getCajaManual = Object.getPrototypeOf(LN10CajaManual.prototype);
        getCajaManual.fetchContent = jest.fn();
        const cajaManual = LN10CajaManual;
        cajaManual.prototype.prototype = getCajaManual;
        const resultChain = new cajaManual(props);

        resultChain.state.containerImage = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaManual = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'state'].sort()
        );
        expect(resultCajaManual.information).toMatchObject({
            layout: 'bn_player_horizontal',
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
        });
    });
});
