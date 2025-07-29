import React from 'react';
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
                mode="other"
                audioButton={mockAudioButton}
                showSignatureWithDistributor={true}
            />
        );

        const distributor = screen.getByText('LA NACION');
        expect(distributor).toBeInTheDocument();
        expect(distributor.tagName).toBe('SPAN');

        const linkElement = screen.queryByRole('link');
        expect(linkElement).toBeNull();
    });

    it('should display the name as text if it mode is "custom"', () => {
        render(
            <SignatureWithDistributor
                name="Distributor custom"
                mode="custom"
                audioButton={mockAudioButton}
                showSignatureWithDistributor={true}
            />
        );

        const distributor = screen.getByText('Distributor custom');
        expect(distributor).toBeInTheDocument();
        expect(distributor.tagName).toBe('SPAN');

        const linkElement = screen.queryByRole('link');
        expect(linkElement).toBeNull();
    });

    it('should display the name as a link to names other than "LA NACION" and mode other than "custom"', () => {
        render(
            <SignatureWithDistributor
                name="New York Times"
                mode="other"
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
                mode="other"
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
                mode="other"
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
                mode="other"
                showSignatureWithDistributor={true}
            />
        );

        const distributor = screen.getByText('LA NACION');
        const audioButton = screen.queryByText('Escuchar Nota');
        expect(distributor).toBeInTheDocument();
        expect(audioButton).toBeNull();
    });

    describe('subcategory disclaimer', () => {
        it('shows the subcategory text when name is "EL PAIS" and subcategory is provided', () => {
            render(
                <SignatureWithDistributor
                    name="EL PAIS"
                    mode="other"
                    subcategory="Cultura"
                    audioButton={<button>Escuchar Nota</button>}
                    showSignatureWithDistributor={true}
                />
            );

            expect(
                screen.getByRole('link', { name: 'EL PAIS' })
            ).toBeInTheDocument();
            expect(screen.getByText('Cultura')).toBeInTheDocument();
        });

        it('does NOT show the subcategory text for non "EL PAIS" names even if subcategory is provided', () => {
            render(
                <SignatureWithDistributor
                    name="New York Times"
                    mode="other"
                    subcategory="Cultura"
                    audioButton={<button>Escuchar Nota</button>}
                    showSignatureWithDistributor={true}
                />
            );

            expect(
                screen.getByRole('link', { name: 'New York Times' })
            ).toBeInTheDocument();
            expect(screen.queryByText('Cultura')).toBeNull();
        });

        it('does NOT show the subcategory text when mode is "custom"', () => {
            render(
                <SignatureWithDistributor
                    name="EL PAIS"
                    mode="custom"
                    subcategory="Cultura"
                    audioButton={<button>Escuchar Nota</button>}
                    showSignatureWithDistributor={true}
                />
            );

            expect(screen.getByText('EL PAIS')).toBeInTheDocument();
            expect(screen.queryByRole('link')).toBeNull();
            expect(screen.queryByText('Cultura')).toBeNull();
        });
    });
});
