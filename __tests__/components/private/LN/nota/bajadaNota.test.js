import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import BajadaNota from '../../../../../components/private/LN/nota/bajada';

describe('features - LaNacion - Nota - BajadaNota', () => {
    const component = render(<BajadaNota globalContent={nota} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
});
