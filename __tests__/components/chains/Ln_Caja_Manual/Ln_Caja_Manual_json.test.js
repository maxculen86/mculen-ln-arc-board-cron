import * as fusionConsumer from 'fusion:consumer';
import article1 from '../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import article2 from '../../../../__mocks__/data/articles/3SHTRO3NKBCN7L3JITCDQYSJLM.json';
import article3 from '../../../../__mocks__/data/articles/3THDAILWTVHARHBYA5AEVL7OAU.json';
import * as CajaManual from '../../../../components/chains/Ln_Caja_Manual/json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

describe('components - chains - Ln_Caja_Manual - json.js', () => {
    const hideCaja = false;
    const chapita = 'Chapa Custom Field';
    const propMock = {};
    const customFields = {
        hideTitle: false,
        initialPosition: 1,
        layout: 'focalLeft3',
        title: 'Mi techo abc'
    };

    const children = [];
    children.push(article1);
    children.push(article2);
    children.push(article3);
    const props = {};
    props.arcSite = 'la-nacion-ar';
    props.requestUri = '/home/?_website=la-nacion-ar&outputType=json';
    props.customFields = customFields;
    props.children = children;

    it('Check Props', () => {
        const ChainCajaManual = new CajaManual.default(props);
        expect(Object.keys(ChainCajaManual).sort()).toEqual(['props'].sort());
        expect(ChainCajaManual.props).toMatchObject(props);
    });

    it('Render Chain', () => {
        const ChainCajaManual = new CajaManual.default(props);
        const result = ChainCajaManual.render();
        expect(Object.keys(result).sort()).toEqual(
            ['articles', 'information'].sort()
        );
        expect(result.information).toMatchObject({
            hideTitle: false,
            initialPosition: 1,
            layout: 'focalLeft3',
            title: 'Mi techo abc',
            image: undefined
        });
    });
});
