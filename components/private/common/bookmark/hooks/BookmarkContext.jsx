import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'fusion:prop-types';

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

BookmarkContextProvider.propTypes = { children: PropTypes.node.isRequired };

export const useBookmarkContext = () => useContext(BookmarkContext);
