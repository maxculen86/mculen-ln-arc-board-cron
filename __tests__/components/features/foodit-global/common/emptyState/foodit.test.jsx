import React from 'react';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';
import '@testing-library/jest-dom';
import EmptyState from '../../../../../../components/features/foodit-global/common/emptyState/foodit';
import { titleByVariant } from '../../../../../../components/features/foodit-global/common/emptyState/helpers';

jest.mock('fusion:context', Component => {
    return function(Component) {
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
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('data-variant', 'accent');
        expect(button).toHaveTextContent('Suscribite');
        expect(title).toBeInTheDocument();
    });
    it('should render title, button "primary" for variant "barrier-unlogged"', () => {
        render(<EmptyState variant="barrier-unlogged" />);
        const title = screen.getByText(titleByVariant['barrier-unlogged']);
        const button = screen.getByRole('button');
        expect(title).toBeInTheDocument();
        expect(button).toHaveAttribute('data-variant', 'primary');
        expect(button).toHaveTextContent('Inicia sesión');
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
