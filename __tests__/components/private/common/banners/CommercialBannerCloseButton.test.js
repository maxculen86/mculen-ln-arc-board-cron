import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import CommercialBannerCloseButton from '../../../../../components/private/common/banners/CommercialBannerCloseButton';

jest.mock('@ln/contenidos-ui-button', () => ({
    Button: ({ children, label, dataEvent, dataSection, ...props }) => (
        <button type="button" {...props}>
            {children || label}
        </button>
    )
}));

describe('Private - Common - Banners - CommercialBannerCloseButton', () => {
    const originalReadyState = Object.getOwnPropertyDescriptor(
        document,
        'readyState'
    );
    const originalSetTimeout = window.setTimeout;
    const originalClearTimeout = window.clearTimeout;
    let readyState = 'loading';

    beforeEach(() => {
        readyState = 'loading';

        Object.defineProperty(document, 'readyState', {
            configurable: true,
            get: () => readyState
        });

        window.requestIdleCallback = jest.fn(callback => {
            callback();
            return 1;
        });
        window.cancelIdleCallback = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();

        if (originalReadyState) {
            Object.defineProperty(document, 'readyState', originalReadyState);
        }

        delete window.requestIdleCallback;
        delete window.cancelIdleCallback;
        window.setTimeout = originalSetTimeout;
        window.clearTimeout = originalClearTimeout;
    });

    it('keeps the commercial close button disabled until page load ends', () => {
        const onClose = jest.fn();

        render(
            <CommercialBannerCloseButton
                slotId="comercial_dsk"
                onClose={onClose}
            />
        );

        const button = screen.getByRole('button', { name: 'CERRAR' });

        expect(button).toBeDisabled();

        fireEvent.click(button);
        expect(onClose).not.toHaveBeenCalled();

        readyState = 'complete';

        act(() => {
            window.dispatchEvent(new Event('load'));
        });

        expect(window.requestIdleCallback).toHaveBeenCalledTimes(1);
        expect(button).not.toBeDisabled();

        fireEvent.click(button);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('renders non commercial close buttons enabled immediately', () => {
        const onClose = jest.fn();

        render(
            <CommercialBannerCloseButton slotId="caja1_dsk" onClose={onClose} />
        );

        const button = screen.getByRole('button', { name: 'CERRAR' });

        expect(button).not.toBeDisabled();

        fireEvent.click(button);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('enables the commercial close button when the page is already loaded', () => {
        readyState = 'complete';
        const onClose = jest.fn();

        render(
            <CommercialBannerCloseButton
                slotId="comercial_mob"
                onClose={onClose}
            />
        );

        const button = screen.getByRole('button', { name: 'CERRAR' });

        expect(window.requestIdleCallback).toHaveBeenCalledTimes(1);
        expect(button).not.toBeDisabled();

        fireEvent.click(button);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('falls back to setTimeout when requestIdleCallback is unavailable', () => {
        delete window.requestIdleCallback;
        window.setTimeout = jest.fn(callback => {
            callback();
            return 1;
        });
        window.clearTimeout = jest.fn();

        render(
            <CommercialBannerCloseButton
                slotId="comercial_dsk"
                onClose={jest.fn()}
            />
        );

        const button = screen.getByRole('button', { name: 'CERRAR' });

        expect(button).toBeDisabled();

        readyState = 'complete';

        act(() => {
            window.dispatchEvent(new Event('load'));
        });

        expect(window.setTimeout).toHaveBeenCalledTimes(1);
        expect(button).not.toBeDisabled();
    });
});
