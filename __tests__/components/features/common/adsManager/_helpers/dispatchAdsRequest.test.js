/* global jest, describe, it, expect, beforeEach, afterEach */
import dispatchAdsRequest from '../../../../../../components/features/LN/common/adsManager/_helpers/dispatchAdsRequest';
import {
    filterCommercialBannersByFrequencyCap,
    setCommercialFrequencyCapCookie
} from '../../../../../../components/private/LN/common/utils/bannerHelper';
import isWebview from '../../../../../../components/private/common/utils/isWebview';

jest.mock(
    '../../../../../../components/private/LN/common/utils/bannerHelper',
    () => ({
        defineSlot: jest.fn(slot => slot),
        filterCommercialBannersByFrequencyCap: jest.fn(banners => banners),
        getCommercialFrequencyCapBannersBySlot: jest.fn(() => ({})),
        setCommercialFrequencyCapCookie: jest.fn()
    })
);

jest.mock('../../../../../../components/private/common/utils/isWebview', () =>
    jest.fn()
);

describe('dispatchAdsRequest', () => {
    let googletagMock;
    let apstagMock;
    let pbjsMock;

    let refreshMock;
    let disableInitialLoadMock;
    let addEventListenerMock;

    beforeEach(() => {
        jest.useFakeTimers();

        refreshMock = jest.fn();
        disableInitialLoadMock = jest.fn();
        addEventListenerMock = jest.fn();

        // Setup window globals
        googletagMock = {
            cmd: [],
            pubads: jest.fn(() => ({
                refresh: refreshMock,
                disableInitialLoad: disableInitialLoadMock,
                addEventListener: addEventListenerMock
            }))
        };
        global.googletag = googletagMock;

        apstagMock = {
            fetchBids: jest.fn((config, callback) => {
                // Not executing callback immediately to control when it finishes
            }),
            setDisplayBids: jest.fn()
        };
        global.apstag = apstagMock;

        pbjsMock = {
            que: [],
            rp: {
                requestBids: jest.fn()
            }
        };
        global.pbjs = pbjsMock;

        // Process cmd queues automatically for testing
        Object.defineProperty(googletagMock.cmd, 'push', {
            value: jest.fn(cb => cb())
        });
        Object.defineProperty(pbjsMock.que, 'push', {
            value: jest.fn(cb => cb())
        });

        isWebview.mockReturnValue(false);
        filterCommercialBannersByFrequencyCap.mockImplementation(b => b);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        delete global.googletag;
        delete global.apstag;
        delete global.pbjs;
    });

    it('should return early if there are no banners to request', () => {
        filterCommercialBannersByFrequencyCap.mockReturnValueOnce([]);
        dispatchAdsRequest([], { subscription: {} });
        expect(googletagMock.cmd.push).not.toHaveBeenCalled();
    });

    it('should execute both TAM and Prebid parallel auctions for prebidEnabled banners', () => {
        const banners = [
            {
                opt_div: 'caja1',
                adUnitPath: '/123/caja1',
                size: [[300, 250]],
                prebidEnabled: true
            }
        ];

        dispatchAdsRequest(banners);

        expect(apstagMock.fetchBids).toHaveBeenCalledTimes(1);
        expect(pbjsMock.rp.requestBids).toHaveBeenCalledTimes(1);

        // pubads().refresh is not called yet because auctions haven't finished
        expect(refreshMock).not.toHaveBeenCalled();
    });

    it('should call sendToGAM when both TAM and Prebid finish successfully', () => {
        const banners = [{ opt_div: 'caja1', prebidEnabled: true }];

        // Setup fetchBids to immediately invoke callback
        apstagMock.fetchBids.mockImplementationOnce((config, cb) => cb());
        // Setup requestBids to immediately invoke callback
        pbjsMock.rp.requestBids.mockImplementationOnce(({ callback }) =>
            callback()
        );

        dispatchAdsRequest(banners);

        // TAM finishes
        expect(apstagMock.setDisplayBids).toHaveBeenCalled();

        // both finished, so it should call refresh
        expect(refreshMock).toHaveBeenCalledWith(banners);
    });

    it('should wait for both to finish before calling sendToGAM', () => {
        const banners = [{ opt_div: 'caja1', prebidEnabled: true }];
        let tamCb, prebidCb;

        apstagMock.fetchBids.mockImplementationOnce((config, cb) => {
            tamCb = cb;
        });
        pbjsMock.rp.requestBids.mockImplementationOnce(({ callback }) => {
            prebidCb = callback;
        });

        dispatchAdsRequest(banners);

        expect(refreshMock).not.toHaveBeenCalled();

        tamCb(); // TAM finishes
        expect(refreshMock).not.toHaveBeenCalled(); // Still waiting for Prebid

        prebidCb(); // Prebid finishes
        expect(refreshMock).toHaveBeenCalledWith(banners);
    });

    it('should call sendToGAM with fallback true if failsafe timeout is reached', () => {
        const banners = [{ opt_div: 'caja1', prebidEnabled: true }];

        dispatchAdsRequest(banners);

        expect(refreshMock).not.toHaveBeenCalled();

        // Fast-forward 3.5 seconds
        jest.advanceTimersByTime(3500);

        expect(refreshMock).toHaveBeenCalledWith(banners);
    });

    it('should NOT call Prebid if user is on a webview', () => {
        isWebview.mockReturnValue(true);
        const banners = [{ opt_div: 'caja1', prebidEnabled: true }];

        dispatchAdsRequest(banners);

        expect(apstagMock.fetchBids).toHaveBeenCalled();
        expect(pbjsMock.rp.requestBids).not.toHaveBeenCalled();
    });

    it('should immediately refresh nonHeaderBiddingSlots', () => {
        const banners = [{ opt_div: 'caja2', prebidEnabled: false }];

        dispatchAdsRequest(banners);

        expect(googletagMock.pubads().refresh).toHaveBeenCalledWith(banners);
        // Prebid/TAM should not be called
        expect(apstagMock.fetchBids).not.toHaveBeenCalled();
        expect(pbjsMock.rp.requestBids).not.toHaveBeenCalled();
    });

    it('should handle slotRenderEnded event correctly', () => {
        const banners = [
            { opt_div: 'caja1', prebidEnabled: false, withoutHide: false }
        ];

        let slotRenderEndedCb;
        addEventListenerMock.mockImplementationOnce((event, cb) => {
            if (event === 'slotRenderEnded') slotRenderEndedCb = cb;
        });

        dispatchAdsRequest(banners);

        // Mock banner node
        const classListRemoveSpy = jest.fn();
        const bannerNode = {
            parentNode: { classList: { remove: classListRemoveSpy } }
        };
        jest.spyOn(document, 'getElementById').mockReturnValue(bannerNode);

        // Trigger event
        slotRenderEndedCb({
            slot: { getSlotElementId: () => 'caja1' },
            isEmpty: false
        });

        expect(setCommercialFrequencyCapCookie).toHaveBeenCalled();
        expect(classListRemoveSpy).toHaveBeenCalledWith('none');

        document.getElementById.mockRestore();
    });
});
