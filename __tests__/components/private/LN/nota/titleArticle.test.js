import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import TitleArticle from '../../../../../components/private/LN/nota/apertura/titleArticle';

describe('features - LaNacion - Nota - TituloNota', () => {
    const component = render(<TitleArticle globalContent={nota} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
});
