import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IaSummary from '../../../../../../components/features/LN/common/iaSummary/default';

jest.mock('@ln/ds-common-motion', () => ({
    Motion: ({ show, children }) => (show ? children : null)
}));

const defaultSummaryData = [
    'First summary point',
    'Second summary point',
    'Third summary point'
];

const renderOpen = (props = {}) =>
    render(
        <IaSummary
            isOpen
            summaryData={defaultSummaryData}
            onClose={jest.fn()}
            {...props}
        />
    );

describe('Components - features - LN - common - iaSummary', () => {
    describe('null rendering', () => {
        it('returns null when summaryData is empty array', () => {
            const { container } = render(
                <IaSummary isOpen summaryData={[]} onClose={jest.fn()} />
            );

            expect(container.firstChild).toBeNull();
        });

        it('returns null when summaryData is not provided', () => {
            const { container } = render(
                <IaSummary isOpen onClose={jest.fn()} />
            );

            expect(container.firstChild).toBeNull();
        });
    });

    describe('visibility', () => {
        it('does not render content when isOpen is false', () => {
            render(
                <IaSummary
                    isOpen={false}
                    summaryData={defaultSummaryData}
                    onClose={jest.fn()}
                />
            );

            expect(
                screen.queryByRole('region', {
                    name: 'Resumen de lectura con IA'
                })
            ).not.toBeInTheDocument();
        });

        it('renders content when isOpen is true', () => {
            renderOpen();

            expect(
                screen.getByRole('region', {
                    name: 'Resumen de lectura con IA'
                })
            ).toBeInTheDocument();
        });
    });

    describe('accessibility — landmark region', () => {
        it('renders a region landmark with correct aria-label', () => {
            renderOpen();

            const region = screen.getByRole('region', {
                name: 'Resumen de lectura con IA'
            });
            expect(region).toBeInTheDocument();
            expect(region.tagName).toBe('SECTION');
        });
    });

    describe('header section', () => {
        it('renders the "Resumen de lectura" heading', () => {
            renderOpen();

            const heading = screen.getByRole('heading', { level: 2 });
            expect(heading).toBeInTheDocument();
            expect(heading).toHaveTextContent('Resumen de lectura');
        });

        it('renders the article icon with aria-hidden', () => {
            const { container } = renderOpen();

            const articleIcon = container.querySelector(
                'mock-ds-common-icon[name="article"]'
            );
            expect(articleIcon).toBeInTheDocument();
            expect(articleIcon).toHaveAttribute('aria-hidden', 'true');
        });

        it('heading appears before close button in the DOM', () => {
            const { container } = renderOpen();

            const section = container.querySelector('section');
            const heading = section.querySelector('h2');
            const button = section.querySelector('button');

            expect(
                heading.compareDocumentPosition(button) &
                    Node.DOCUMENT_POSITION_FOLLOWING
            ).toBeTruthy();
        });
    });

    describe('close button', () => {
        it('renders with correct aria-label', () => {
            renderOpen();

            const closeButton = screen.getByRole('button', {
                name: 'Cerrar resumen IA'
            });
            expect(closeButton).toBeInTheDocument();
        });

        it('renders the close icon with aria-hidden', () => {
            const { container } = renderOpen();

            const closeIcon = container.querySelector(
                'mock-ds-common-icon[name="close"]'
            );
            expect(closeIcon).toBeInTheDocument();
            expect(closeIcon).toHaveAttribute('aria-hidden', 'true');
        });

        it('calls onClose when the close button is clicked', () => {
            const onClose = jest.fn();
            renderOpen({ onClose });

            const closeButton = screen.getByRole('button', {
                name: 'Cerrar resumen IA'
            });
            fireEvent.click(closeButton);

            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });

    describe('summary list', () => {
        it('renders all summary items', () => {
            renderOpen();

            const items = screen.getAllByRole('listitem');
            expect(items).toHaveLength(defaultSummaryData.length);
        });

        it('renders each paragraph text inside a list item', () => {
            renderOpen();

            defaultSummaryData.forEach(paragraph => {
                expect(screen.getByText(paragraph)).toBeInTheDocument();
            });
        });

        it('renders HTML content via dangerouslySetInnerHTML', () => {
            const htmlData = [
                '<strong>Bold</strong> and <em>italic</em>',
                'Plain text item'
            ];
            render(
                <IaSummary isOpen summaryData={htmlData} onClose={jest.fn()} />
            );

            expect(screen.getByText('Bold')).toBeInTheDocument();
            expect(screen.getByText('Plain text item')).toBeInTheDocument();
        });

        it('renders bullet icons with aria-hidden', () => {
            const { container } = renderOpen();

            const bulletIcons = container.querySelectorAll(
                'mock-ds-common-icon[name="bullet-filled"]'
            );
            expect(bulletIcons).toHaveLength(defaultSummaryData.length);
            bulletIcons.forEach(icon => {
                expect(icon).toHaveAttribute('aria-hidden', 'true');
            });
        });

        it('renders the list container', () => {
            renderOpen();

            expect(screen.getByRole('list')).toBeInTheDocument();
        });
    });

    describe('footer section', () => {
        it('renders "Realizado con Inteligencia Artificial" text', () => {
            renderOpen();

            expect(
                screen.getByText('Realizado con Inteligencia Artificial')
            ).toBeInTheDocument();
        });

        it('renders the attribution as a footer element', () => {
            renderOpen();

            const footer = screen.getByRole('contentinfo');
            expect(footer).toBeInTheDocument();
            expect(footer).toHaveTextContent(
                'Realizado con Inteligencia Artificial'
            );
        });

        it('renders the ia-star icon with aria-hidden', () => {
            const { container } = renderOpen();

            const iaStarIcon = container.querySelector(
                'mock-ds-common-icon[name="ia-star"]'
            );
            expect(iaStarIcon).toBeInTheDocument();
            expect(iaStarIcon).toHaveAttribute('size', '16');
            expect(iaStarIcon).toHaveAttribute('type', 'color');
            expect(iaStarIcon).toHaveAttribute('aria-hidden', 'true');
        });
    });

    describe('className prop', () => {
        it('applies custom className to the container', () => {
            renderOpen({ className: 'custom-class' });

            const region = screen.getByRole('region', {
                name: 'Resumen de lectura con IA'
            });
            expect(region.className).toContain('custom-class');
        });

        it('always applies base classes regardless of custom className', () => {
            renderOpen({ className: 'extra' });

            const region = screen.getByRole('region', {
                name: 'Resumen de lectura con IA'
            });
            expect(region.className).toContain('bg-neutral-50');
            expect(region.className).toContain('p-16');
        });

        it('renders without errors when className is not provided', () => {
            expect(() => renderOpen({ className: undefined })).not.toThrow();
        });
    });

    describe('snapshots', () => {
        it('matches snapshot when open with default props', () => {
            const { asFragment } = renderOpen();
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot when closed (isOpen=false)', () => {
            const { asFragment } = render(
                <IaSummary
                    isOpen={false}
                    summaryData={defaultSummaryData}
                    onClose={jest.fn()}
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with a single summary item', () => {
            const { asFragment } = render(
                <IaSummary
                    isOpen
                    summaryData={['Single summary point']}
                    onClose={jest.fn()}
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with custom className', () => {
            const { asFragment } = renderOpen({ className: 'rounded-lg mt-8' });
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with HTML content in summary items', () => {
            const { asFragment } = render(
                <IaSummary
                    isOpen
                    summaryData={['<strong>Bold point</strong>', 'Plain point']}
                    onClose={jest.fn()}
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
