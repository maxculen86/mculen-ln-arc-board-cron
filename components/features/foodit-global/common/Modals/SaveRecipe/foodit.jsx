import React, { useState, useEffect } from 'react';
import { Animate } from '@ln/common-ui-animate';
import { Modal as ModalFoodit } from '@ln/foodit-ui-modal';
import classNames from 'classnames';
import SaveRecipe from './saveRecipe';
import useIsomorphicPopupHandling from './hooks/useIsomorphicPopupHandling';
import get from '../../../../../private/common/utils/get';
import fetchDeleteBookmark from '../../bookmark/api/deleteBookmark';
import { toggleBookmarks } from '../../bookmark/iconHelper';
import useGetUserConfig from '../../../hooks/useGetUserConfig';
import EmptyState from '../../emptyState/foodit';
import { getVariantBarrier } from '../../emptyState/helpers';

const classNameModal = userType =>
    classNames(
        'rounded-4 h-fit p-16 p-24_md p-32_lg flex gap-16 gap-24_md gap-32_lg',
        userType === 'subscribed'
            ? 'bg-light-1 max-w-328'
            : 'w-100 min-w-360 min-w-720_md min-w-944_lg bg-positive'
    );

function Modal() {
    const { close, modalData } = useIsomorphicPopupHandling();
    const showModal = get(modalData, 'isVisible', false);
    const { userType } = useGetUserConfig();

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
        <Animate
            duration={400}
            onClose={() => close(restoreIndex)}
            show={showModal}
            transitionIn={['fade-in']}
            transitionOut={['fade-out']}
        >
            <ModalFoodit
                classNameModal={classNameModal(userType)}
                classNameWrapper="px-16"
                id="modal-save"
                onClose={() => close(restoreIndex)}
                show
            >
                {userType === 'subscribed' ? (
                    <SaveRecipe
                        close={() => close(restoreIndex)}
                        ids={noBookmarkedArticles}
                        collectionArticles={collectionArticles}
                        carouselTitle={carouselTitle}
                        indexStep={indexStep}
                        setIndexStep={setIndexStep}
                        fatherType={fatherType}
                    />
                ) : (
                    <EmptyState
                        variant={getVariantBarrier(userType)}
                        className="pt-40 pt-48_md pt-56_lg"
                        direction="column"
                    />
                )}
            </ModalFoodit>
        </Animate>
    );
}

export default Modal;
