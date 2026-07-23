import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import CajaCarruselProvider from '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext';
import usePersistentJwPlayer from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/usePersistentJwPlayer';

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/useJwScriptLoaded',
    () => ({
        __esModule: true,
        default: jest.fn(() => true)
    })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/urlForPrerollAds',
    () => ({
        __esModule: true,
        default: jest.fn(() => 'ads-url')
    })
);

jest.mock('../../../../../../components/private/LN/common/utils/isSSR', () => ({
    __esModule: true,
    default: jest.fn(() => false)
}));

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerManager',
    () => ({
        open: jest.fn(),
        close: jest.fn(),
        goToIndex: jest.fn()
    })
);

describe('usePersistentJwPlayer', () => {
    const manager = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerManager');

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn(() => Promise.reject(new Error('network')));
    });

    afterEach(() => {
        delete global.fetch;
    });

    const renderWithProvider = props =>
        renderHook(() => usePersistentJwPlayer(props), {
            wrapper: CajaCarruselProvider
        });

    it('calls close() on unmount and reopens via open() on remount', async () => {
        const props = {
            listVideoData: [{ id: 'v1', counterVideo: 1 }],
            variant: 'vertical',
            handleNextCallback: jest.fn()
        };

        const { unmount } = renderWithProvider(props);

        await waitFor(() => expect(manager.open).toHaveBeenCalledTimes(1));

        unmount();
        expect(manager.close).toHaveBeenCalledTimes(1);

        const { unmount: unmount2 } = renderWithProvider(props);
        await waitFor(() => expect(manager.open).toHaveBeenCalledTimes(2));
        unmount2();
        expect(manager.close).toHaveBeenCalledTimes(2);
    });

    it('forwards the scrollerRef option through to open()', async () => {
        const scrollerRef = { current: document.createElement('ul') };
        const props = {
            listVideoData: [{ id: 'v1', counterVideo: 1 }],
            variant: 'vertical',
            handleNextCallback: jest.fn(),
            scrollerRef
        };

        renderWithProvider(props);

        await waitFor(() => expect(manager.open).toHaveBeenCalledTimes(1));
        expect(manager.open).toHaveBeenCalledWith(
            expect.objectContaining({ scrollerRef })
        );
    });
});
