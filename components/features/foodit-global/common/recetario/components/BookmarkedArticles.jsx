import React, { memo } from 'react';

import useBookmarkedArticles from '../hooks/useBookmarkedArticles';

import { Button } from '@ln/foodit-ui-button';

const BookmarkedArticles = ({
    userBookmarks,
    selectedItemId,
    selectedItemQuantity,
    setSelectedItem,
    setUserBookmarks
}) => {
    const {
        displayArticlesNum,
        setDisplayArticlesNum,
        filteredAndSlicedBookmarks
    } = useBookmarkedArticles(
        userBookmarks,
        selectedItemId,
        setUserBookmarks,
        setSelectedItem
    );

    return (
        <>
            <div className="grid grid-cols-8 grid-cols-8_md grid-cols-12_lg gap-32">
                {filteredAndSlicedBookmarks}
            </div>
            {displayArticlesNum < selectedItemQuantity && (
                <div className="text-center pt-24">
                    <Button
                        title="Ver más"
                        onClick={() =>
                            setDisplayArticlesNum(displayArticlesNum + 24)
                        }
                        variant="secondary"
                        size={{ sm: 32, lg: 40 }}
                    >
                        Ver más
                    </Button>
                </div>
            )}
        </>
    );
};

export default memo(BookmarkedArticles, (prevProps, nextProps) => {
    return (
        prevProps.userBookmarks === nextProps.userBookmarks &&
        prevProps.selectedItemId === nextProps.selectedItemId
    );
});
