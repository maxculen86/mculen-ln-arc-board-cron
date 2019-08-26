import React from 'react';
import { render } from 'enzyme';
import Ranking from '../../../../../../components/private/LN/common/ranking';

describe('Ranking', () => {
    it('matches snapshot', () => {
        const articlesMock = [
            { name: 'Article 1', author: 'John Doe' },
            { name: 'Article 2', author: 'Jenny Doe' }
        ];
        const component = render(<Ranking articles={articlesMock} />);
        expect(component).toMatchSnapshot();
    });
});
