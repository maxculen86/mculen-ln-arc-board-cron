import htmlRaw from '../../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/html';
import aperturaMultimedia from '../../../../../../../../../../__mocks__/data/articles/JLMPIDPYXFH3JPLFTZNJGONPNA.json';
import basic from '../../../../../../../../../../__mocks__/data/articles/YJJ7JHAWNJFTDH2RLJ4QHUTA5A.json';

describe('Test de html en promo_items', () => {
    it('Si le envio null como nodo donde buscar', () => {
        const resp = htmlRaw(null);

        expect(resp).toBeNull();
    });

    it('Valor para apertura_multimedia', () => {
        const resp = htmlRaw(
            aperturaMultimedia.promo_items.apertura_multimedia
        );

        expect(resp).not.toBeNull();
        expect(resp).toEqual('el contenido del html');
    });

    it('Valor para basic', () => {
        const resp = htmlRaw(basic.promo_items.basic);

        expect(resp).not.toBeNull();
        expect(resp).toEqual('Solo basic');
    });
});
