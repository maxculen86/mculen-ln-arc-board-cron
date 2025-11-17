import { renderHook } from '@testing-library/react';
import { useAdManager } from '../../../../../components/features/foodit-global/Banners/hooks/useAdManager';

jest.mock(
    '../../../../../components/features/foodit-global/Banners/_helpers/bannersScript',
    () => ({
        createScriptBanners: jest.fn()
    })
);

describe('useAdManager', () => {
    beforeEach(() => {
        window.googletag = {
            cmd: {
                push: jest.fn(fn => fn())
            },
            defineSlot: jest.fn().mockReturnValue({
                setTargeting: jest.fn(),
                addService: jest.fn()
            }),
            pubads: jest.fn().mockReturnValue({
                setTargeting: jest.fn(),
                enableSingleRequest: jest.fn()
            }),
            enableServices: jest.fn(),
            display: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize googletag and call the necessary functions', () => {
        const slotId = 'test-slot';
        const size = [[320, 50]];
        const divId = 'test-div';
        const targetings = { key: 'value' };

        const { result } = renderHook(() =>
            useAdManager(slotId, size, divId, targetings)
        );

        expect(result.current).toBeNull();
        expect(window.googletag.cmd.push).toHaveBeenCalled();
        expect(window.googletag.defineSlot).toHaveBeenCalledWith(
            slotId,
            size,
            divId
        );
        expect(
            window.googletag.pubads().enableSingleRequest
        ).toHaveBeenCalled();
        expect(window.googletag.enableServices).toHaveBeenCalled();
        expect(window.googletag.display).toHaveBeenCalledWith(divId);
    });

    it('should handle errors', () => {
        const slotId = 'test-slot';
        const size = [[320, 50]];
        const divId = 'test-div';
        const targetings = { key: 'value' };

        window.googletag.cmd.push = jest.fn(() => {
            throw new Error('Test error');
        });

        const { result } = renderHook(() =>
            useAdManager(slotId, size, divId, targetings)
        );

        expect(result.current).toEqual(new Error('Test error'));
    });
});
