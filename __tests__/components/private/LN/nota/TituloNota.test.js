import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import TituloNota from '../../../../../components/private/LN/nota/apertura/tituloNota';

describe('features - LaNacion - Nota - TituloNota', () => {
    const component = render(<TituloNota globalContent={nota} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
});
