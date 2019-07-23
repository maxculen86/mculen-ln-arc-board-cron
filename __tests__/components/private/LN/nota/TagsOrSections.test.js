import Consumer from 'fusion:consumer';

import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import TagsOrSections from '../../../../../components/private/LN/nota/apertura/tagsOrSections';

describe('features - LaNacion - Nota - TituloNota', () => {
    const component = render(<TagsOrSections globalContent={nota} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
});
