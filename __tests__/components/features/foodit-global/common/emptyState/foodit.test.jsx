import React from 'react';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';
import '@testing-library/jest-dom';
import EmptyState from '../../../../../../components/features/foodit-global/common/emptyState/foodit';
import { titleByVariant } from '../../../../../../components/features/foodit-global/common/emptyState/helpers';
import useGetUserConfig from '../../../../../../components/features/foodit-global/hooks/useGetUserConfig';

jest.mock('fusion:environment', () => ({
    SITIO_SEGURO_REGISTRACION: 'https://mocked-registro.com',
    FOODIT_LOGIN_URL: 'https://mocked-login.com/'
}));

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});
jest.mock(
    '../../../../../../components/features/foodit-global/hooks/useGetUserConfig'
);

describe('EmptyState component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useGetUserConfig.mockReturnValue({
            userType: 'guest',
            promotions: {
                buttonSubscribeText: 'Suscribite'
            }
        });
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        });
    });
    const deployment = deploymentValue => deploymentValue;
    Context.useAppContext = jest.fn(() => ({
        deployment: deployment,
        contextPath: '/pf'
    }));
    it('should render title for variant "empty-state"', () => {
        render(<EmptyState variant="empty-state" />);
        const title = screen.getByText(titleByVariant['empty-state']);
        expect(title).toBeInTheDocument();
    });
    it('should render title and button "accent" for variant "barrier-logged"', () => {
        render(<EmptyState variant="barrier-logged" />);
        const title = screen.getByText(titleByVariant['barrier-logged']);
        const buttons = screen.getAllByRole('button');
        const suscribeButton = buttons.find(
            button => button.getAttribute('data-variant') === 'accent'
        );

        expect(suscribeButton).toHaveAttribute('data-variant', 'accent');
        expect(suscribeButton).toHaveTextContent('Suscribite');
        expect(title).toBeInTheDocument();
    });
    it('should render title, button "link" for variant "barrier-unlogged"', () => {
        useGetUserConfig.mockReturnValue({
            userType: 'unlogged',
            promotions: {
                buttonSubscribeText: 'Suscribite',
                buttonLogginText: 'Iniciá sesión'
            }
        });
        render(<EmptyState variant="barrier-unlogged" />);
        const title = screen.getByText(titleByVariant['barrier-unlogged']);
        const buttons = screen.getAllByRole('button');
        const loginButton = buttons.find(button =>
            button.textContent.includes('Iniciá sesión')
        );

        expect(title).toBeInTheDocument();
        expect(loginButton).toHaveAttribute('data-variant', 'link');
        expect(loginButton).toHaveTextContent('Iniciá sesión');
    });
    it('should not render button in variant "404"', () => {
        render(<EmptyState variant="404" />);
        const buttons = screen.queryAllByRole('button');
        expect(buttons.length).toBe(0);
    });
    it('should not render button in variant "search-engine"', () => {
        render(<EmptyState variant="search-engine" />);
        const buttons = screen.queryAllByRole('button');
        expect(buttons.length).toBe(0);
    });
    it('should match snapshot with variant "barrier-logged"', () => {
        const { container } = render(<EmptyState variant="barrier-logged" />);
        expect(container).toMatchSnapshot();
    });
    it('should match snapshot with variant "barrier-unlogged', () => {
        const { container } = render(<EmptyState variant="barrier-unlogged" />);
        expect(container).toMatchSnapshot();
    });
    it('should match snapshot with variant "empty-state', () => {
        const { container } = render(<EmptyState variant="empty-state" />);
        expect(container).toMatchSnapshot();
    });
    it('should match snapshot with variant "search-engine"', () => {
        const { container } = render(<EmptyState variant="search-engine" />);
        expect(container).toMatchSnapshot();
    });
    it('should match snapshot with variant "404"', () => {
        const { container } = render(<EmptyState variant="404" />);
        expect(container).toMatchSnapshot();
    });
});
