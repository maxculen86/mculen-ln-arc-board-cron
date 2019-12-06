import React from 'react';
import { render } from 'enzyme';

import Unordered from '../../../../../../components/private/LN/nota/cuerpo/unordered';

describe('features - LaNacion - Nota - unordered', () => {
    const component = render(
        <Unordered>
            <div>Soy el children</div>
            <p>Soy el p</p>
        </Unordered>
    );
    it('Test de snapshot Unordered', () => {
        expect(component).toMatchSnapshot();
    });
});
