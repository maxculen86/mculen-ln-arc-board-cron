import React from 'react';
import { render } from 'enzyme';
import NavBar from '../../../../../../../components/private/LN/common/Navbar/listMenu';

describe('private - LN - common - Navbar - listMenu', () => {
    const component = render(<NavBar />);
    it('Test de snapshot NavBar', () => {
        expect(component).toMatchSnapshot();
    });
});
