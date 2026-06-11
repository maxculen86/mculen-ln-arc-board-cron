import { iaSummaryStore } from '../../../../../../../components/features/LN/common/iaSummary/store/iaSummaryStore';

describe('Components - features - LN - common - iaSummary - store', () => {
    beforeEach(() => {
        iaSummaryStore.close();
    });

    describe('open', () => {
        it('sets isOpen to true', () => {
            iaSummaryStore.open();

            expect(iaSummaryStore.getSnapshot()).toEqual({
                isOpen: true,
                closeEvent: null
            });
        });

        it('registers the provided closeEvent', () => {
            const closeEvent = { event: 'e_linkclick', label: 'cerrar_ia' };
            iaSummaryStore.open(closeEvent);

            expect(iaSummaryStore.getSnapshot()).toEqual({
                isOpen: true,
                closeEvent
            });
        });
    });

    describe('close', () => {
        it('sets isOpen to false', () => {
            iaSummaryStore.open();
            iaSummaryStore.close();

            expect(iaSummaryStore.getSnapshot().isOpen).toBe(false);
        });

        it('clears the registered closeEvent', () => {
            iaSummaryStore.open({ label: 'cerrar_ia' });
            iaSummaryStore.close();

            expect(iaSummaryStore.getSnapshot().closeEvent).toBeNull();
        });
    });

    describe('toggle', () => {
        it('opens when currently closed', () => {
            iaSummaryStore.close();
            iaSummaryStore.toggle();

            expect(iaSummaryStore.getSnapshot().isOpen).toBe(true);
        });

        it('closes when currently open', () => {
            iaSummaryStore.open();
            iaSummaryStore.toggle();

            expect(iaSummaryStore.getSnapshot().isOpen).toBe(false);
        });
    });

    describe('subscribe', () => {
        it('notifies listeners on state change', () => {
            const listener = jest.fn();
            iaSummaryStore.subscribe(listener);

            iaSummaryStore.open();

            expect(listener).toHaveBeenCalledTimes(1);
        });

        it('stops notifying after unsubscribe', () => {
            const listener = jest.fn();
            const unsubscribe = iaSummaryStore.subscribe(listener);

            iaSummaryStore.open();
            unsubscribe();
            iaSummaryStore.close();

            expect(listener).toHaveBeenCalledTimes(1);
        });
    });
});
