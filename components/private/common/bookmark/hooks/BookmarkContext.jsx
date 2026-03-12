import React, { useContext, useMemo, useState } from 'react';

export const BookmarkContext = React.createContext({});

export function BookmarkContextProvider({ children }) {
    const [bookmarkId, setBookmarkId] = useState(null);

    const value = useMemo(() => ({ bookmarkId, setBookmarkId }), [bookmarkId]);

    return (
        <BookmarkContext.Provider value={value}>
            {children}
        </BookmarkContext.Provider>
    );
}

export const useBookmarkContext = () => useContext(BookmarkContext);
