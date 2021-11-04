import env from '../../../../../../../../__mocks__/fusion:environment';
import ElementButton from '../../../../../../../../../../__mocks__/data/nota/cuerpo/button/button.json';
import Button from '../../../../../../../../../../components/private/LN/api/v1/global/nota/cuerpo/elements/button';

describe('Test de los botones en el cuerpo de una nota', () => {
    it('Test de boton si es null', () => {
        const resp = Button(null);
        expect(resp).toBe(null);
    });

    it('Test de los elementos del boton', () => {
        const resp = Button(ElementButton[0]);
        const element = ElementButton[0];

        expect(resp['_t']).toBe('p');
        expect(resp['valor']['_t']).toBe('boton');
        expect(resp['valor']['class']).toBe('linkboton');
        expect(resp['valor']['valor']).toBe(element.content);
        expect(resp['valor']['href']).toBe(element.url);
    });

    it('Test de los elementos del boton dominio cnd', () => {
        const resp = Button(ElementButton[1]);
        const element = ElementButton[1];

        expect(resp['_t']).toBe('p');
        expect(resp['valor']['_t']).toBe('boton');
        expect(resp['valor']['class']).toBe('linkboton');
        expect(resp['valor']['valor']).toBe(element.content);
        expect(resp['valor']['href']).toBe(
            'https://www.lanacion.com.ar/politica/familiares-de-la-tragedia-de-once-pidieron-la-detencion-de-julio-de-vido-nid29032021/'
        );
    });
});
