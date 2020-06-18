import ElementButton from '../../../../../../../__mocks__/data/nota/cuerpo/button/button.json';

import Button from '../../../../../../../components/private/LN/api/v1/nota/cuerpo/button';

describe('Test de los botones en el cuerpo de una nota', () => {
    it('Test de boton si es null', () => {
        const resp = Button(null);
        expect(resp).toBe(null);
    });

    it('Test de los elementos del boton', () => {
        const resp = Button(ElementButton);
        const element = ElementButton;

        expect(resp['_t']).toBe('p');
        expect(resp['valor']['_t']).toBe('boton');
        expect(resp['valor']['class']).toBe('linkboton');
        expect(resp['valor']['valor']).toBe(element.content);
        expect(resp['valor']['href']).toBe(element.url);
    });
});
