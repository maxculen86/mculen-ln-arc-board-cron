import React from 'react';
import { render } from 'enzyme';
import NavBar from '../../../../../../../components/private/LN/common/navbar/listMenu';

jest.mock(
    '../../../../../../../components/private/LN/common/desplegable/desplegable',
    () => 'desplegable-mock'
);

describe('private - LN - common - Navbar - listMenu', () => {
    const component = render(<NavBar />);
    it('Test de snapshot NavBar', () => {
        expect(component).toMatchSnapshot();
    });
});
