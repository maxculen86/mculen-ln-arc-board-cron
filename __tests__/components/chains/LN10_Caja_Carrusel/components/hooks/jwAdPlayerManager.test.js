jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper',
    () => ({
        buildAdPlayerConfig: jest.fn(() => ({}))
    })
);

const loadModule = () =>
    require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwAdPlayerManager'); // eslint-disable-line global-require

describe('jwAdPlayerManager', () => {
    let module;
    let player;
    let listeners;
    let readyHandlers;

    const createPlayerMock = () => {
        const handlers = {};
        readyHandlers = [];

        const mockPlayer = {
            setup: jest.fn().mockReturnThis(),
            on: jest.fn((event, callback) => {
                if (event === 'ready') {
                    readyHandlers.push(callback);
                    return;
                }
                handlers[event] = callback;
            }),
            off: jest.fn(),
            resize: jest.fn(),
            remove: jest.fn(),
            _emit(event) {
                if (handlers[event]) handlers[event]();
            }
        };

        return { mockPlayer, handlers };
    };

    beforeEach(() => {
        jest.resetModules();
        document.body.innerHTML = '';
        jest.useFakeTimers();

        ({ mockPlayer: player, handlers: listeners } = createPlayerMock());
        window.jwplayer = jest.fn(() => player);
        module = loadModule();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
        delete window.jwplayer;
    });

    it('hands off after the provider callback boundary when the ad ends', () => {
        const onImpression = jest.fn();
        const onHandoff = jest.fn();
        const onError = jest.fn();
        const slotElement = document.createElement('div');
        slotElement.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 320,
            height: 180
        }));

        module.playPreroll({
            config: { playlist: [{ mediaid: 'video-3' }] },
            slotElement,
            mountElement: document.body,
            onImpression,
            onHandoff,
            onError
        });

        expect(player.setup).toHaveBeenCalledTimes(1);
        expect(player.setup).toHaveBeenCalledWith({
            playlist: [{ mediaid: 'video-3' }]
        });

        listeners.adImpression();
        listeners.adBreakEnd();
        jest.runAllTicks();

        expect(onImpression).toHaveBeenCalledTimes(1);
        expect(onHandoff).toHaveBeenCalledTimes(1);
        expect(onError).not.toHaveBeenCalled();

        module.destroy();
        expect(player.remove).toHaveBeenCalledTimes(1);
    });

    it('cleans up and reports setup exceptions synchronously', () => {
        player.setup.mockImplementation(() => {
            throw new Error('setup failed');
        });
        const onError = jest.fn();

        module.playPreroll({
            config: {},
            onError,
            mountElement: document.body
        });

        expect(onError).toHaveBeenCalledTimes(1);
        expect(document.getElementById(module.AD_HOST_ID)).toBeNull();
    });

    it('ignores a stale ready callback from an older controller and detached slot', () => {
        const firstSlot = document.createElement('div');
        const secondSlot = document.createElement('div');
        document.body.append(firstSlot, secondSlot);
        firstSlot.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 320,
            height: 180
        }));
        secondSlot.getBoundingClientRect = jest.fn(() => ({
            top: 10,
            left: 10,
            width: 320,
            height: 180
        }));

        let firstCurrent = true;
        module.playPreroll({
            config: {},
            slotElement: firstSlot,
            mountElement: document.body,
            isCurrent: () => firstCurrent
        });
        module.playPreroll({
            config: {},
            slotElement: secondSlot,
            mountElement: document.body,
            isCurrent: () => true
        });

        firstCurrent = false;
        firstSlot.remove();
        firstSlot.getBoundingClientRect.mockClear();
        secondSlot.getBoundingClientRect.mockClear();

        readyHandlers[0]();
        expect(firstSlot.getBoundingClientRect).not.toHaveBeenCalled();
        expect(secondSlot.getBoundingClientRect).not.toHaveBeenCalled();

        readyHandlers[1]();
        expect(secondSlot.getBoundingClientRect).toHaveBeenCalled();
    });

    it('defers one terminal handoff until the provider callback stack has unwound', () => {
        const scheduled = [];
        const onHandoff = jest.fn();

        module.playPreroll({
            config: { playlist: [{ mediaid: 'video-3' }] },
            mountElement: document.body,
            onHandoff,
            scheduleAfterProviderCallback: callback => scheduled.push(callback)
        });

        listeners.adBreakEnd();
        listeners.adBreakEnd();
        listeners.adError();

        expect(player.remove).not.toHaveBeenCalled();
        expect(onHandoff).not.toHaveBeenCalled();
        expect(scheduled).toHaveLength(1);

        scheduled[0]();

        expect(player.remove).toHaveBeenCalledTimes(1);
        expect(onHandoff).toHaveBeenCalledTimes(1);
    });

    it('observes content-resume requests without authorizing a handoff', () => {
        const scheduled = [];
        const onResumeRequested = jest.fn();
        const onHandoff = jest.fn();

        module.playPreroll({
            config: { playlist: [{ mediaid: 'video-3' }] },
            mountElement: document.body,
            onHandoff,
            onResumeRequested,
            scheduleAfterProviderCallback: callback => scheduled.push(callback)
        });

        listeners.adRequestedContentResume();

        expect(onResumeRequested).toHaveBeenCalledTimes(1);
        expect(scheduled).toHaveLength(0);
        expect(onHandoff).not.toHaveBeenCalled();
    });

    it('terminalizes a skipped ad once after the provider callback boundary', () => {
        const scheduled = [];
        const onHandoff = jest.fn();

        module.playPreroll({
            config: { playlist: [{ mediaid: 'video-3' }] },
            mountElement: document.body,
            onHandoff,
            scheduleAfterProviderCallback: callback => scheduled.push(callback)
        });

        listeners.adSkipped();
        listeners.adBreakEnd();
        scheduled[0]();

        expect(onHandoff).toHaveBeenCalledTimes(1);
        expect(onHandoff).toHaveBeenCalledWith(
            expect.objectContaining({ reason: 'skip' })
        );
    });
});
