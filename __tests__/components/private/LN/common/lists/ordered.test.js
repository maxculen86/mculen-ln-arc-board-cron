import React from 'react';
import { render } from 'enzyme';

import Ordered from '../../../../../../components/private/LN/common/lists/ordered';

describe('features - LaNacion - Nota - ordered', () => {
    const component = render(
        <Ordered>
            <div>Soy el children</div>
            <p>Soy el p</p>
        </Ordered>
    );
    it('Test de snapshot Ordered', () => {
        expect(component).toMatchSnapshot();
    });
});
