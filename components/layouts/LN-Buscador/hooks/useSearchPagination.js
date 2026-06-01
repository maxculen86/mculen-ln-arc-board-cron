import { useState, useCallback } from 'react';

function usePagination(initialPage = 0, batchSize = 24) {
    const [page, setPage] = useState(initialPage);

    const getNextPage = useCallback(() => {
        setPage(prevPage => prevPage + batchSize);
    }, [batchSize]);

    const resetPage = useCallback(() => setPage(0), []);

    return { page, getNextPage, resetPage };
}

export default usePagination;
