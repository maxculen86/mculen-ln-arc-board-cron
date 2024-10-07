import React from 'react';
import PropTypes from 'fusion:prop-types';

import { Button } from '@ln/foodit-ui-button';
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
    fatherType
}) {
    const articles = useGetFooditArticles(
        (!collectionArticles.length && ids) || []
    );

    const articlesDetails =
        (collectionArticles.length &&
            collectionArticles.map(article =>
                transformBookmarkContent(article)
            )) ||
        articles;

    return (
        <footer className="flex gap-16">
            <Button
                variant="primary"
                title={leftButton.title}
                fullWidth
                size={40}
                onClick={() =>
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
                        fatherType
                    })
                }
                disabled={
                    hasInputError ||
                    !selectedFolder?.value ||
                    !articlesDetails.length ||
                    (indexStep === 2 && !newFolder)
                }
            >
                {leftButton.text}
            </Button>
            <Button
                variant="secondary"
                title={rightButton.title}
                size={40}
                fullWidth
                onClick={() =>
                    actionButtons({
                        action: rightButton.action,
                        close,
                        ids,
                        indexStep,
                        newFolder,
                        selectedFolder,
                        setIndexStep
                    })
                }
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
    collectionArticles: PropTypes.arrayOf(PropTypes.object),
    carouselTitle: PropTypes.string,
    fatherType: PropTypes.string
};

FooterSaveRecipe.defaultProps = {
    newFolder: '',
    ids: [],
    layout: '',
    collectionArticles: [],
    carouselTitle: '',
    fatherType: ''
};

export default FooterSaveRecipe;
