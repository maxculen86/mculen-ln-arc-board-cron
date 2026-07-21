import {
    createPlayerHost,
    HOST_Z_INDEX,
    OVERLAY_Z_INDEX,
    positionHostOverRect
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerShared';

describe('jwPlayerShared', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('exports HOST_Z_INDEX as 40', () => {
        expect(HOST_Z_INDEX).toBe('40');
    });

    it('exports OVERLAY_Z_INDEX as 50', () => {
        expect(OVERLAY_Z_INDEX).toBe(50);
    });

    it('exports OVERLAY_Z_INDEX greater than HOST_Z_INDEX so overlay controls win stacking', () => {
        expect(OVERLAY_Z_INDEX).toBeGreaterThan(Number(HOST_Z_INDEX));
    });

    it('positionHostOverRect re-asserts overflow hidden after positioning', () => {
        const host = document.createElement('div');
        const target = document.createElement('div');
        const player = { resize: jest.fn() };

        target.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 320,
            height: 180
        }));

        positionHostOverRect({
            host,
            target,
            player,
            lastSize: null,
            setLastSize: jest.fn()
        });

        expect(host.style.overflow).toBe('hidden');
    });

    it('positionHostOverRect re-asserts overflow hidden even when resize is skipped', () => {
        const host = document.createElement('div');
        const target = document.createElement('div');
        const player = { resize: jest.fn() };

        target.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            width: 320,
            height: 180
        }));

        positionHostOverRect({
            host,
            target,
            player,
            lastSize: { width: 320, height: 180 },
            setLastSize: jest.fn()
        });

        expect(player.resize).not.toHaveBeenCalled();
        expect(host.style.overflow).toBe('hidden');
    });

    it('createPlayerHost applies provided host and player styles', () => {
        const { hostElement, playerElement } = createPlayerHost({
            hostId: 'test-host',
            playerId: 'test-player',
            hostStyles: { zIndex: '40' },
            playerStyles: { pointerEvents: 'auto' }
        });

        expect(hostElement.style.zIndex).toBe('40');
        expect(playerElement.style.pointerEvents).toBe('auto');
    });
});
