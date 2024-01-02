import React from 'react';
import {
    SITIO_SEGURO_REGISTRACION,
    SITE_LANACION,
    API_ENV
} from 'fusion:environment';
import Navbar from '../../../../../components/private/LN10/navbar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { GlobalContext } from '../../../../../components/private/common/context/globalContext';

jest.mock(
    '../../../../../components/private/LN/common/utils/contextHelper',
    () => ({
        isSubscribed: jest.fn()
    })
);

describe('Components - Private - LN10 - Navbar', () => {
    it('should test navbar items when user is subscribed', () => {
        const mockSubscriptionValue = true;
        require('../../../../../components/private/LN/common/utils/contextHelper').isSubscribed.mockReturnValue(
            mockSubscriptionValue
        );

        const mockState = {
            loginData: {
                subscription: mockSubscriptionValue
            }
        };

        const { getByText } = render(
            <GlobalContext.Provider value={{ state: mockState }}>
                <Navbar isHome={true} toggleDesplegable={() => {}} />
            </GlobalContext.Provider>
        );

        expect(getByText('Mis Notas')).toBeInTheDocument();
    });

    it('should test navbar items when user is not subscribed', () => {
        const mockSubscriptionValue = false;
        require('../../../../../components/private/LN/common/utils/contextHelper').isSubscribed.mockReturnValue(
            mockSubscriptionValue
        );

        const mockState = {
            loginData: {
                subscription: mockSubscriptionValue
            }
        };

        const { getByText } = render(
            <GlobalContext.Provider value={{ state: mockState }}>
                <Navbar isHome={true} toggleDesplegable={() => {}} />
            </GlobalContext.Provider>
        );

        expect(getByText('Club LN')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<Navbar isHome />);
        expect(container).toMatchSnapshot();
    });
});
