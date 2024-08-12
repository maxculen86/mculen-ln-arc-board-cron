import React from 'react';
import { render, act } from '@testing-library/react';
import { findObjectGlossary } from '../../../../../../components/features/LN-10-global/glossary/helpers';
import { useDialog } from '../../../../../../components/features/LN-10-global/glossary/hooks/useDialog';
import { useDisclosure } from '@ln/hooks';
import arrayData from '../../../../../../__mocks__/data/glossary/arrayWords.json';

jest.mock(
    '../../../../../../components/features/LN-10-global/glossary/helpers',
    () => ({
        handleEventWords: jest.fn(),
        findObjectGlossary: jest.fn()
    })
);

jest.mock('@ln/hooks', () => ({
    useDisclosure: jest.fn()
}));

const TestComponent = () => {
    const { isOpen, key, onClose, value } = useDialog(arrayData);
    return (
        <div>
            <span data-testid="state">{isOpen ? 'open' : 'closed'}</span>
            <span data-testid="key">{key}</span>
            <span data-testid="value">{value}</span>
            <button onClick={() => onClose()} title="Cerrar">
                Cerrar
            </button>
        </div>
    );
};

describe('features - LN-10-GLOBAL - glossary - hooks - useDialog', () => {
    const useDisclosureMock = {
        onOpen: jest.fn(),
        onClose: jest.fn(),
        isOpen: false
    };
    useDisclosure.mockReturnValue({
        ...useDisclosureMock
    });
    beforeEach(() => {
        findObjectGlossary.mockReturnValue({
            key: arrayData[0].key,
            value: arrayData[0].value
        });
        window.LN = {
            observable: {
                subscribe: jest.fn((event, callback) => {
                    if (event === 'handleGlossary') {
                        window.LN.observable.publish = callback;
                    }
                }),
                unsubscribe: jest.fn()
            }
        };
    });

    it('should return default values correctly', () => {
        const { getByTestId } = render(<TestComponent />);

        expect(getByTestId('state').textContent).toEqual('closed');
        expect(getByTestId('key').textContent).toEqual('');
        expect(getByTestId('value').textContent).toEqual('');
    });
    it('should return default values when event type is mouseleave and innerWidth < 1280 (mobile/tablet)', () => {
        const { getByTestId } = render(<TestComponent />);
        window.innerWidth = 1279;

        act(() => {
            window.LN.observable.publish({
                event: { type: 'mouseleave' },
                key: arrayData[0].key,
                show: true
            });
        });

        expect(getByTestId('state').textContent).toEqual('closed');
        expect(getByTestId('key').textContent).toEqual('');
        expect(getByTestId('value').textContent).toEqual('');
    });
    it('should return default values when event type is mouseenter and innerWidth > 1279 (desktop)', () => {
        const { getByTestId } = render(<TestComponent />);
        window.innerWidth = 1280;

        act(() => {
            window.LN.observable.publish({
                event: { type: 'mouseenter' },
                key: arrayData[0].key,
                show: true
            });
        });

        expect(getByTestId('state').textContent).toEqual('closed');
        expect(getByTestId('key').textContent).toEqual('');
        expect(getByTestId('value').textContent).toEqual('');
    });
    it('should return values correctly when event type is mouseenter and innerWidth < 1280 (mobile/tablet)', () => {
        const { getByTestId } = render(<TestComponent />);
        useDisclosure.mockReturnValue({ ...useDisclosureMock, isOpen: true });
        window.innerWidth = 768;

        act(() => {
            window.LN.observable.publish({
                event: { type: 'mouseenter' },
                key: arrayData[0].key,
                show: true
            });
        });

        expect(getByTestId('state').textContent).toEqual('open');
        expect(getByTestId('key').textContent).toEqual(arrayData[0].key);
        expect(getByTestId('value').textContent).toEqual(arrayData[0].value);
    });
});
