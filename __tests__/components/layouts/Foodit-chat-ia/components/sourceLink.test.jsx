import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SourceLink } from '../../../../../components/layouts/Foodit-chat-ia/_children/MessageContainer/SourceLink';

describe('SourceLink', () => {
    it('renders an anchor using url and titulo props', () => {
        render(
            <SourceLink url="https://b.com" titulo="Titulo">
                texto
            </SourceLink>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://b.com');
        expect(link).toHaveAttribute('title', 'Titulo');
        expect(link).toHaveTextContent('texto');
    });

    it('opens in a new tab safely', () => {
        render(
            <SourceLink url="https://b.com" titulo="Titulo">
                texto
            </SourceLink>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders plain children when there is no url', () => {
        render(<SourceLink titulo="Titulo">solo texto</SourceLink>);

        expect(screen.queryByRole('link')).not.toBeInTheDocument();
        expect(screen.getByText('solo texto')).toBeInTheDocument();
    });

    it('renders plain children for non-http(s) urls to prevent injection', () => {
        render(
            // eslint-disable-next-line no-script-url
            <SourceLink url="javascript:alert(1)" titulo="Titulo">
                texto
            </SourceLink>
        );

        expect(screen.queryByRole('link')).not.toBeInTheDocument();
        expect(screen.getByText('texto')).toBeInTheDocument();
    });
});
