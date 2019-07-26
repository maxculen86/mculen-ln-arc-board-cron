import Consumer from 'fusion:consumer';

import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import AuthorNota from '../../../../../components/private/LN/nota/apertura/authorNota';

describe('features - LaNacion - Nota - AuthorNota', () => {
    const component = render(<AuthorNota authors={nota.credits.by} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
});
