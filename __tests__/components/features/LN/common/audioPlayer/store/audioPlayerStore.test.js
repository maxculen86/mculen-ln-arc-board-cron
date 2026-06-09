import { audioPlayerStore } from '../../../../../../../components/features/LN/common/audioPlayer/store/audioPlayerStore';
import handleCookie from '../../../../../../../components/private/LN/common/utils/handleCookie';

jest.mock(
    '../../../../../../../components/private/LN/common/utils/handleCookie',
    () => {
        const getCookie = jest.fn();
        const setCookie = jest.fn();
        return () => ({ getCookie, setCookie });
    }
);

// Mismas instancias que captura el store al cargar el módulo.
const { getCookie, setCookie } = handleCookie();

const SUMMARY_COOKIE = 'lnAudioSummary';
const SEVEN_DAYS_IN_MINUTES = 7 * 24 * 60;

const resetStore = () => audioPlayerStore.close();

describe('Components - features - LN - common - audioPlayer - store - audioPlayerStore', () => {
    beforeEach(() => {
        getCookie.mockReset();
        setCookie.mockReset();
        getCookie.mockReturnValue(undefined);
        resetStore();
    });

    describe('initial snapshot', () => {
        it('starts closed with no noteId', () => {
            const state = audioPlayerStore.getSnapshot();
            expect(state.isOpen).toBe(false);
            expect(state.noteId).toBeNull();
            expect(state.isPlaying).toBe(false);
            expect(state.isSummary).toBe(false);
            expect(state.summaryAvailable).toBeNull();
            expect(state.hasError).toBe(false);
        });
    });

    describe('open()', () => {
        it('sets isOpen true and stores noteId', () => {
            audioPlayerStore.open('note-123');
            const state = audioPlayerStore.getSnapshot();
            expect(state.isOpen).toBe(true);
            expect(state.noteId).toBe('note-123');
        });

        it('restores isSummary from the saved cookie preference', () => {
            getCookie.mockReturnValue('true');
            audioPlayerStore.open('note-abc');
            expect(getCookie).toHaveBeenCalledWith(SUMMARY_COOKIE);
            expect(audioPlayerStore.getSnapshot().isSummary).toBe(true);
        });

        it('sets isSummary false when there is no saved preference', () => {
            getCookie.mockReturnValue(undefined);
            audioPlayerStore.open('note-abc');
            expect(audioPlayerStore.getSnapshot().isSummary).toBe(false);
        });

        it('resets hasError to false on open', () => {
            audioPlayerStore.setError();
            audioPlayerStore.open('note-abc');
            expect(audioPlayerStore.getSnapshot().hasError).toBe(false);
        });

        it('resets summaryAvailable to null on open', () => {
            audioPlayerStore.setSummaryAvailable(true);
            audioPlayerStore.open('note-abc');
            expect(audioPlayerStore.getSnapshot().summaryAvailable).toBeNull();
        });

        it('merges opts into state', () => {
            audioPlayerStore.open('note-xyz', { showVariantIa: true });
            expect(audioPlayerStore.getSnapshot().showVariantIa).toBe(true);
        });
    });

    describe('close()', () => {
        it('closes the player and clears noteId', () => {
            audioPlayerStore.open('note-123');
            audioPlayerStore.close();
            const state = audioPlayerStore.getSnapshot();
            expect(state.isOpen).toBe(false);
            expect(state.noteId).toBeNull();
            expect(state.isPlaying).toBe(false);
            expect(state.hasError).toBe(false);
        });
    });

    describe('setPlaying()', () => {
        it('updates isPlaying', () => {
            audioPlayerStore.setPlaying(true);
            expect(audioPlayerStore.getSnapshot().isPlaying).toBe(true);
            audioPlayerStore.setPlaying(false);
            expect(audioPlayerStore.getSnapshot().isPlaying).toBe(false);
        });
    });

    describe('setSummary()', () => {
        it('updates isSummary', () => {
            audioPlayerStore.setSummary(true);
            expect(audioPlayerStore.getSnapshot().isSummary).toBe(true);
        });

        it('persists the preference in a cookie for 7 days', () => {
            audioPlayerStore.setSummary(true);
            expect(setCookie).toHaveBeenCalledWith(
                SUMMARY_COOKIE,
                'true',
                SEVEN_DAYS_IN_MINUTES
            );
        });

        it('persists "false" when summary is disabled', () => {
            audioPlayerStore.setSummary(false);
            expect(setCookie).toHaveBeenCalledWith(
                SUMMARY_COOKIE,
                'false',
                SEVEN_DAYS_IN_MINUTES
            );
        });
    });

    describe('setSummaryAvailable()', () => {
        it('updates summaryAvailable', () => {
            audioPlayerStore.setSummaryAvailable(true);
            expect(audioPlayerStore.getSnapshot().summaryAvailable).toBe(true);
            audioPlayerStore.setSummaryAvailable(false);
            expect(audioPlayerStore.getSnapshot().summaryAvailable).toBe(false);
        });
    });

    describe('setError()', () => {
        it('closes the player and marks hasError', () => {
            audioPlayerStore.open('note-123');
            audioPlayerStore.setError();
            const state = audioPlayerStore.getSnapshot();
            expect(state.isOpen).toBe(false);
            expect(state.isPlaying).toBe(false);
            expect(state.hasError).toBe(true);
        });
    });

    describe('subscribe()', () => {
        it('calls listener on state change', () => {
            const listener = jest.fn();
            const unsubscribe = audioPlayerStore.subscribe(listener);
            audioPlayerStore.open('note-listener');
            expect(listener).toHaveBeenCalledTimes(1);
            unsubscribe();
        });

        it('returns unsubscribe that stops notifications', () => {
            const listener = jest.fn();
            const unsubscribe = audioPlayerStore.subscribe(listener);
            unsubscribe();
            audioPlayerStore.open('note-after-unsub');
            expect(listener).not.toHaveBeenCalled();
        });

        it('supports multiple listeners', () => {
            const l1 = jest.fn();
            const l2 = jest.fn();
            const u1 = audioPlayerStore.subscribe(l1);
            const u2 = audioPlayerStore.subscribe(l2);
            audioPlayerStore.open('note-multi');
            expect(l1).toHaveBeenCalledTimes(1);
            expect(l2).toHaveBeenCalledTimes(1);
            u1();
            u2();
        });
    });
});
