import React from 'react';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import { shallow } from 'enzyme';
import NotaApertura from '../../../../../../components/private/LN/acumulado/notaApertura';


describe('components - private - LN - acumulado - NotaApertura', () => {

    let component = shallow(<NotaApertura />);

    it('Testeo que NO renderize un div con clase mod-opening', () => {
        expect(component.find('.mod-opening').length).toEqual(0);
    });

    //Cuando haya un acumulado con deba renderizar mod-opening
    //component = shallow(<NotaApertura customFields={{ idCollection: '/recetas' }} />);

});
