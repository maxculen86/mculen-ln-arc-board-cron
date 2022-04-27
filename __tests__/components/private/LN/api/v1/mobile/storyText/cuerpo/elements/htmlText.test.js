import htmlText from '../../../../../../../../../../components/private/LN/api/v1/mobile/storyText/cuerpo/elements/htmlText';

describe('components - private - LN - api - v1 - mobile - storyText - cuerpo - elements - htmlText', () => {
    it('Test Ok', () => {
        const itemText =
            'Subtitulo 1 <mark class="hl_blue"><i><b>Tipo de letra negrita con cursiva y subrayado de color</b></i></mark>';

        const resp = htmlText(itemText);
        expect(resp).toEqual(
            'Subtitulo 1 Tipo de letra negrita con cursiva y subrayado de color'
        );
    });

    it('Test para validar si el elemento es null', () => {
        const resp = htmlText(null);
        expect(resp).toEqual(null);
    });

    it('No contiene caracteres &nbsp', () => {
        const itemText =
            'Subtitulo 1 <mark class="hl_blue"><i><b>&nbsp;Tipo de letra negrita con cursiva y subrayado de color&nbsp;</b></i></mark>';
        const resp = htmlText(itemText);

        expect(resp).not.toContain(/&nbsp/);
    });

    it('No contiene caracteres &nbsp', () => {
        const itemText =
            'Subtitulo 1<mark class="hl_blue"><i><b>&nbsp;Tipo de letra negrita con cursiva y subrayado de color&nbsp;</b></i></mark>';
        const resp = htmlText(itemText);

        expect(resp).toEqual(
            'Subtitulo 1 Tipo de letra negrita con cursiva y subrayado de color '
        );
    });
});
