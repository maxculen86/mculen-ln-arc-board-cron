import { iaSummaryStore } from '../store/iaSummaryStore';

export const useIaSummaryActions = () => ({
    open: iaSummaryStore.open,
    close: iaSummaryStore.close,
    toggle: iaSummaryStore.toggle
});
