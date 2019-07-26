import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import BajadaNota from '../../../../../components/private/LN/nota/apertura/bajadaNota';

describe('features - LaNacion - Nota - BajadaNota', () => {
    it('Test de snapshot TituloNota', () => {
        const component = render(
            <BajadaNota subheadlines={nota.subheadlines.basic} />
        );
        expect(component).toMatchSnapshot();
    });
});
