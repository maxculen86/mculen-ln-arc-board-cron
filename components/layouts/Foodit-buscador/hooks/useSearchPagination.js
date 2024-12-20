import { useState, useCallback } from 'react';

function usePagination(initialPage = 0, batchSize = 24) {
    const [page, setPage] = useState(initialPage);

    const getNextPage = useCallback(() => {
        setPage(prevPage => prevPage + batchSize);
    }, [batchSize]);

    return { page, getNextPage, resetPage: () => setPage(0) };
}

export default usePagination;
