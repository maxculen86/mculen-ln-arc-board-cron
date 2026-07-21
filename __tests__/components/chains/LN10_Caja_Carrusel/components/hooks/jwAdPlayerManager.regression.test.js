jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper',
    () => ({
        buildAdPlayerConfig: jest.fn(() => ({}))
    })
);

const loadModule = () =>
    require('../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwAdPlayerManager'); // eslint-disable-line global-require

describe('jwAdPlayerManager - UI regression', () => {
    let module;
    let player;

    beforeEach(() => {
        jest.resetModules();
        document.body.innerHTML = '';
        jest.useFakeTimers();

        const handlers = {};

        player = {
            setup: jest.fn().mockReturnThis(),
            on: jest.fn((event, callback) => {
                handlers[event] = callback;
            }),
            off: jest.fn(),
            resize: jest.fn(),
            remove: jest.fn(),
            setMute: jest.fn(),
            pause: jest.fn(),
            _emit(event) {
                if (handlers[event]) handlers[event]();
            }
        };

        window.jwplayer = jest.fn(() => player);
        module = loadModule();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
        delete window.jwplayer;
    });

    it('playPreroll creates ad host with HOST_Z_INDEX', () => {
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
            onHandoff: jest.fn()
        });

        const adHost = document.getElementById('jw-ad-player-host');

        expect(adHost.style.zIndex).toBe('40');
    });

    it('makes the ad surface inert before one fallback handoff when removal fails', () => {
        const scheduled = [];
        const onHandoff = jest.fn();
        player.remove.mockImplementation(() => {
            throw new Error('remove failed');
        });

        module.playPreroll({
            config: { playlist: [{ mediaid: 'video-3' }] },
            mountElement: document.body,
            onHandoff,
            scheduleAfterProviderCallback: callback => scheduled.push(callback)
        });

        player._emit('adBreakEnd');
        scheduled[0]();

        expect(player.off).toHaveBeenCalledWith(
            'adBreakEnd',
            expect.any(Function)
        );
        expect(player.off).toHaveBeenCalledWith('ready', expect.any(Function));
        expect(player.setMute).toHaveBeenCalledWith(true);
        expect(player.pause).toHaveBeenCalledTimes(1);
        expect(document.getElementById(module.AD_HOST_ID)).toBeNull();
        expect(onHandoff).toHaveBeenCalledWith(
            expect.objectContaining({ disposal: 'fallback-inert' })
        );
    });

    it('removes only controller-owned IMA iframes after they are reparented', () => {
        const scheduled = [];
        const unrelatedIframe = document.createElement('iframe');
        const ownedIframe = document.createElement('iframe');
        document.body.appendChild(unrelatedIframe);

        module.playPreroll({
            config: { playlist: [{ mediaid: 'video-3' }] },
            mountElement: document.body,
            scheduleAfterProviderCallback: callback => scheduled.push(callback)
        });

        const adHost = document.getElementById(module.AD_HOST_ID);
        adHost.appendChild(ownedIframe);
        player._emit('ready');
        document.body.appendChild(ownedIframe);

        player._emit('adBreakEnd');
        scheduled[0]();

        expect(ownedIframe.isConnected).toBe(false);
        expect(unrelatedIframe.isConnected).toBe(true);
    });

    it('logs the error via console.error when the ad player remove() throws during destroy() (WI 175632 code review)', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        const removeError = new Error('remove failed');
        player.remove.mockImplementation(() => {
            throw removeError;
        });

        module.playPreroll({
            config: { playlist: [{ mediaid: 'video-3' }] },
            mountElement: document.body,
            onHandoff: jest.fn()
        });

        expect(() => module.destroy()).not.toThrow();

        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error), {
            source: 'jwAdPlayerManager/destroy',
            error: removeError
        });
        expect(consoleErrorSpy.mock.calls[0][0].message).toBe('remove failed');

        consoleErrorSpy.mockRestore();
    });

    it('removes controller-owned IMA iframes reparented to body when destroy() is invoked directly (cancel/close path, not the terminal path)', () => {
        const unrelatedIframe = document.createElement('iframe');
        const ownedIframe = document.createElement('iframe');
        document.body.appendChild(unrelatedIframe);

        // No scheduleAfterProviderCallback override: this test never drives the
        // requestTerminal-scheduled finalize path. destroy() is invoked directly,
        // mirroring cancelPreroll()/close() in jwPlayerManager.js.
        module.playPreroll({
            config: { playlist: [{ mediaid: 'video-3' }] },
            mountElement: document.body
        });

        const adHost = document.getElementById(module.AD_HOST_ID);
        adHost.appendChild(ownedIframe);
        // IMA reparents the owned ad iframe out of adHost into document.body.
        player._emit('ready');
        document.body.appendChild(ownedIframe);

        module.destroy();

        expect(ownedIframe.isConnected).toBe(false);
        expect(unrelatedIframe.isConnected).toBe(true);
    });
});
