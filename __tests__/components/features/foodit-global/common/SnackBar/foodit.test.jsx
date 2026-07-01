import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { PromoteInstallation } from '../../../../../../components/features/foodit-global/common/PromoteInstallation/foodit';

describe('PromoteInstallation', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });
    it('renders without crashing and shows the main text', () => {
        render(<PromoteInstallation />);
        expect(
            screen.getByText(
                /Ahora podés instalar Foodit, accedé a tus recetas fácil y rápido/i
            )
        ).toBeInTheDocument();
    });

    it('renders correctly when variant is snackBarDefault', () => {
        render(<PromoteInstallation variant="snackBarDefault" />);
        expect(
            screen.getByText(/Ahora podés instalar Foodit/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /instalar/i })
        ).toBeInTheDocument();
        expect(screen.queryByText(/CANCELAR/i)).not.toBeInTheDocument();
    });
    it('renders correctly when variant is snackBarDrawer', () => {
        render(<PromoteInstallation variant="snackBarDrawer" />);
        expect(
            screen.getByText(/Ahora podés instalar Foodit/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /instalar/i })
        ).toBeInTheDocument();
        expect(screen.queryByText(/CANCELAR/i)).toBeInTheDocument();
    });

    it('should match snapshot snackBarDefault', () => {
        const { container } = render(<PromoteInstallation />);
        expect(container).toMatchSnapshot();
    });

    it('should match snapshot snackBarDrawer', () => {
        const { container } = render(
            <PromoteInstallation variant="snackBarDrawer" as="li" />
        );
        expect(container).toMatchSnapshot();
    });
});
