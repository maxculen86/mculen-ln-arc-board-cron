import React from 'react';

import { Button } from '@ln/foodit-ui-button';
import useBookmarkedArticles from '../hooks/useBookmarkedArticles';

function BookmarkedArticles({
    userBookmarks,
    selectedItemId = '',
    selectedItemQuantity = 0,
    setSelectedItem,
    setUserBookmarks
}) {
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
}

export default BookmarkedArticles;
