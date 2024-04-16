import React from 'react';
import { render } from 'enzyme';
import NavBar from '../../../../../../../components/private/LN/common/navbar';
import useSiteServices from '../../../../../../../components/features/LN-10-global/hooks/useSiteServices';
import siteServicesMock from '../../../../../../../__mocks__/data/siteServices/siteServices.json';

jest.mock(
    '../../../../../../../components/features/LN-10-global/hooks/useSiteServices',
    () => jest.fn()
);

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

useSiteServices.mockImplementation(() => {
    return siteServicesMock;
});
describe('private - LN - common - Navbar - listMenu', () => {
    const component = render(<NavBar showNav="" />);
    it('Test de snapshot NavBar', () => {
        expect(component).toMatchSnapshot();
    });
});
