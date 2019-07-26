import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import BajadaNota from '../../../../../components/private/LN/nota/apertura/bajadaNota';

describe('features - LaNacion - Nota - BajadaNota', () => {
    const component = render(<BajadaNota subheadlines={nota.subheadlines} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
});
