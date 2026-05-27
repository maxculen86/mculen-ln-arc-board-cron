import React from 'react';
import { render, screen } from '@testing-library/react';
import OpeningTitles from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningTitles';

describe('OpeningTitles', () => {
    it('should render h1 and h2 when both props are provided', () => {
        const h1Props = { text: 'Main Title', className: 'custom-h1' };
        const h2Props = { text: 'Subtitle', className: 'custom-h2' };

        render(<OpeningTitles h1Props={h1Props} h2Props={h2Props} />);

        const h1 = screen.getByRole('heading', { level: 1 });
        const h2 = screen.getByRole('heading', { level: 2 });

        expect(h1).toBeInTheDocument();
        expect(h1).toHaveTextContent('Main Title');
        expect(h1).toHaveClass('custom-h1');

        expect(h2).toBeInTheDocument();
        expect(h2).toHaveTextContent('Subtitle');
        expect(h2).toHaveClass('custom-h2');
    });

    it('should render only h1 when only h1Props is provided', () => {
        const h1Props = { text: 'Main Title' };

        render(<OpeningTitles h1Props={h1Props} />);

        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeInTheDocument();
        expect(h1).toHaveTextContent('Main Title');

        const h2s = screen.queryAllByRole('heading', { level: 2 });
        expect(h2s).toHaveLength(0);
    });

    it('should render only h2 when only h2Props is provided', () => {
        const h2Props = { text: 'Subtitle' };

        render(<OpeningTitles h1Props={undefined} h2Props={h2Props} />);

        const h2 = screen.getByRole('heading', { level: 2 });
        expect(h2).toBeInTheDocument();
        expect(h2).toHaveTextContent('Subtitle');

        const h1s = screen.queryAllByRole('heading', { level: 1 });
        expect(h1s).toHaveLength(0);
    });

    it('should return null when both props are missing', () => {
        const { container } = render(
            <OpeningTitles h1Props={undefined} h2Props={undefined} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should return null when both have empty text', () => {
        const h1Props = { text: '' };
        const h2Props = { text: '' };

        const { container } = render(
            <OpeningTitles h1Props={h1Props} h2Props={h2Props} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should apply default classes to h1 and h2', () => {
        const h1Props = { text: 'Main Title' };
        const h2Props = { text: 'Subtitle' };

        render(<OpeningTitles h1Props={h1Props} h2Props={h2Props} />);

        const h1 = screen.getByRole('heading', { level: 1 });
        const h2 = screen.getByRole('heading', { level: 2 });

        expect(h1).toHaveClass(
            'font-primary',
            'font-w-extrabold',
            'text-display-sm'
        );
        expect(h2).toHaveClass('font-primary', 'text-display-sm');
    });

    it('should merge custom classes with default classes', () => {
        const h1Props = { text: 'Main Title', className: 'text-left' };
        const h2Props = { text: 'Subtitle', className: 'text-center' };

        render(<OpeningTitles h1Props={h1Props} h2Props={h2Props} />);

        const h1 = screen.getByRole('heading', { level: 1 });
        const h2 = screen.getByRole('heading', { level: 2 });

        expect(h1).toHaveClass('text-left', 'font-primary');
        expect(h2).toHaveClass('text-center', 'font-primary');
    });

    it('should handle text with special characters', () => {
        const h1Props = { text: 'Título con "comillas" y & símbolos' };
        const h2Props = { text: 'Subtítulo: más detalles' };

        render(<OpeningTitles h1Props={h1Props} h2Props={h2Props} />);

        expect(
            screen.getByText('Título con "comillas" y & símbolos')
        ).toBeInTheDocument();
        expect(screen.getByText('Subtítulo: más detalles')).toBeInTheDocument();
    });

    describe('snapshots', () => {
        it('snapshot with all props', () => {
            const h1Props = { text: 'Main Title', className: 'custom-h1' };
            const h2Props = { text: 'Subtitle', className: 'custom-h2' };
            const { asFragment } = render(
                <OpeningTitles h1Props={h1Props} h2Props={h2Props} />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('snapshot with only h1Props', () => {
            const h1Props = { text: 'Main Title', className: 'custom-h1' };
            const { asFragment } = render(<OpeningTitles h1Props={h1Props} />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('returns null without props', () => {
            const { container } = render(<OpeningTitles />);
            expect(container).toMatchSnapshot();
        });
    });
});
