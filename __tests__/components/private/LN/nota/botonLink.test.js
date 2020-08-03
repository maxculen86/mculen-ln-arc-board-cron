import React from 'react';
import BotonLink from '../../../../../components/private/LN/nota/cuerpo/botonLink';
import { mount } from 'enzyme';

describe('Components - private - LN - nota - botonLink', () => {
    const data = { url: 'www.google.com', content: 'Esto es un Boton' };
    const component = mount(<BotonLink data={data} />);

    it('Le paso props y espero que el texto este en mayuscula', () => {
        expect(component.find('.com-text').text()).toBe('ESTO ES UN BOTON');
    });
});
