import React from 'react';
import { render } from 'enzyme';
import NavBar from '../../../../../../../components/private/LN/common/navbar';

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

describe('private - LN - common - Navbar - listMenu', () => {
    const component = render(<NavBar showNav="" />);
    it('Test de snapshot NavBar', () => {
        expect(component).toMatchSnapshot();
    });
});
