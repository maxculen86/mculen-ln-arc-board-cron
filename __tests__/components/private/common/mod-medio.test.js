import React from 'react';
import { render } from '@testing-library/react';
import ModMedio from '../../../../components/private/common/mod-medio';

describe('Private - Common -  ModMedio', () => {
    const props = {
        medio: 'nacion',
        classCondition: '--medio'
    };

    it('Matches snapshot', () => {
        const { asFragment } = render(<ModMedio {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
