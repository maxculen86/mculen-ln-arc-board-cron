import removeInvalidUrlTagA from '../../../../../components/private/common/utils/removeInvalidUrlTagA';

describe('Common - utils - removeInvalidUrlTagA.js', () => {
    describe('Content Element with url valid in <a> tag', () => {
        const contentElementValid = [
            {
                type: 'text',
                content: `texto texto <b>prueba</b>, texto texto.`
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="www.test.com">prueba</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="http://www.test.com">prueba</a> texto <a href="http://www.other.com"> texto.'
            },
            {
                type: 'text',
                content: 'texto texto <a href="test.com">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="http://test.com/asdasd/dasd">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="http://test.com/?q=dasdsad">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="www.4354test.com">algo</a> texto texto.'
            },
            {
                type: 'text',
                content:
                    'texto texto <a href="/test/hola/bye/">algo</a> texto texto.'
            }
        ];

        test('Should return content_element without modifications', () => {
            const wrapper = removeInvalidUrlTagA(contentElementValid);
            expect(wrapper).toStrictEqual(contentElementValid);
        });
    });

    describe('Should return with <!-- URL INVALIDA REMOVIDA --> ', () => {
        test('When url has space', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="http://en www.sushiclub.com.ar/nuestros_espacios">algo</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <!-- URL INVALIDA REMOVIDA -->, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url begin with number', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="435345www.test.com">algo</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <!-- URL INVALIDA REMOVIDA -->, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url with http and begin with number', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="http://435345www.dsad.com">algo</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <!-- URL INVALIDA REMOVIDA -->, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url is just a word', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="hello">algo</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <!-- URL INVALIDA REMOVIDA -->, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url has space', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="https://cas as.com">algo</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <!-- URL INVALIDA REMOVIDA -->, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When url begin with hyphen', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="-casas.com">algo</a>, texto texto.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <!-- URL INVALIDA REMOVIDA -->, texto texto.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });

        test('When is 2 url and one is invalid', () => {
            const contentElementInvalid = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="casas.com">algo</a>, texto texto <a href="casas s.com">algo</a>.`,
                    type: 'text'
                }
            ];

            const expectResul = [
                {
                    _id: 'TQEIH4634FB77AAR32FNTSDIMU',
                    content: `texto texto <a href="casas.com">algo</a>, texto texto <!-- URL INVALIDA REMOVIDA -->.`,
                    type: 'text'
                }
            ];

            const wrapper = removeInvalidUrlTagA(contentElementInvalid);
            expect(wrapper).toStrictEqual(expectResul);
        });
    });
});
