import {
    selectRule,
    bodyRules
} from '../../../../../../components/features/LN-nota/body/_utils/_bodyRules';

import NotaNoticia from '../../../../../../__mocks__/data/articles/6Q4WDU7YVJBEZEOLSQEIK3YCYI.json';
import NotaFoto100 from '../../../../../../__mocks__/data/articles/IGR6WQGQDNHALH6PL4GAYBKYZM.json';
import NotaEmbeds from '../../../../../../__mocks__/data/articles/OFVVZI3B7VA5PDPISOSILJ42LM.json';

const defaultRule = jest.fn();
describe('_utils/_bodyRules.js', () => {
    describe('cuando subtipo es FOTO AL 100', () => {
        it('is FOTOAL100 (8) return defaultFtotoAl100 Function in selectRule', () => {
            const attr = {
                subtype: '8',
                outputType: 'default',
                type: 'text'
            };

            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.defaultFotoAl100);
        });

        it('debe retornar FALSE cuando typeElement = oembed_response', () => {
            const attr = {
                type: 'raw_html',
                componentElement: { arcType: 'raw_html' }
            };
            expect(bodyRules.defaultFotoAl100(attr)).toEqual(false);
        });

        it('debe retornar FALSE cuando typeElement = video', () => {
            const attr = {
                type: 'video',
                componentElement: { arcType: 'video' }
            };
            expect(bodyRules.defaultFotoAl100(attr)).toEqual(false);
        });

        it('debe retornar FALSE cuando typeElement = oembed_response', () => {
            const attr = {
                type: 'oembed_response',
                componentElement: { arcType: 'oembed_response' }
            };
            expect(bodyRules.defaultFotoAl100(attr)).toEqual(false);
        });
    });

    describe('Cuando nota es distinto a Foto al 100', () => {
        it('es quote trae regla de quote', () => {
            const attr = {
                subtype: '',
                outputType: 'default',
                type: 'quote'
            };

            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.quote.default);
        });

        it('es raw_html trae regla de raw', () => {
            const attr = {
                subtype: '',
                outputType: 'default',
                type: 'raw_html'
            };

            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.raw_html.default);
        });

        it('es raw_html AMP trae regla de raw', () => {
            const attr = {
                subtype: '',
                outputType: 'amp',
                type: 'raw_html'
            };

            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.raw_html.amp);
        });

        it('es raw_html AMP trae regla de raw', () => {
            const attr = {
                subtype: '',
                outputType: '',
                type: 'raw_html'
            };

            const component = selectRule(attr);
            expect(component).toEqual(bodyRules.raw_html);
        });
    });
});
