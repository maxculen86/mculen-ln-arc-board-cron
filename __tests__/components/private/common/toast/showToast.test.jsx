import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToastContainer } from '@ln/common-ui-toast';
import { Toast } from '@ln/contenidos-ui-toast';
import ShowToast from '../../../../../components/private/common/toast/showToast';

jest.mock('@ln/common-ui-toast', () => ({
    ToastContainer: jest.fn(({ newToast, ...props }) => (
        <div data-testid="ToastContainer" {...props}>
            {newToast}
        </div>
    ))
}));

jest.mock('@ln/contenidos-ui-toast', () => ({
    Toast: jest.fn(props => {
        return <div data-testid="Toast" {...props} />;
    })
}));

describe('components - private - common - toast - ShowToast', () => {
    const defaultProps = {
        isOpen: true,
        onClose: jest.fn(),
        title: '¡Listo!',
        description: 'Se borró de "Mis notas"',
        status: 'success',
        timeout: 2750,
        closable: true,
        pauseOnHover: true
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders nothing when isOpen is false', () => {
        render(<ShowToast {...defaultProps} isOpen={false} />);

        expect(screen.queryByTestId('ToastContainer')).not.toBeInTheDocument();
    });

    it('renders ToastContainer with correct props when isOpen is true', () => {
        const container = render(<ShowToast {...defaultProps} />);

        const toastContainer = screen.getByTestId('ToastContainer');
        expect(toastContainer).toHaveAttribute('hPosition', 'center');
        expect(toastContainer).toHaveAttribute('vPosition', 'bottom');

        expect(container).toMatchSnapshot();
    });

    it('renders Toast with correct props', () => {
        render(
            <ShowToast
                {...defaultProps}
                buttonLabel="Mis Notas"
                href="https://www.lanacion.com.ar/mis-notas/"
            />
        );

        expect(Toast).toHaveBeenCalledWith(
            expect.objectContaining({
                title: '¡Listo!',
                message: 'Se borró de "Mis notas"',
                variant: 'success',
                closable: true,
                pauseOnHover: true,
                buttonProps: {
                    label: 'Mis Notas',
                    href: 'https://www.lanacion.com.ar/mis-notas/',
                    title: 'Mis Notas'
                }
            }),
            {}
        );
    });
});
