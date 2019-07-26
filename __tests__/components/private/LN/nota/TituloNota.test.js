import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import TituloNota from '../../../../../components/private/LN/nota/apertura/tituloNota';

describe('features - LaNacion - Nota - TituloNota', () => {
    it('Test de snapshot TituloNota', () => {
        const component = render(<TituloNota titulo={nota.headlines.basic} />);
        expect(component).toMatchSnapshot();
    });
});
