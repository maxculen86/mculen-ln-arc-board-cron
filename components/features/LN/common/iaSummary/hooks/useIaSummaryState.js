import { useSyncExternalStore } from 'react';
import { iaSummaryStore } from '../store/iaSummaryStore';

export const useIaSummaryState = () =>
    useSyncExternalStore(
        iaSummaryStore.subscribe,
        iaSummaryStore.getSnapshot,
        iaSummaryStore.getSnapshot
    );
