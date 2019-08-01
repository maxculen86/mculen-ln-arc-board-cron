import Consumer from 'fusion:consumer';

import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import DetalleReceta from '../../../../../components/private/LN/nota/apertura/detalleReceta';

describe('features - LaNacion - Nota - TituloNota', () => {
    const component = render(<DetalleReceta globalContent={nota} />);
    it('Test de snapshot Detalle Receta', () => {
        expect(component).toMatchSnapshot();
    });
});
