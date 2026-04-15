import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HowTo from '../../../../../../components/features/LN/common/howTo/default';

jest.mock(
    '../../../../../../components/features/LN/common/divider/default',
    () => () => <hr data-testid="divider" />
);

describe('components - features - LN - common - howTo', () => {
    it('returns null if number is 0 or falsy', () => {
        const { container } = render(<HowTo number={0} title="Título" />);
        expect(container.firstChild).toBeNull();
    });

    it('returns null if title is empty', () => {
        const { container } = render(<HowTo number={1} title="" />);
        expect(container.firstChild).toBeNull();
    });

    it('renders correctly with valid props (snapshot)', () => {
        const { asFragment } = render(
            <HowTo number={2} title="Preparar los ingredientes" />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('applies correct accessibility attributes', () => {
        render(<HowTo number={3} title="Mezclar todo" />);

        const section = screen.getByRole('region', { name: /mezclar todo/i });
        expect(section).not.toHaveAttribute('id');

        const heading = screen.getByRole('heading', {
            level: 3,
            name: /mezclar todo/i
        });
        expect(heading).not.toHaveAttribute('aria-label');

        // la sección apunta al heading mediante aria-labelledby
        const labelledById = section.getAttribute('aria-labelledby');
        expect(labelledById).toBeTruthy();
        expect(heading).toHaveAttribute('id', labelledById);
    });

    it('renders the step number visually hidden from screen readers', () => {
        render(<HowTo number={3} title="Mezclar todo" />);
        const numberContainer = screen
            .getByText('3')
            .closest('[aria-hidden="true"]');
        expect(numberContainer).toBeInTheDocument();
    });
});
