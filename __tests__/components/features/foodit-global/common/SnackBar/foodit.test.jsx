import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { SnackBar } from '../../../../../../components/features/foodit-global/common/SnackBar/foodit';

describe('SnackBar', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });
    it('renders without crashing and shows the main text', () => {
        render(<SnackBar />);
        expect(
            screen.getByText(
                /Ahora podés instalar Foodit, accedé a tus recetas fácil y rápido/i
            )
        ).toBeInTheDocument();
    });

    it('renders correctly when variant is snackBarDefault', () => {
        render(<SnackBar variant="snackBarDefault" />);
        expect(
            screen.getByText(/Ahora podés instalar Foodit/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /instalar/i })
        ).toBeInTheDocument();
        expect(screen.queryByText(/CANCELAR/i)).not.toBeInTheDocument();
    });
    it('renders correctly when variant is snackBarDrawer', () => {
        render(<SnackBar variant="snackBarDrawer" />);
        expect(
            screen.getByText(/Ahora podés instalar Foodit/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /instalar/i })
        ).toBeInTheDocument();
        expect(screen.queryByText(/CANCELAR/i)).toBeInTheDocument();
    });
});
