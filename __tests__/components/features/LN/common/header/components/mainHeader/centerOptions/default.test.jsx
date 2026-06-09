import React from 'react';
import { render, screen } from '@testing-library/react';
import CenterOptions from '../../../../../../../../../components/features/LN/common/header/components/mainHeader/centerOptions/default';

jest.mock(
    '../../../../../../../../../components/features/LN/common/header/styles',
    () => ({
        centerOptionsVariants: jest.fn(() => 'mocked-center-class')
    })
);

jest.mock(
    '../../../../../../../../../components/features/LN/common/header/context',
    () => ({
        useHeaderContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../../../../components/features/ui/ln/link/default',
    () =>
        jest.fn(({ href, className, children }) => (
            <a href={href} className={className}>
                {children}
            </a>
        ))
);

jest.mock(
    '../../../../../../../../../components/features/LN/common/header/components/mainHeader/centerOptions/Logo',
    () => jest.fn(() => <svg data-testid="logo-svg" />)
);

const {
    useHeaderContext
} = require('../../../../../../../../../components/features/LN/common/header/context');
const {
    centerOptionsVariants
} = require('../../../../../../../../../components/features/LN/common/header/styles');

describe('CenterOptions — LN/common header', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useHeaderContext.mockReturnValue({ position: 'default' });
    });

    describe('navigation link', () => {
        it('should render a link pointing to the homepage', () => {
            render(<CenterOptions />);
            expect(screen.getByRole('link')).toHaveAttribute('href', '/');
        });

        it('should apply the className returned by centerOptionsVariants', () => {
            render(<CenterOptions />);
            expect(screen.getByRole('link')).toHaveAttribute(
                'class',
                'mocked-center-class'
            );
        });
    });

    describe('Logo component', () => {
        it('should render the Logo', () => {
            render(<CenterOptions />);
            expect(screen.getByTestId('logo-svg')).toBeInTheDocument();
        });
    });

    describe('position variant', () => {
        it('should call centerOptionsVariants with the position from context', () => {
            useHeaderContext.mockReturnValue({ position: 'sticky' });
            render(<CenterOptions />);
            expect(centerOptionsVariants).toHaveBeenCalledWith({
                position: 'sticky'
            });
        });

        it('should call centerOptionsVariants with default position', () => {
            render(<CenterOptions />);
            expect(centerOptionsVariants).toHaveBeenCalledWith({
                position: 'default'
            });
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with default position', () => {
            const { asFragment } = render(<CenterOptions />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with sticky position', () => {
            useHeaderContext.mockReturnValue({ position: 'sticky' });
            const { asFragment } = render(<CenterOptions />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
