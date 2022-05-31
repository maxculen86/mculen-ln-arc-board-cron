import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Barrier from '../../../../components/private/common/barrier/Barrier';

describe('Components - Private - Common - Barrier Modal =>', () => {
    it('Should not render without type prop defined', () => {
        const { container } = render(<Barrier />);
        expect(container).toBeEmptyDOMElement();
    });
    it('Should render barrier and call handleBarrier when its closed', () => {
        const handleBarrier = jest.fn();
        const { container } = render(
            <Barrier type={'exclusive-ln'} handleBarrier={handleBarrier} />
        );
        expect(container).not.toBeEmptyDOMElement();

        const closeButton = screen.getByRole('button', { name: /Cerrar/i });
        expect(closeButton).toBeDefined();
        fireEvent.click(closeButton);
        expect(handleBarrier).toHaveBeenCalledTimes(1);
    });
    it('Should render barrier with subscribe button and login link when user is not logged in', () => {
        render(<Barrier type="exclusive-ln" isLogged={false} />);

        expect(screen.queryByText('Vincular credencial')).toBeNull();

        const loginLink = screen.getByText('Iniciar sesión');
        expect(loginLink).toBeDefined();

        const subscribeButton = screen.getByRole('button', {
            name: /suscribirme/i
        });
        expect(subscribeButton).toBeDefined();

        const closeButton = screen.getByRole('button', { name: /Cerrar/i });
        expect(closeButton).toBeDefined();
    });
    it('Should render barrier with subscribe button and credential link when user is logged in but non subscriber', () => {
        render(<Barrier type="exclusive-ln" isLogged />);

        expect(screen.queryByText('Iniciar sesión')).toBeNull();

        const credentialLink = screen.getByText('Vincular credencial');
        expect(credentialLink).toBeDefined();

        const subscribeButton = screen.getByRole('button', {
            name: /suscribirme/i
        });
        expect(subscribeButton).toBeDefined();

        const closeButton = screen.getByRole('button', { name: /Cerrar/i });
        expect(closeButton).toBeDefined();
    });
});
