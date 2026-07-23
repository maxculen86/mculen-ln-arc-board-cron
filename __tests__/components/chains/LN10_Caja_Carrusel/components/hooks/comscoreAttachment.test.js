import {
    tryAttachComscorePlugin,
    resetComscoreAttachmentState,
    clearComscoreRetry
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/comscoreAttachment';

// Mirrors the private MAX_COMSCORE_RETRY_ATTEMPTS constant in
// comscoreAttachment.js (same literal already asserted against in
// jwPlayerManager.test.js's "should stop retrying Comscore attachment after
// exhausting the retry budget" test).
const MAX_COMSCORE_RETRY_ATTEMPTS = 100;

describe('comscoreAttachment', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        resetComscoreAttachmentState();
    });

    afterEach(() => {
        clearComscoreRetry();
        jest.useRealTimers();
    });

    it('calls onGiveUp exactly once with the attempt count after exhausting the retry ceiling', () => {
        const getPlayer = jest.fn(() => ({}));
        const attach = jest.fn(() => false);
        const onGiveUp = jest.fn();

        tryAttachComscorePlugin(getPlayer, attach, onGiveUp);
        jest.advanceTimersByTime(200000);

        expect(attach).toHaveBeenCalledTimes(MAX_COMSCORE_RETRY_ATTEMPTS);
        expect(onGiveUp).toHaveBeenCalledTimes(1);
        expect(onGiveUp).toHaveBeenCalledWith({
            attempts: MAX_COMSCORE_RETRY_ATTEMPTS
        });
    });

    it('does NOT call onGiveUp when the player disappears mid-backoff (normal teardown, not a Comscore failure)', () => {
        let playerRef = {};
        const getPlayer = jest.fn(() => playerRef);
        const attach = jest.fn(() => false);
        const onGiveUp = jest.fn();

        tryAttachComscorePlugin(getPlayer, attach, onGiveUp);

        // Simulate the caller's close() tearing the player down mid-backoff.
        playerRef = null;

        jest.advanceTimersByTime(200000);

        expect(onGiveUp).not.toHaveBeenCalled();
    });

    it('does NOT call onGiveUp when attach succeeds before the ceiling', () => {
        const getPlayer = jest.fn(() => ({}));
        const attach = jest
            .fn()
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);
        const onGiveUp = jest.fn();

        tryAttachComscorePlugin(getPlayer, attach, onGiveUp);
        jest.advanceTimersByTime(100);

        expect(attach).toHaveBeenCalledTimes(2);
        expect(onGiveUp).not.toHaveBeenCalled();
    });

    it('does not throw when onGiveUp is omitted (backward compatible)', () => {
        const getPlayer = jest.fn(() => ({}));
        const attach = jest.fn(() => false);

        expect(() => {
            tryAttachComscorePlugin(getPlayer, attach);
            jest.advanceTimersByTime(200000);
        }).not.toThrow();
    });
});
