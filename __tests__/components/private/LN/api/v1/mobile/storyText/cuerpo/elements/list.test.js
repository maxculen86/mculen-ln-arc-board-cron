import list from '../../../../../../../../../../components/private/LN/api/v1/mobile/storyText/cuerpo/elements/list.js';

describe('components - private - LN - api - v1 - mobile - storyText - cuerpo - elements - list', () => {
    it('Test Ok', () => {
        const itemList = {
            _id: 'KQXLNRRS2RBYRBFK6IE6VRJX2Y',
            type: 'list',
            list_type: 'unordered',
            additional_properties: { comments: [], inline_comments: [] },
            items: [
                {
                    _id: 'XFMPUNKJQBAHJFBQ52YXQHAC5Q',
                    content: 'Tipo de letra normal',
                    type: 'text'
                },
                {
                    _id: '2IIXVZXDLNEKNLV4OT6PT6PTXA',
                    content: '<b>Tipo de letra negrita</b>',
                    type: 'text'
                },
                {
                    _id: 'KK2QJUJYA5ECNL2XD7QVNF6DZU',
                    content: '<i><b>Tipo de letra negrita y cursiva</b></i>',
                    type: 'text'
                },
                {
                    _id: 'O4PHRRFCINAEJOQ3V7C7DQD4V4',
                    content:
                        '<a href="https://www.lanacion.com.ar/deportes/la-tentacion-de-no-ser-ejemplo-nid112000/" target="_blank">Link </a>en lista ordenada',
                    type: 'text'
                },
                {
                    _id: 'TA7WGYOB2FFQHOED5FEBHZQZTA',
                    content:
                        '<a href="https://www.lanacion.com.ar/politica/mauricio-macri-viaja-europa-junto-su-familia-nid2408396" target="_blank">Link </a>en negrita',
                    type: 'text'
                }
            ]
        };
        const resp = list(itemList);
        expect(resp).toEqual(
            'Tipo de letra normal\nTipo de letra negrita\nTipo de letra negrita y cursiva\nLink en lista ordenada\nLink en negrita'
        );
    });

    it('Test para validar si el elemento es vacio', () => {
        const itemList = {
            _id: 'KQXLNRRS2RBYRBFK6IE6VRJX2Y',
            type: 'list',
            list_type: 'unordered',
            additional_properties: { comments: [], inline_comments: [] },
            items: []
        };
        const resp = list(itemList);
        expect(resp).toEqual(null);
    });
    it('Test para validar si el elemento es null', () => {
        const resp = list(null);
        expect(resp).toEqual(null);
    });
});
