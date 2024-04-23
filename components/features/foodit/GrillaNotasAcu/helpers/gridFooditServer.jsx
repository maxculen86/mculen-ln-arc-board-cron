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
        <Static htmlOnly persistent id="acu-grid-ssr">
            <GridArticlesFoodit articles={articles} />
        </Static>
    );
};

export default GridFooditServer;
