import React from 'react';
import { render } from '@testing-library/react';

import { Search } from '../../../../../../../components/features/foodit-global/common/Header/components/Search';

describe('Components - features - foodit-global - common - header - components - Search', () => {
    it('should match snapshot', () => {
        const { container } = render(<Search />);
        expect(container).toMatchSnapshot();
    });
});
