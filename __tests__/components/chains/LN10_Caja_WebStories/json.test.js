import GetCajaManual from '../../../../components/private/LN/api/global/components/chains/LN10/getCajaManual';
import CajaWebStories from '../../../../components/chains/LN10_Caja_WebStories/json';
import LN10CajaManual from '../../../../components/chains/LN10_Caja_Manual/json';
import renderables from '../../../../__mocks__/data/LN10_Caja_WebStories/renderables.json';
import renderablesError from '../../../../__mocks__/data/LN10_Caja_WebStories/renderablesError.json';
import childrenProps from '../../../../__mocks__/data/LN10_Caja_WebStories/renderables.json';

jest.mock('fusion:consumer', component => {
    return function(component) {
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

describe('components - chains - LN10_Caja_WebStories - json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn');
        console.warn.mockImplementation(() => null);
    });

    const propsChain = {
        id: 'c0fod8IMHIJV4mB',
        typeChain: 'webstories',
        customFields: {},
        children: childrenProps,
        renderables: renderables
    };

    test('LN10 Caja webstory OK', () => {
        const props = { ...propsChain };
        const customFields = { ...propsChain.customFields };
        customFields.imageId = 'AAAAAABBBBBB';
        props.customFields = customFields;

        // Mock fetchContent in exteded class
        const getCajaManual = Object.getPrototypeOf(LN10CajaManual.prototype);
        getCajaManual.fetchContent = jest.fn();
        const cajaManual = LN10CajaManual;
        cajaManual.prototype.prototype = getCajaManual;

        const resultChain = new CajaWebStories(props);

        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaWebStory = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaWebStory.information).toMatchObject({
            typeChain: 'webstories'
        });
    });

    test('LN10 Caja webstory when children is invalid', () => {
        const props = { ...propsChain };
        props.children = null;
        const resultChain = new CajaWebStories(props);
        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const result = resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(result).toBeNull();
    });

    test('LN10 Caja webstory when hideCaja is null', () => {
        const props = { ...propsChain };

        const customFields = { ...propsChain.customFields };
        customFields.hideCaja = null;
        props.customFields = customFields;

        const resultChain = new CajaWebStories(props);
        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const result = resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(result.information.hideCaja).toBeNull();
    });

    test('LN10 Caja webstory with validate Error', () => {
        const props = { ...propsChain };

        props.renderables = renderablesError;
        const customFields = { ...propsChain.customFields };
        customFields.layout = 'error';
        props.customFields = customFields;

        const resultChain = new CajaWebStories(props);

        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn.mock.calls[0][0]).toBe(
            'error - {"type":"warning","message":"Se necesitan al menos 4 webstorys"}'
        );
    });

    test('LN10 Caja webstory when throw Error', () => {
        const props = { ...propsChain };
        props.flagError = 'error';
        const resultChain = new CajaWebStories(null);
        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const result = resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(result.Message).toBe(
            "Cannot read properties of null (reading 'children')"
        );
        expect(result.Success).toBe(false);
    });
});
