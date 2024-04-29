import React from 'react';
import Static from 'fusion:static';
import { GridArticlesFoodit } from './gridArticles';
import useGridArticlesFoodit from '../hooks/useGridArticles';

const GridFooditServer = ({
    id = '',
    layout = '',
    haveShowButton,
    maxArticles = 24
}) => {
    const { articles } = useGridArticlesFoodit({
        id,
        layout,
        staticMode: true,
        maxArticles
    });
    if (articles.length < maxArticles) {
        haveShowButton();
    }
    return (
        <Static id={`acu-grid-ssr-${id}`}>
            <GridArticlesFoodit articles={articles} />
        </Static>
    );
};

export default GridFooditServer;
