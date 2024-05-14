import React from 'react';
import '@testing-library/jest-dom';
import { BellButton } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/bellButton';
import { useHeaderContext } from '../../../../../../../../components/features/LN-10-global/header/context';
import { render } from '@testing-library/react';

jest.mock(
    '../../../../../../../../components/features/LN-10-global/header/context',
    () => {
        return {
            useHeaderContext: jest.fn(() => ({
                intersectingSentinel: true
            }))
        };
    }
);
describe('components - features - LN-10-global - header - mainHeader - rightOptions - BellButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BellButton />);
        expect(baseElement).toBeInTheDocument();
    });
    it('should show tooltip with data-visible="true" when .header-sentinel is intersecting ', () => {
        const { container } = render(<BellButton />);
        const tooltip = container.querySelector('.notification-drawer-tooltip');
        expect(tooltip).toHaveAttribute('data-visible', 'false');
    });
    it('should hide tooltip with data-visible="false" when .header-sentinel is not intersecting ', () => {
        useHeaderContext.mockReturnValue({ intersectingSentinel: false });
        const { container } = render(<BellButton />);
        const tooltip = container.querySelector('.notification-drawer-tooltip');
        expect(tooltip).toHaveAttribute('data-visible', 'false');
    });

    it('should match snapshot', () => {
        useHeaderContext.mockReturnValue({ intersectingSentinel: true });
        const { container } = render(<BellButton />);
        expect(container).toMatchSnapshot();
    });
});
