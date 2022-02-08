import {
    selectRule,
    bodyRules
} from '../../../../../../components/features/LN-nota/body/_utils/_bodyRules';

import NotaNoticia from '../../../../../../__mocks__/data/articles/6Q4WDU7YVJBEZEOLSQEIK3YCYI.json';
import NotaFoto100 from '../../../../../../__mocks__/data/articles/IGR6WQGQDNHALH6PL4GAYBKYZM.json';
import NotaEmbeds from '../../../../../../__mocks__/data/articles/OFVVZI3B7VA5PDPISOSILJ42LM.json';

const defaultRule = jest.fn();
describe('_utils/_bodyRules.js', () => {
    describe('when globalSubtype', () => {
        it('is FOTOAL100 (8) return defaultFtotoAl100 Function in selectRule', () => {
            const attr = {
                globalSubtype: '8',
                outputType: 'default',
                typeElement: 'text'
            };

            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.defaultFotoAl100);
        });
        it('is not FOTOAL100, type Text return defaultRule Function in selectRule', () => {
            const attr = {
                globalSubtype: '',
                outputType: 'default',
                typeElement: 'text'
            };

            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.defaultRule);
        });
    });

    describe('Cuando es nota al 100 y elementos prohibidos', () => {
        it('debe retornar FALSE cuando typeElement = oembed_response', () => {
            const attr = {
                typeElement: 'raw_html',
                componentElement: { arcType: 'text' }
            };
            expect(bodyRules.defaultFotoAl100(attr)).toEqual(2);
        });
    });
});
