import HeaderComponent from '../../../../../../components/private/OTT/common/header/component';
import React from 'react';
import { render } from '@testing-library/react';
import { isSubscribed } from '../../../../../../components/private/common/auth/helper/loginHelper';

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});
jest.mock(
    '../../../../../../components/private/common/auth/helper/loginHelper'
);

describe('HeaderComponent', () => {
    it('should render with button cerrar sesion and logout must be executed', () => {
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

        expect(container).toMatchSnapshot();
    });

    it('shouldnt render the link ir a mi cuenta if not suscribed', () => {
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
        const link = container.querySelector('.header__my-account');

        expect(link).not.toBeInTheDocument();
    });
});
