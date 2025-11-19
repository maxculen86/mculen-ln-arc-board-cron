import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Divider } from '../../../../../../components/features/LN-nota/share/_children/Divider';

describe('components - features - LN-nota - share - _children - Divider', () => {
    describe('Behavior tests', () => {
        it('should render horizontal divider by default with correct classes', () => {
            render(<Divider />);
            const separators = screen.getAllByRole('separator');

            expect(separators).toHaveLength(2);

            expect(separators[0]).toHaveClass('l-none', 'vertical', 'mx-16');

            expect(separators[1]).toHaveClass('l-only', 'my-16');
        });

        it('should render vertical divider with correct classes', () => {
            render(<Divider variant="vertical" />);
            const separator = screen.getByRole('separator');

            expect(separator).toBeInTheDocument();
            expect(screen.getAllByRole('separator')).toHaveLength(1);

            expect(separator).toHaveClass('vertical', 'mx-16');
        });

        it('should render horizontal divider for non-vertical variants', () => {
            render(<Divider variant="some-random-value" />);
            const separators = screen.getAllByRole('separator');

            expect(separators).toHaveLength(2);

            expect(separators[0]).toHaveClass('l-none', 'vertical', 'mx-16');
            expect(separators[1]).toHaveClass('l-only', 'my-16');
        });
    });

    describe('Snapshot tests', () => {
        it('should match snapshot with default variant (horizontal)', () => {
            const { asFragment } = render(<Divider />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('should match snapshot with vertical variant', () => {
            const { asFragment } = render(<Divider variant="vertical" />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
