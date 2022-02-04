import {
    rules,
    bodyElementRules
} from '../../../../../../components/features/LN-nota/body/_children/_bodyElementRules';
import Consumer from 'fusion:consumer';
import contentElements from '../../../../../../__mocks__/data/nota/body/contentElements.json';
import globalContent from '../../../../../../__mocks__/data/nota/body/globalContent.json';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('_bodyElementRules', () => {
    describe('rules', () => {
        test('Cuando el type es "quote" al igual arcType return true', () => {
            const baseComponent = {
                arcType: 'quote'
            };
            expect(rules.quote({ baseComponent, _type: 'quote' })).toBeTruthy();
        });

        test('Cuando el subtype es FOTOAL100, type es "raw_html" al igual arcType return true', () => {
            const baseComponent = {
                arcType: 'raw_html'
            };
            expect(
                rules.FOTOAL100({
                    subtype: '8',
                    baseComponent,
                    _type: 'raw_html'
                })
            ).toBeTruthy();
        });
    });

    describe('bodyElementFucntion', () => {
        test('retornar 95 elementos', () => {
            const payload = contentElements.map((element, currentIndex) => {
                console.log(
                    '🚀 ~ file: _bodyElementRules.test.js. ~ line 41 ~ payload ~ element',
                    element
                );
                return bodyElementRules({
                    element,
                    outputType: 'default',
                    subtype: '1'
                });
            });
            console.log(
                '🚀 ~ file: _bodyElementRules.test.js ~ line 4666 ~ payload ~ payload',
                payload
            );

            expect(payload).toEqual(2);
        });
    });
});
