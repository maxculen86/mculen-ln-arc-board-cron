import header from '../../../../../../../../../../components/private/LN/api/v1/mobile/storyText/cuerpo/elements/header.js';

describe('components - private - LN - api - v1 - mobile - storyText - cuerpo - elements - header', () => {
    it('Test Ok', () => {
        const itemHeader = {
            _id: 'QVFEX4OZMRBPTCS4SRPMSX7BOI',
            type: 'header',
            content: 'Subtitulo 1'
        };
        const resp = header(itemHeader);
        expect(resp).toEqual('Subtitulo 1');
    });

    it('Test para validar si el elemento es vacio', () => {
        const itemHeader = {
            _id: 'QVFEX4OZMRBPTCS4SRPMSX7BOI',
            type: 'header',
            content: ''
        };
        const resp = header(itemHeader);
        expect(resp).toEqual(null);
    });
    it('Test para validar si el elemento es null', () => {
        const resp = header(null);
        expect(resp).toEqual(null);
    });
});
