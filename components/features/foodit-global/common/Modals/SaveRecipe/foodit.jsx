import React, { useState, useEffect } from 'react';
import { Animate } from '@ln/common-ui-animate';
import { Modal as ModalFoodit } from '@ln/foodit-ui-modal';
import SaveRecipe from './saveRecipe';
import useIsomorphicPopupHandling from './hooks/useIsomorphicPopupHandling';
import get from '../../../../../private/common/utils/get';
import fetchDeleteBookmark from '../../bookmark/api/deleteBookmark';

export const Modal = () => {
    const { close, modalData } = useIsomorphicPopupHandling();
    const showModal = get(modalData, 'isVisible', false);
    const {
        bookmarkedArticles = [],
        noBookmarkedArticles = [],
        collectionArticles = []
    } = get(modalData, 'data', {});

    useEffect(() => {
        if (bookmarkedArticles.length > 0) {
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
        <Animate
            duration={400}
            onClose={() => close(restoreIndex)}
            show={showModal}
            transitionIn={['fade-in']}
            transitionOut={['fade-out']}
        >
            <ModalFoodit
                classNameModal="bg-light-1 rounded-24 h-fit p-24 flex gap-8_md"
                classNameWrapper="px-16"
                id="modal-save"
                onClose={() => close(restoreIndex)}
                show
            >
                <SaveRecipe
                    close={() => close(restoreIndex)}
                    ids={noBookmarkedArticles}
                    collectionArticles={collectionArticles}
                    indexStep={indexStep}
                    setIndexStep={setIndexStep}
                />
            </ModalFoodit>
        </Animate>
    );
};

export default Modal;
