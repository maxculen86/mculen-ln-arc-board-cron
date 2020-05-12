import React from 'react';
import { render } from 'enzyme';

import ModMedio from '../../../../components/private/common/mod-medio';

describe('ModMedio', () => {
    const props = {
        medio: 'nacion',
        classCondition: '--medio'
    };

    it('Matches snapshot', () => {
        const component = render(<ModMedio {...props} />);
        expect(component).toMatchSnapshot();
    });
});
