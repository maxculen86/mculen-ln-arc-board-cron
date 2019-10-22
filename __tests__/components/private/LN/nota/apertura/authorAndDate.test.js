import React from 'react';
import { render, shallow } from 'enzyme';

import nota from '../../../../../../__mocks__/data/articles/JZQDUAOPSRF3LLDZOT6374IDOM';

import AuthorAndDate from '../../../../../../components/private/LN/nota/apertura/authorAndDate';
import AuthorArticle from '../../../../../../components/private/LN/nota/apertura/authorArticle';
import DateHeader from '../../../../../../components/private/LN/common/dateHeader';

describe('features - LaNacion - Nota - AuthorAndDate', () => {
    const component = render(<AuthorAndDate globalContent={nota} />);
    it('Test de snapshot AuthorAndDate', () => {
        expect(component).toMatchSnapshot();
    });
});
