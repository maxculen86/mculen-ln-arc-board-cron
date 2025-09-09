import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@ln/foodit-ui-button';
import { Spinner } from '@ln/common-ui-spinner';
import { transformBookmarkContent } from '../../../bookmark/_helper';
import { useGetFooditArticles } from '../../../bookmark/hooks/useGetFooditArticle';
import { actionButtons } from '../helpers';

function FooterSaveRecipe({
    hasInputError,
    close,
    indexStep,
    leftButton,
    newFolder,
    rightButton,
    selectedFolder,
    setIndexStep,
    ids,
    layout,
    collectionArticles = [],
    carouselTitle = '',
    fatherType,
    mode = 'save',
    onConfirmMove,
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

FooterSaveRecipe.propTypes = {
    hasInputError: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    indexStep: PropTypes.number.isRequired,
    leftButton: PropTypes.shape({
        title: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    newFolder: PropTypes.string,
    rightButton: PropTypes.shape({
        title: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    selectedFolder: PropTypes.shape({
        value: PropTypes.string
    }).isRequired,
    setIndexStep: PropTypes.func.isRequired,
    ids: PropTypes.arrayOf(PropTypes.string),
    layout: PropTypes.string,
    collectionArticles: PropTypes.arrayOf(PropTypes.shape({})),
    carouselTitle: PropTypes.string,
    fatherType: PropTypes.string,
    mode: PropTypes.oneOf(['save', 'move']).isRequired,
    onConfirmMove: PropTypes.func,
    isLoading: PropTypes.bool,
    setIsLoading: PropTypes.func
};

FooterSaveRecipe.defaultProps = {
    newFolder: '',
    ids: [],
    layout: '',
    collectionArticles: [],
    carouselTitle: '',
    fatherType: '',
    onConfirmMove: null,
    isLoading: false,
    setIsLoading: () => {}
};

export default FooterSaveRecipe;
