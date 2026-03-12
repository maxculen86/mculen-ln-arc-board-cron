import React from 'react';
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
