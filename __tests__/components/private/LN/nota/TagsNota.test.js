import Consumer from 'fusion:consumer';

import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import TagsNota from '../../../../../components/private/LN/nota/apertura/tagsNota';

describe('features - LaNacion - Nota - TituloNota', () => {
    const component = render(<TagsNota globalContent={nota} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
});
