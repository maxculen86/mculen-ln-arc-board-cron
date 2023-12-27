import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BotonLink from '../../../../../../components/features/private-global/body/buttonLink/foodit';

describe('BotonLink', () => {
    it('Should render the button with the correct content and URL', () => {
        const data = {
            url: 'https://example.com',
            content: 'Visitar Sitio'
        };

        render(<BotonLink data={data} />);
        const button = screen.getByRole('link', { name: /visitar sitio/i });

        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('href', 'https://example.com');
        expect(button).toHaveAttribute('target', '_blank');
        expect(button).toHaveClass('as-center');
    });

    it('Should not render without a URL', () => {
        const data = {
            content: 'Visitar Sitio'
        };

        const { container } = render(<BotonLink data={data} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('Should not render without content', () => {
        const data = {
            url: 'https://example.com'
        };

        const { container } = render(<BotonLink data={data} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('Should not render without properties', () => {
        const { container } = render(<BotonLink />);
        expect(container).toBeEmptyDOMElement();
    });
});
