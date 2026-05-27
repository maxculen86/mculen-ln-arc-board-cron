import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import { BaseLayout } from '../../../../../../components/features/LN-10-global/common/baseLayout/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../components/features/LN-10-global/header/default',
    () =>
        function MockHeader() {
            return <div data-testid="mock-header" />;
        }
);

jest.mock(
    '../../../../../../components/private/LN10/footer',
    () =>
        function MockFooter() {
            return <div data-testid="mock-footer" />;
        }
);

jest.mock(
    '../../../../../../components/features/LN-10-global/glossary/default',
    () =>
        function MockGlossary({ showGlossary }) {
            return (
                <div
                    data-testid="mock-glossary"
                    data-show-glossary={String(showGlossary)}
                />
            );
        }
);

jest.mock(
    '../../../../../../components/features/LN-10-global/pwaModal/default',
    () =>
        function MockPwaModal() {
            return <div data-testid="mock-pwa-modal" />;
        }
);

jest.mock(
    '../../../../../../components/layouts/helpers/initCtrlGrp',
    () =>
        function MockInitControlGroup() {
            return <div data-testid="mock-init-control-group" />;
        }
);

jest.mock(
    '../../../../../../components/features/LN-10-global/common/toasts/default',
    () =>
        function MockToasts() {
            return <div data-testid="mock-toasts" />;
        }
);

jest.mock(
    '../../../../../../components/features/LN/common/adsManager/components/adsStrategySelector',
    () =>
        function MockAdsStrategySelector() {
            return <div data-testid="mock-ads-strategy" />;
        }
);

describe('components - features - LN-10-global - common - baseLayout', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        useAppContext.mockReturnValue({
            layout: 'LN-home'
        });
    });

    it('should render wrapper and children', () => {
        render(
            <BaseLayout className="test-class">
                <div>Test Content</div>
            </BaseLayout>
        );

        expect(screen.getByText('Test Content')).toBeInTheDocument();
        expect(screen.getByTestId('mock-header')).toBeInTheDocument();
        expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });
});
