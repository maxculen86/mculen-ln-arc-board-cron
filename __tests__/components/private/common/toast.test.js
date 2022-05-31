import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toast from '../../../../components/private/common/toast/Toast';

describe('Components - Private - Common - Toast Modal =>', () => {
    it('Should not render without status prop defined', () => {
        const { container } = render(<Toast />);
        expect(container).toBeEmptyDOMElement();
    });
    it('Close button should hide the toast - info status', () => {
        const toastStatus = {
            status: 'info'
        };
        const { container } = render(<Toast data={toastStatus} />);
        expect(container.firstChild.classList.contains('--info')).toBeTruthy();
        expect(container.querySelector('.com-icon.icon-info')).toBeTruthy();
        expect(screen.getByText('Info')).toBeTruthy();

        const closeButton = screen.getByRole('button', { name: /Cerrar/i });
        expect(closeButton).toBeTruthy();
        fireEvent.click(closeButton);
        expect(container).toBeEmptyDOMElement();
    });
    it('Should hide when timeout is set', () => {
        const mockOnClick = jest.fn();
        const statusDanger = {
            status: 'danger',
            buttonLabel: 'Test on click',
            buttonAction: mockOnClick
        };
        const { container } = render(<Toast data={statusDanger} />);
        expect(
            container.firstChild.classList.contains('--danger')
        ).toBeTruthy();
        expect(
            container.querySelector('.com-icon.icon-error-warning')
        ).toBeTruthy();
        expect(screen.getByText('¡Ups!')).toBeTruthy();

        const button = screen.getByRole('button', { name: /Test on click/i });
        expect(button).toBeTruthy();
        fireEvent.click(button);
        expect(mockOnClick).toBeCalledTimes(1);
    });
    it('Should show with proper icon and text for success status', () => {
        const toastSuccess = {
            status: 'success'
        };
        const { container } = render(<Toast data={toastSuccess} />);
        expect(
            container.firstChild.classList.contains('--success')
        ).toBeTruthy();
        expect(
            container.querySelector('.com-icon.icon-checkmark')
        ).toBeTruthy();
        expect(screen.getByText('¡Listo!')).toBeTruthy();
    });
    it('Should show with proper icon, text and description for warning status', () => {
        const statusWarning = {
            status: 'warning',
            buttonLabel: 'Ir a mis notas',
            buttonAction: () => {},
            description: 'Testing description'
        };
        const { container } = render(<Toast data={statusWarning} />);
        expect(
            container.firstChild.classList.contains('--warning')
        ).toBeTruthy();
        expect(container.querySelector('.com-icon.icon-alert')).toBeTruthy();
        expect(screen.getByText('¡Atención!')).toBeTruthy();
        expect(screen.getByText('Testing description')).toBeTruthy();

        expect(
            screen.getByRole('button', { name: /Ir a mis notas/i })
        ).toBeTruthy();
    });
    it('Should show with proper icon and text for danger status, and button fuction to be called on button click', () => {
        const mockOnClick = jest.fn();
        const statusDanger = {
            status: 'danger',
            buttonLabel: 'Test on click',
            buttonAction: mockOnClick
        };
        const { container } = render(<Toast data={statusDanger} />);
        expect(
            container.firstChild.classList.contains('--danger')
        ).toBeTruthy();
        expect(
            container.querySelector('.com-icon.icon-error-warning')
        ).toBeTruthy();
        expect(screen.getByText('¡Ups!')).toBeTruthy();

        const button = screen.getByRole('button', { name: /Test on click/i });
        expect(button).toBeTruthy();
        fireEvent.click(button);
        expect(mockOnClick).toBeCalledTimes(1);
    });
});
