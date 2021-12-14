import text from '../../../../../../../../../../components/private/LN/api/v1/mobile/storyText/cuerpo/elements/text';

describe('components - private - LN - api - v1 - mobile - storyText - cuerpo - elements - text', () => {
    it('Test Ok', () => {
        const itemText = {
            _id: 'QVFEX4OZMRBPTCS4SRPMSX7BOI',
            type: 'text',
            content:
                'Subtitulo 1 <mark class="hl_blue"><i><b>Tipo de letra negrita con cursiva y subrayado de color</b></i></mark>'
        };
        const resp = text(itemText);
        expect(resp).toEqual(
            'Subtitulo 1 Tipo de letra negrita con cursiva y subrayado de color'
        );
    });

    it('Test para validar si el elemento es vacio', () => {
        const itemText = {
            _id: 'QVFEX4OZMRBPTCS4SRPMSX7BOI',
            type: 'text',
            content: ''
        };
        const resp = text(itemText);
        expect(resp).toEqual(null);
    });
    it('Test para validar si el elemento es null', () => {
        const resp = text(null);
        expect(resp).toEqual(null);
    });
});
