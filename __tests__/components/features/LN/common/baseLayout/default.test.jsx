import React from 'react';
import { render, screen } from '@testing-library/react';
import BaseLayout from '../../../../../../components/features/LN/common/baseLayout/default';
import Context from 'fusion:context';

Context.useAppContext = jest.fn(() => ({
    deployment: arg => arg,
    contextPath: '/pf'
}));

describe('components - features - LN - common - baseLayout', () => {
    describe('Render', () => {
        it('should render the base layout inside main with id content', () => {
            render(
                <BaseLayout data-testid="base-layout-test-id">
                    <div>Test Content</div>
                </BaseLayout>
            );
            const baseLayout = screen.getByTestId('base-layout-test-id');
            expect(baseLayout).toBeInTheDocument();
            expect(screen.getByText('Test Content')).toBeInTheDocument();
        });
        it('should render tag <main> with id content', () => {
            render(
                <BaseLayout>
                    <div>Test Content</div>
                </BaseLayout>
            );
            const main = screen.getByRole('main');
            expect(main).toBeInTheDocument();
            expect(main).toHaveAttribute('id', 'content');
        });
    });
    describe('Snapshots', () => {
        it('should maintain expected DOM structure with children', () => {
            const { asFragment } = render(
                <BaseLayout>
                    <div>Test Content</div>
                </BaseLayout>
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
