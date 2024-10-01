import React from 'react';
import { render, act } from '@testing-library/react';
import useIaVisibility from '../../../../../components/features/LN-10/IA/hooks/useIaVisibility';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

const mockObservable = {
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    publish: jest.fn()
};

describe('features - LN-common - IA - hooks - useIaVisibility', () => {
    const TestComponent = () => {
        useIaVisibility(mockObservable);
        return null;
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should subscribe to the observable on mount', () => {
        render(<TestComponent />);
        expect(mockObservable.subscribe).toHaveBeenCalledWith(
            'showIa',
            expect.any(Function)
        );
    });

    it('should update visibility when "showIa" event is triggered', () => {
        render(<TestComponent />);

        act(() => {
            mockObservable.subscribe.mock.calls[0][1]({ show: true });
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            action: 'IA',
            category: 'nota_ln9',
            label: 'cerrar_ia'
        });
    });

    it('should unsubscribe from the observable on unmount', () => {
        const { unmount } = render(<TestComponent />);
        unmount();
        expect(mockObservable.unsubscribe).toHaveBeenCalledWith(
            'showIa',
            expect.any(Function)
        );
    });
});
