import React from 'react';
import { render, shallow } from 'enzyme';

import nota from '../../../../../../__mocks__/data/articles/JZQDUAOPSRF3LLDZOT6374IDOM';

import AuthorAndDate from '../../../../../../components/private/LN/nota/apertura/authorAndDate';

describe('features - LaNacion - Nota - AuthorAndDate', () => {
    const component = render(<AuthorAndDate globalContent={nota} />);
    it('Test de snapshot AuthorAndDate', () => {
        expect(component).toMatchSnapshot();
    });
});
