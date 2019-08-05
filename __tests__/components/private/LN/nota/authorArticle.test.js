import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import AuthorArticle from '../../../../../components/private/LN/nota/apertura/authorArticle';

describe('features - LaNacion - Nota - AuthorNota', () => {
    const component = render(<AuthorArticle globalContent={nota} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
});
