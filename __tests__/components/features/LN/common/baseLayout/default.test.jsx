import React from 'react';
import { render, screen } from '@testing-library/react';
import BaseLayout from '../../../../../../components/features/LN/common/baseLayout/default';
import Context from 'fusion:context';

jest.mock(
    '../../../../../../components/features/LN/common/header/default',
    () =>
        function MockHeader() {
            return <div data-testid="mock-header" />;
        }
);

jest.mock(
    '../../../../../../components/features/LN/common/navBar/default',
    () => {
        const MockNavbar = () => <div data-testid="mock-navbar" />;
        return { __esModule: true, default: MockNavbar };
    }
);

jest.mock(
    '../../../../../../components/features/LN/common/footer/default',
    () => {
        const MockFooter = () => <div data-testid="mock-footer" />;
        return {
            __esModule: true,
            FooterBase: MockFooter,
            default: MockFooter
        };
    }
);

jest.mock(
    '../../../../../../components/features/LN/common/drawerSections/default',
    () =>
        function MockDrawerSections() {
            return <div data-testid="mock-drawer-sections" />;
        }
);

Context.useAppContext = jest.fn(() => ({
    deployment: arg => arg,
    contextPath: '/pf'
}));

describe('components - features - LN - common - baseLayout', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

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
        it('should render div with id main-content', () => {
            const { container } = render(
                <BaseLayout>
                    <div>Test Content</div>
                </BaseLayout>
            );
            const mainContent = container.querySelector('#main-content');
            expect(mainContent).toBeInTheDocument();
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
