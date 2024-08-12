import React from 'react';
import { render, act } from '@testing-library/react';
import { getLocationTooltip } from '../../../../../../components/features/LN-10-global/glossary/helpers';
import { findObjectGlossary } from '../../../../../../components/features/LN-10-global/glossary/helpers';
import { useTooltip } from '../../../../../../components/features/LN-10-global/glossary/hooks/useTooltip';
import arrayData from '../../../../../../__mocks__/data/glossary/arrayWords.json';

jest.mock(
    '../../../../../../components/features/LN-10-global/glossary/helpers',
    () => ({
        handleEventWords: jest.fn(),
        findObjectGlossary: jest.fn(),
        getLocationTooltip: jest.fn()
    })
);

const TestComponent = () => {
    const { show, key, value, tooltipLocation } = useTooltip(arrayData);
    return (
        <div data-testid="mock-tooltip" style={tooltipLocation}>
            <span data-testid="state">{show ? 'show' : 'hide'}</span>
            <span data-testid="key">{key}</span>
            <span data-testid="value">{value}</span>
        </div>
    );
};

describe('features - LN-10-GLOBAL - glossary - hooks - useTooltip', () => {
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
    it('should return default values', () => {
        const { getByTestId } = render(<TestComponent />);
        expect(getByTestId('mock-tooltip')).toHaveAttribute(
            'style',
            'left: 0px; top: 0px;'
        );
        expect(getByTestId('state')).toHaveTextContent('hide');
        expect(getByTestId('key')).toHaveTextContent('');
        expect(getByTestId('value')).toHaveTextContent('');
    });
    it('should return default values when the event type is mouseleave, regardless of the devices innerWidth', () => {
        const { getByTestId } = render(<TestComponent />);
        window.innerWidth = 1280;
        act(() => {
            window.LN.observable.publish({
                event: { type: 'mouseleave' },
                key: arrayData[0].key,
                show: true
            });
        });
        expect(getByTestId('mock-tooltip')).toHaveAttribute(
            'style',
            'left: 0px; top: 0px;'
        );
        expect(getByTestId('state')).toHaveTextContent('hide');
        expect(getByTestId('key')).toHaveTextContent('');
        expect(getByTestId('value')).toHaveTextContent('');
    });
    it('should return default values when event type is mouseennter but innetWidth is < 1280px (mobile/tablet)', () => {
        const { getByTestId } = render(<TestComponent />);
        window.innerWidth = 768;
        getLocationTooltip.mockReturnValue({ left: 150, top: 150 });
        act(() => {
            window.LN.observable.publish({
                event: { type: 'mouseenter' },
                key: arrayData[0].key,
                show: true
            });
        });

        expect(getByTestId('mock-tooltip')).toHaveAttribute(
            'style',
            'left: 0px; top: 0px;'
        );
        expect(getByTestId('state')).toHaveTextContent('hide');
        expect(getByTestId('key')).toHaveTextContent('');
        expect(getByTestId('value')).toHaveTextContent('');
    });
    it('should return values correctly when event type is mouseennter and innerWidth is > 1279px (desktop)', () => {
        const { getByTestId } = render(<TestComponent />);
        window.innerWidth = 1280;
        getLocationTooltip.mockReturnValue({ left: 150, top: 150 });
        act(() => {
            window.LN.observable.publish({
                event: { type: 'mouseenter' },
                key: arrayData[0].key,
                show: true
            });
        });
        expect(getByTestId('mock-tooltip')).toHaveAttribute(
            'style',
            'left: 150px; top: 150px;'
        );
        expect(getByTestId('state')).toHaveTextContent('show');
        expect(getByTestId('key')).toHaveTextContent(arrayData[0].key);
        expect(getByTestId('value')).toHaveTextContent(arrayData[0].value);
    });
});
