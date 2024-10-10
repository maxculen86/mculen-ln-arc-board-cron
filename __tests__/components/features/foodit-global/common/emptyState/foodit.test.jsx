import React from 'react';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';
import '@testing-library/jest-dom';
import EmptyState from '../../../../../../components/features/foodit-global/common/emptyState/foodit';
import { titleByVariant } from '../../../../../../components/features/foodit-global/common/emptyState/helpers';
import {
    SITIO_SEGURO_REGISTRACION,
    FOODIT_LOGIN_URL
} from 'fusion:environment';

jest.mock('fusion:environment', () => ({
    SITIO_SEGURO_REGISTRACION: 'https://mocked-registro.com',
    FOODIT_LOGIN_URL: 'https://mocked-login.com/'
}));

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});
describe('EmptyState component', () => {
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
        const buttons = screen.getAllByRole('link');
        const suscribeButton = buttons.find(
            button => button.getAttribute('data-variant') === 'accent'
        );

        expect(suscribeButton).toHaveAttribute('data-variant', 'accent');
        expect(suscribeButton).toHaveTextContent('Suscribite');
        expect(title).toBeInTheDocument();
    });
    it('should render title, button "link" for variant "barrier-unlogged"', () => {
        render(<EmptyState variant="barrier-unlogged" />);
        const title = screen.getByText(titleByVariant['barrier-unlogged']);
        const buttons = screen.getAllByRole('link');
        const loginButton = buttons.find(button =>
            button.textContent.includes('Iniciá sesión')
        );

        expect(title).toBeInTheDocument();
        expect(loginButton).toHaveAttribute('data-variant', 'link');
        expect(loginButton).toHaveTextContent('Iniciá sesión');
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
});
