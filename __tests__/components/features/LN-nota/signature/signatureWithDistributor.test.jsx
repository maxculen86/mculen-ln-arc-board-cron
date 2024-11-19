import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SignatureWithDistributor from '../../../../../components/features/LN-nota/signature/signatureWithDistributor';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

describe('components - feature - LN-nota - signature - signatureWithDistributor', () => {
    const mockAudioButton = <button>Escuchar Nota</button>;
    it('should display the name as text if it is "LA NACION"', () => {
        render(
            <SignatureWithDistributor
                name="LA NACION"
                audioButton={mockAudioButton}
                showSignatureWithDistributor={true}
            />
        );

        const distributor = screen.getByText('LA NACION');
        expect(distributor).toBeInTheDocument();
        expect(distributor.tagName).toBe('SPAN');
    });

    it('should display the name as a link to other names', () => {
        render(
            <SignatureWithDistributor
                name="New York Times"
                audioButton={mockAudioButton}
                showSignatureWithDistributor={true}
            />
        );

        const distributor = screen.getByRole('link', {
            name: 'New York Times'
        });
        expect(distributor).toBeInTheDocument();
        expect(distributor).toHaveAttribute(
            'href',
            'https://www.lanacion.com.ar/distributor/new-york-times/'
        );
    });

    it('should render the audio button', () => {
        render(
            <SignatureWithDistributor
                name="LA NACION"
                audioButton={mockAudioButton}
                showSignatureWithDistributor={true}
            />
        );

        const audioButton = screen.getByText('Escuchar Nota');
        expect(audioButton).toBeInTheDocument();
    });

    it('should render nothing when showSignatureWithDistributor is false', () => {
        const { container } = render(
            <SignatureWithDistributor
                name="LA NACION"
                audioButton={mockAudioButton}
                showSignatureWithDistributor={false}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should render without the audio button when audioButton is not provided', () => {
        render(
            <SignatureWithDistributor
                name="LA NACION"
                showSignatureWithDistributor={true}
            />
        );

        const distributor = screen.getByText('LA NACION');
        const audioButton = screen.queryByText('Escuchar Nota');
        expect(distributor).toBeInTheDocument();
        expect(audioButton).toBeNull();
    });
});
