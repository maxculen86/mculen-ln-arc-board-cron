import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SignatureWithAuthors from '../../../../../components/features/LN-nota/signature/signatureWithAuthors';

describe('components - feature - LN-nota - signature - signatureWithAuthors', () => {
    const mockAudioButton = (
        <button data-testid="audio-button">Escuchar Nota</button>
    );
    const multipleAuthors = [
        {
            name: 'María Julieta Rumi',
            link: '/autor/maria-julieta-rumi-9693/'
        },
        { name: 'Cecilia Devanna', link: '/autor/cdevanna/' }
    ];

    it('should render correctly with a single author', () => {
        render(
            <SignatureWithAuthors
                showVariantIa={false}
                author={{
                    name: 'Laura Serra',
                    link: '/autor/laura-serra-164/'
                }}
                authors={[
                    { name: 'Laura Serra', link: '/autor/laura-serra-164/' }
                ]}
                photo="https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-authors%2Flanacionar%2F2532528.png?auth=731fc7658d99c59f10db32ec1a6ef5bbc5ee6dab7ad8c82308fb537c359e5ac9&width=80&quality=70&smart=false"
                medio="LA NACION"
                audioButton={mockAudioButton}
                position={'Top'}
                showSignatureWithAuthors={true}
            />
        );

        const authorElement = screen.getByText('Laura Serra');
        const audioButton = screen.getByTestId('audio-button');

        expect(authorElement).toBeInTheDocument();
        expect(audioButton).toBeInTheDocument();
    });

    it('should render correctly with multiple authors', () => {
        render(
            <SignatureWithAuthors
                showVariantIa={false}
                author={false}
                authors={multipleAuthors}
                photo="null"
                medio="null"
                audioButton={mockAudioButton}
                position={'Top'}
                showSignatureWithAuthors={true}
            />
        );

        const firstAuthor = screen.getByText('María Julieta Rumi');
        const secondAuthor = screen.getByText('Cecilia Devanna');
        const audioButton = screen.getByTestId('audio-button');

        expect(firstAuthor).toBeInTheDocument();
        expect(secondAuthor).toBeInTheDocument();
        expect(audioButton).toBeInTheDocument();
    });

    it('should render multiple authors without the audio button when audioButton is null', () => {
        render(
            <SignatureWithAuthors
                showVariantIa={false}
                author={false}
                authors={multipleAuthors}
                photo="null"
                medio="null"
                audioButton={null}
                position={'Top'}
                showSignatureWithAuthors={true}
            />
        );

        const firstAuthor = screen.getByText('María Julieta Rumi');
        const secondAuthor = screen.getByText('Cecilia Devanna');

        expect(firstAuthor).toBeInTheDocument();
        expect(secondAuthor).toBeInTheDocument();
        expect(screen.queryByTestId('audio-button')).toBeNull();
    });

    it('should render custom IA variant when showVariantIa is true', () => {
        const { container } = render(
            <SignatureWithAuthors
                showVariantIa={true}
                author={{
                    name: 'Pablo Lisotto',
                    link: '/autor/pablo-lisotto-298/'
                }}
                authors={[
                    { name: 'Pablo Lisotto', link: '/autor/pablo-lisotto-298/' }
                ]}
                photo="https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F2771712.png?auth=6697c52758385d28af928d3b17e6a99b7690460e4c150b49c0e80735726ff800&width=80&quality=70&smart=false"
                medio="LA NACION"
                audioButton={mockAudioButton}
                position={'Top'}
                showSignatureWithAuthors={true}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render anything when showSignatureWithAuthors is false', () => {
        const { container } = render(
            <SignatureWithAuthors
                showVariantIa={false}
                author={null}
                authors={null}
                photo=""
                medio=""
                audioButton={mockAudioButton}
                position={'Top'}
                showSignatureWithAuthors={false}
            />
        );

        expect(container.firstChild).toBeNull();
    });
});
