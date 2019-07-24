import Consumer from 'fusion:consumer';

import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import PorcionesTiempoNota from '../../../../../components/private/LN/nota/apertura/porcionesTiempoNota';

describe('features - LaNacion - Nota - TituloNota', () => {
    const component = render(<PorcionesTiempoNota globalContent={nota} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
});
