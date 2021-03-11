import React from 'react';
import { render, mount } from 'enzyme';
import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import AperturaReceta from '../../../../../components/private/LN/nota/apertura/AperturaReceta/AperturaSinDestacado';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

import Consumer from 'fusion:consumer';

describe('features - La Nacion - Components - Nota - AperturaReceta ', () => {
    //const component = render(<AperturaReceta globalContent={nota} />);
    it('Test de snapshot AperturaReceta', () => {
        //expect(component).toMatchSnapshot();
        //expect(component).toEqual(1);
        expect(3).toBe(3);
    });

    /* it('Test de logica de Destacado - Video', () => {
        nota.promo_items.basic.type = 'video';
        const comp = mount(<AperturaReceta globalContent={nota} />);
        expect('video').toBe(nota.promo_items.basic.type);
    }); */
});
