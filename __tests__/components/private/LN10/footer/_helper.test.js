import commonPropsFooter from '../../../../../components/private/LN10/footer/_helper';

describe('Tests function commonPropsFooter', () => {
    const dinamycParameters = ['Economia', 'https://lanacion.com.ar/economia/'];
    test('Should return an object with the specified parameters. (href and text)', () => {
        expect(
            commonPropsFooter('Economia', 'https://lanacion.com.ar/economia/')
        ).toStrictEqual({
            href: 'https://lanacion.com.ar/economia/',
            text: 'Economia'
        });
    });

    test('It should return an empty object when the parameters are not defined.', () => {
        expect(commonPropsFooter(undefined)).toStrictEqual({});
    });
});
