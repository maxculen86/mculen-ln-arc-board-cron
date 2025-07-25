import React from 'react';
import PropTypes from 'prop-types';
import useGridArticlesLN from '../hooks/useGridArticles';
import ArticleCardsList from './ArticleCardList';

export function GrillaNotasServer({
    id,
    layout,
    isUltimasNoticias,
    getBanner,
    globalContent
}) {
    const { articles } = useGridArticlesLN({ id, staticMode: true });

    return (
        <ArticleCardsList
            articles={articles}
            isUltimasNoticias={isUltimasNoticias}
            getBanner={getBanner}
            globalContent={globalContent}
            pageBuilderLayout={layout}
        />
    );
}

GrillaNotasServer.propTypes = {
    id: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    getBanner: PropTypes.func.isRequired,
    isUltimasNoticias: PropTypes.bool.isRequired,
    globalContent: PropTypes.shape({
        name: PropTypes.string
    }).isRequired
};
