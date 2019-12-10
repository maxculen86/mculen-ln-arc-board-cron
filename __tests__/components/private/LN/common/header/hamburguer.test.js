import React from 'react';
import { render } from 'enzyme';

import Hamburguer from '../../../../../../components/private/LN/common/header/hamburger';

describe('features - LaNacion - Nota - Hamburguer', () => {
    const component = render(<Hamburguer />);
    it('Test de snapshot Hamburguer', () => {
        expect(component).toMatchSnapshot();
    });
});
