import HeaderComponent from '../../../../../../components/private/OTT/common/header/component';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import {
    isSubscribed,
    logout
} from '../../../../../../components/private/common/auth/helper/loginHelper';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});
jest.mock(
    '../../../../../../components/private/common/auth/helper/loginHelper'
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('HeaderComponent', () => {
    it('should render with button cerrar sesion and logout must be executed', async () => {
        const props = {
            arcSite: 'ott',
            contextPath: '/pf',
            items: [
                { href: '/', description: 'En Vivo', alt: 'En Vivo' },
                {
                    href: '/programas',
                    description: 'Todos los programas',
                    alt: 'Todos los programas'
                }
            ]
        };
        isSubscribed.mockReturnValue(true);

        const { container } = render(<HeaderComponent {...props} />);
        const button = screen.getByTitle('Cerrar sesión');
        fireEvent.click(button);

        expect(container).toMatchSnapshot();
        expect(logout).toHaveBeenCalled();
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            action: 'menu_usuario',
            category: 'lnmas',
            event: 'e_linkclick',
            label: 'Cerrar sesión'
        });
    });

    it('shouldnt render the button cerrar sesion if not suscribed', () => {
        const props = {
            arcSite: 'ott',
            contextPath: '/pf',
            items: [
                { href: '/', description: 'En Vivo', alt: 'En Vivo' },
                {
                    href: '/programas',
                    description: 'Todos los programas',
                    alt: 'Todos los programas'
                }
            ]
        };
        isSubscribed.mockReturnValue(false);

        const { container } = render(<HeaderComponent {...props} />);
        const button = container.querySelector('.button header__log-out');

        expect(button).not.toBeInTheDocument();
    });
});
