import GetCajaManual from '../../../../components/private/LN/api/global/components/chains/LN10/getCajaManual';
import * as LN10CajaManual from '../../../../components/chains/LN10_Caja_Manual/json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        const newComponent = component;
        newComponent.fetchContent = { c: 'lalala' };
        return newComponent;
    };
});
/*
jest.mock('fusion:consumer', component => {
    return function(component) {
        class element extends component {
            constructor(props) {
                super(props);
                this.props = props;
            }
            fetchContent(param) {
                return {};
            }
        }
    };
});
*/
/* class MockLN10CajaManual extends LN10CajaManual {
    constructor(props) {
        super(props);
    }
}
 */

jest.mock(
    '../../../../components/private/LN/api/global/components/common/utils/_helpers.js',
    () => {
        return {
            __esModule: true,
            default: children => {
                console.log(children);
                if (!children) {
                    return null;
                }
                return [{ a: 1 }, { b: 2 }];
            }
        };
    }
);

jest.mock(
    '../../../../components/chains/LN10_Caja_Manual/common/_helper-WebApi.js',
    () => {
        return {
            __esModule: true,
            default: (layout, childProps = []) => {
                console.log(layout);
                if (layout === 'error') {
                    return { message: 'error lalala' };
                }
                return null;
            }
        };
    }
);

/* jest.mock(
    '../../../../components/private/LN/api/global/components/chains/LN10/getCajaManual',
    () => {
        return {
            __esModule: true,
            default: (props, typeChain) => {
                return {};
            }
        };
    }
);
 */
describe('components - chains - LN10_Caja_Manual - json', () => {
    const propsChain = {};
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
    /*     test('LN10 Caja Manual OK', () => {
        const props = Object.assign({}, propsChain);
        const resultChain = new LN10CajaManual.default(props);
        resultChain.validate(props);
        expect(Object.keys(resultChain).sort()).toEqual(['validate'].sort());
    }); */

    test('LN10 Caja Manual with validate Error', () => {
        const props = Object.assign({}, propsChain);
        props.layout = 'error';
        console.log(LN10CajaManual);
        const resultChain = new LN10CajaManual.default(props);
        resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
    });
});
