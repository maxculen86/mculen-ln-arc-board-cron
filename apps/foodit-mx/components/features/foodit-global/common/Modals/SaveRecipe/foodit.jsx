import React, { useState, useEffect } from 'react';
import SaveRecipe from './saveRecipe';
import useIsomorphicPopupHandling from './hooks/useIsomorphicPopupHandling';
import get from '../../../../../private/common/utils/get';
import fetchDeleteBookmark from '../../bookmark/api/deleteBookmark';
import { toggleBookmarks } from '../../bookmark/iconHelper';

function Modal() {
    const { close, modalData } = useIsomorphicPopupHandling();
    const showModal = get(modalData, 'isVisible', false);

    const {
        bookmarkedArticles = [],
        noBookmarkedArticles = [],
        collectionArticles = [],
        carouselTitle = '',
        fatherType = ''
    } = get(modalData, 'data', {});

    useEffect(() => {
        if (bookmarkedArticles.length > 0) {
            toggleBookmarks(
                bookmarkedArticles.map(article => article.bookmarkTypeId),
                false
            );

            const deleteBookmarkedArticles = async () => {
                await fetchDeleteBookmark(bookmarkedArticles);
            };
            deleteBookmarkedArticles();
        }
    }, [bookmarkedArticles]);

    const [indexStep, setIndexStep] = useState(1);

    const restoreIndex = () => {
        setIndexStep(1);
    };

    return (
        <SaveRecipe
            showModal={showModal}
            close={() => close(restoreIndex)}
            ids={noBookmarkedArticles}
            collectionArticles={collectionArticles}
            carouselTitle={carouselTitle}
            indexStep={indexStep}
            setIndexStep={setIndexStep}
            fatherType={fatherType}
        />
    );
}

export default Modal;
