import { renderHook, act } from '@testing-library/react';
import useHandlerBanner from '../useHandlerBanner';
import * as utils from '@ln/utils';
import * as bannerHelper from 'private/LN/common/utils/bannerHelper';

jest.mock('@ln/utils');
jest.mock('private/LN/common/utils/bannerHelper');

describe('useHandlerBanner hook', () => {
    const mockListVideoData = [
        { id: 1, isBanner: false },
        { id: 2, isBanner: true },
        { id: 3, isBanner: false }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        utils.getTypeOfDevicev2.mockReturnValue('desktop');
        bannerHelper.getUnicBannerInDom.mockReturnValue(null);
        bannerHelper.displayUnicBanner.mockImplementation(() => {});
        bannerHelper.hideBanner.mockImplementation(() => {});
        document.querySelector = jest
            .fn()
            .mockReturnValue(document.createElement('div'));
    });

    it('should initialize isBannerViewed as false', () => {
        const { result } = renderHook(() =>
            useHandlerBanner({
                listVideoData: mockListVideoData,
                currentIndex: 0,
                isMobile: false
            })
        );

        expect(result.current.isBannerViewed).toBe(false);
    });

    it('should set isBannerViewed to true on mobile if current item is banner', () => {
        renderHook(() =>
            useHandlerBanner({
                listVideoData: mockListVideoData,
                currentIndex: 1,
                isMobile: true
            })
        );
    });

    describe('handleBannerViewed', () => {
        it('should set isBannerViewed to true when moving forward to a banner on desktop', () => {
            const { result } = renderHook(() =>
                useHandlerBanner({
                    listVideoData: mockListVideoData,
                    currentIndex: 0,
                    isMobile: false
                })
            );

            act(() => {
                result.current.handleBannerViewed({ currentPosition: 0 });
            });

            expect(result.current.isBannerViewed).toBe(true);
        });

        it('should NOT set isBannerViewed to true when moving forward to a banner on mobile', () => {
            const { result } = renderHook(() =>
                useHandlerBanner({
                    listVideoData: mockListVideoData,
                    currentIndex: 0,
                    isMobile: true
                })
            );

            act(() => {
                result.current.handleBannerViewed({ currentPosition: 0 });
            });

            expect(result.current.isBannerViewed).toBe(false);
        });
    });

    describe('banner display logic', () => {
        it('should call displayUnicBanner when isBannerViewed is true and banner exists', () => {
            const mockBanner = { opt_div: 'test-slot', other: 'data' };
            bannerHelper.getUnicBannerInDom.mockReturnValue(mockBanner);

            const { result } = renderHook(() =>
                useHandlerBanner({
                    listVideoData: mockListVideoData,
                    currentIndex: 0,
                    isMobile: false
                })
            );

            act(() => {
                result.current.handleBannerViewed({ currentPosition: 0 });
            });

            expect(bannerHelper.displayUnicBanner).toHaveBeenCalledWith({
                ...mockBanner,
                slotId: 'test-slot'
            });
        });

        it('should handle errors in displayUnicBanner gracefully', () => {
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});
            bannerHelper.getUnicBannerInDom.mockReturnValue({
                opt_div: 'test-slot'
            });
            bannerHelper.displayUnicBanner.mockImplementation(() => {
                throw new Error('Test error');
            });

            const { result } = renderHook(() =>
                useHandlerBanner({
                    listVideoData: mockListVideoData,
                    currentIndex: 0,
                    isMobile: false
                })
            );

            act(() => {
                result.current.handleBannerViewed({ currentPosition: 0 });
            });

            expect(consoleSpy).toHaveBeenCalledWith(
                'Error al cargar el banner:',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });
    });
});
