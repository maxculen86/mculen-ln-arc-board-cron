import React from 'react';
import { render, screen } from '@testing-library/react';
import { getTypeOfDevice } from '@ln/hooks';
import { useFloatingGroupButton } from '../../../../../../components/features/foodit-global/common/floatingGroupButton/useFloatingGroupButton';

jest.mock('@ln/hooks', () => ({
    getTypeOfDevice: jest.fn()
}));

const TestComponent = ({ observerSelector }) => {
    const { visible } = useFloatingGroupButton({ observerSelector });
    return (
        <div data-testid="visibility-status">
            {visible ? 'visible' : 'not visible'}
        </div>
    );
};

describe('useFloatingGroupButton', () => {
    const observerSelector = '#sentinel';

    const mockIntersectionObserver = isIntersecting => {
        global.IntersectionObserver = jest.fn(callback => ({
            observe: () => callback([{ isIntersecting }]),
            unobserve: jest.fn()
        }));
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return visible as true when device is mobile and element is not intersecting', () => {
        getTypeOfDevice.mockReturnValue('mobile');
        mockIntersectionObserver(false);

        render(<TestComponent observerSelector={observerSelector} />);
        expect(screen.getByTestId('visibility-status')).toHaveTextContent(
            'visible'
        );
    });

    it('should return visible as false when device is desktop', () => {
        getTypeOfDevice.mockReturnValue('desktop');
        mockIntersectionObserver(false);

        render(<TestComponent observerSelector={observerSelector} />);
        expect(screen.getByTestId('visibility-status')).toHaveTextContent(
            'not visible'
        );
    });
});
