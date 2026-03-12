import React from 'react';

import { Button } from '@ln/foodit-ui-button';
import { Spinner } from '@ln/common-ui-spinner';
import { transformBookmarkContent } from '../../../bookmark/_helper';
import { useGetFooditArticles } from '../../../bookmark/hooks/useGetFooditArticle';
import { actionButtons } from '../helpers';

/* eslint-disable react/require-default-props */
function FooterSaveRecipe({
    hasInputError,
    close,
    indexStep,
    leftButton,
    newFolder = '',
    rightButton,
    selectedFolder,
    setIndexStep,
    ids = [],
    layout = '',
    collectionArticles = [],
    carouselTitle = '',
    fatherType = '',
    mode = 'save',
    onConfirmMove = null,
    isLoading = false,
    setIsLoading = () => {}
}) {
    const articles = useGetFooditArticles(
        (mode === 'save' && !collectionArticles?.length && ids) || []
    );

    const articlesDetails =
        (mode === 'save' &&
            collectionArticles?.length &&
            collectionArticles?.map(article =>
                transformBookmarkContent(article)
            )) ||
        articles;

    const handleLeftButtonClick = () => {
        actionButtons({
            action: leftButton.action,
            close,
            indexStep,
            newFolder,
            selectedFolder,
            setIndexStep,
            articlesDetails,
            carouselTitle,
            layout,
            fatherType,
            mode,
            onConfirmMove,
            isLoading,
            setIsLoading
        });
    };

    const handleRightButtonClick = () => {
        if (isLoading) return;

        actionButtons({
            action: rightButton.action,
            close,
            ids,
            indexStep,
            newFolder,
            selectedFolder,
            setIndexStep,
            mode,
            onConfirmMove
        });
    };

    const isDisabled = (() => {
        const trimmedName = newFolder?.trim();

        const conditions = [
            isLoading,
            mode === 'save' && articlesDetails?.length === 0,
            indexStep === 1 && !selectedFolder?.value,
            indexStep === 2 && (!trimmedName || hasInputError),
            !selectedFolder?.value
        ];

        return conditions.some(Boolean);
    })();

    const getButtonText = () => {
        if (!isLoading) {
            return leftButton.text;
        }

        const loadingTexts = {
            move: 'Moviendo...',
            save: 'Guardando...'
        };

        return (
            (
                <div className="flex ai-center gap-8">
                    <Spinner inverted variant="text-neutral-light-1" />
                    {loadingTexts[leftButton?.action]}
                </div>
            ) || 'Procesando...'
        );
    };

    return (
        <footer className="flex gap-16">
            <Button
                variant="primary"
                title={leftButton.title}
                fullWidth
                size={40}
                onClick={handleLeftButtonClick}
                disabled={isDisabled}
            >
                {getButtonText()}
            </Button>
            <Button
                variant="secondary"
                title={rightButton.title}
                size={40}
                fullWidth
                onClick={handleRightButtonClick}
                disabled={isLoading}
            >
                {rightButton.text}
            </Button>
        </footer>
    );
}

export default FooterSaveRecipe;
