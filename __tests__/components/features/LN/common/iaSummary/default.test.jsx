import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IaSummary from '../../../../../../components/features/LN/common/iaSummary/default';

jest.mock('@ln/ds-common-animatepresence', () => ({
    AnimatePresence: ({ show, children }) => (show ? children : null)
}));

const defaultSummaryData = [
    'First summary point',
    'Second summary point',
    'Third summary point'
];

const mockClose = jest.fn();
// El panel sólo lee `isOpen` del store; el dato del resumen llega por prop.
let mockState = { isOpen: true };

jest.mock(
    '../../../../../../components/features/LN/common/iaSummary/hooks/useIaSummaryState',
    () => ({
        useIaSummaryState: () => mockState
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/iaSummary/hooks/useIaSummaryActions',
    () => ({
        useIaSummaryActions: () => ({ close: mockClose })
    })
);

const renderOpen = (props = {}) =>
    render(<IaSummary summaryData={defaultSummaryData} {...props} />);

describe('Components - features - LN - common - iaSummary', () => {
    beforeEach(() => {
        mockClose.mockClear();
        mockState = { isOpen: true };
    });

    describe('null rendering', () => {
        it('returns null when summaryData is an empty array', () => {
            const { container } = render(<IaSummary summaryData={[]} />);

            expect(container.firstChild).toBeNull();
        });

        it('returns null when summaryData is not provided', () => {
            const { container } = render(<IaSummary />);

            expect(container.firstChild).toBeNull();
        });
    });

    describe('visibility', () => {
        it('does not render the panel when isOpen is false', () => {
            mockState = { isOpen: false };
            renderOpen();

            expect(
                screen.queryByRole('region', {
                    name: 'Resumen de lectura con IA'
                })
            ).not.toBeInTheDocument();
        });

        it('renders the panel when isOpen is true', () => {
            renderOpen();

            expect(
                screen.getByRole('region', {
                    name: 'Resumen de lectura con IA'
                })
            ).toBeInTheDocument();
        });
    });

    describe('accessibility — landmark region', () => {
        it('renders a section landmark with the correct aria-label', () => {
            renderOpen();

            const region = screen.getByRole('region', {
                name: 'Resumen de lectura con IA'
            });
            expect(region.tagName).toBe('SECTION');
        });
    });

    describe('header section', () => {
        it('renders the "Resumen" heading', () => {
            renderOpen();

            const heading = screen.getByRole('heading', { level: 2 });
            expect(heading).toHaveTextContent('Resumen');
        });

        it('renders the sparkling icon with aria-hidden', () => {
            const { container } = renderOpen();

            const sparklingIcon = container.querySelector(
                'mock-ds-common-icon[name="sparkling-filled"]'
            );
            expect(sparklingIcon).toBeInTheDocument();
            expect(sparklingIcon).toHaveAttribute('aria-hidden', 'true');
        });

        it('heading appears before the close button in the DOM', () => {
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
        it('renders with the correct aria-label', () => {
            renderOpen();

            expect(
                screen.getByRole('button', { name: 'Cerrar resumen' })
            ).toBeInTheDocument();
        });

        it('renders the close icon with aria-hidden', () => {
            const { container } = renderOpen();

            const closeIcon = container.querySelector(
                'mock-ds-common-icon[name="close"]'
            );
            expect(closeIcon).toBeInTheDocument();
            expect(closeIcon).toHaveAttribute('aria-hidden', 'true');
        });

        it('calls the close action when clicked', () => {
            renderOpen();

            fireEvent.click(
                screen.getByRole('button', { name: 'Cerrar resumen' })
            );

            expect(mockClose).toHaveBeenCalledTimes(1);
        });
    });

    describe('summary list', () => {
        it('renders one list item per summary point', () => {
            renderOpen();

            expect(screen.getAllByRole('listitem')).toHaveLength(
                defaultSummaryData.length
            );
        });

        it('renders each paragraph text inside a list item', () => {
            renderOpen();

            defaultSummaryData.forEach(paragraph => {
                expect(screen.getByText(paragraph)).toBeInTheDocument();
            });
        });

        it('renders HTML content via dangerouslySetInnerHTML', () => {
            render(
                <IaSummary
                    summaryData={[
                        '<strong>Bold</strong> and <em>italic</em>',
                        'Plain text item'
                    ]}
                />
            );

            expect(screen.getByText('Bold')).toBeInTheDocument();
            expect(screen.getByText('Plain text item')).toBeInTheDocument();
        });

        it('renders one bullet icon per item, all aria-hidden', () => {
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
        it('renders the "Resumen realizado con IA" attribution', () => {
            renderOpen();

            expect(
                screen.getByText('Resumen realizado con IA')
            ).toBeInTheDocument();
        });

        it('renders the attribution inside a footer element', () => {
            const { container } = renderOpen();

            const footer = container.querySelector('footer');
            expect(footer).toHaveTextContent('Resumen realizado con IA');
        });
    });

    describe('className prop', () => {
        it('applies a custom className to the section', () => {
            renderOpen({ className: 'custom-class' });

            const region = screen.getByRole('region', {
                name: 'Resumen de lectura con IA'
            });
            expect(region.className).toContain('custom-class');
        });

        it('always applies the base classes regardless of custom className', () => {
            renderOpen({ className: 'extra' });

            const region = screen.getByRole('region', {
                name: 'Resumen de lectura con IA'
            });
            expect(region.className).toContain('p-16');
            expect(region.className).toContain('rounded-8');
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
            mockState = { isOpen: false };
            const { asFragment } = renderOpen();
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with a single summary item', () => {
            const { asFragment } = render(
                <IaSummary summaryData={['Single summary point']} />
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
                    summaryData={['<strong>Bold point</strong>', 'Plain point']}
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
