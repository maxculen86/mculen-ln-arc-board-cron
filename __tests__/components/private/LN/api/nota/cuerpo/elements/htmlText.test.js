import htmlText from '../../../../../../../../components/private/LN/api/global/v1/nota/cuerpo/elements/htmlText';

describe('Test for html render inside text component', () => {
    test('Render base text', () => {
        const text = `soy un texto con <b>negrita</b>, y con <i>italica</i>, y tambien con las <i><b>dos cosas</b></i>. Aca te va un <u>subrayado</u>, y un <a href=\"https://www.lanacion.com.ar\" target=_blank>link</a>.<br/>Arc permite poner <mark class=\"hl_red\">colores</mark> Arc tambien puede enviar codigos html tales como &amp; Tambien proceso &#38; pero no proceso &euro;`;

        const resp = htmlText(text);
        expect(resp[0]).toBe('soy un texto con ');
        expect(resp[1]['_t']).toBe('b');
        expect(resp[1]['valor']).toBe('negrita');

        expect(resp[5]['_t']).toBe('i');
        expect(resp[5]['valor']['_t']).toBe('b');
        expect(resp[5]['valor']['valor']).toBe('dos cosas');

        expect(resp[9]['_t']).toBe('a');
        expect(resp[9]['href']).toBe('https://www.lanacion.com.ar');
        expect(resp[9]['valor']).toBe('link');

        expect(resp[10]).toBe('.');
        expect(resp[11]).toBe('Arc permite poner ');
        expect(resp[12]['valor']).toBe('colores');
        expect(resp[12]['_t']).toBe('mark');
        expect(resp[13]).toBe(
            ' Arc tambien puede enviar codigos html tales como & Tambien proceso & pero no proceso &euro;'
        );
        // expect(resp[12]['color']).toBe('red');
    });
});
