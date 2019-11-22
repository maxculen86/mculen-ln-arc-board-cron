import Browser from '../../../../../components/private/common/utils/browser';

describe('Common - Browser Utils - GetParameterFromUrl en servidor', () => {
    const url =
        'http://localhost/pf/api/v1/notas/?_website=la-nacion-ar&param1=&outputType=json&section=/recetas&size=10&page=1';

    test('Obtengo parametro buscado', () => {
        const result = Browser.getParameterByName('size', url);
        const result1 = Browser.getParameterByName('page', url);

        expect(result).toBe('10');
        expect(result1).toBe('1');
    });

    test('Pido un valor que no esta', () => {
        const result = Browser.getParameterByName('paramFalso', url);

        expect(result).toBe(null);
    });

    test('Pido un valor que no esta seteado', () => {
        const result = Browser.getParameterByName('param1', url);

        expect(result).toBe('');
    });

    test('Pido un valor sin pasar url', () => {
        delete global.window;
        global.window = { location: { href: url } };
        expect(Browser.getParameterByName('size')).toBe('10');
    });

    test("Pido un valor sin tener 'window'", () => {
        delete global.window;
        let error = null;
        try {
            Browser.getParameterByName('size');
        } catch (e) {
            error = e;
        }

        expect(error.message).toBe('El parametro de Url es obligatorio en SSR');
    });
});
