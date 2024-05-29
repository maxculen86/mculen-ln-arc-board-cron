import React from 'react';
import Static from 'fusion:static';
import { GridArticlesFoodit } from './gridArticles';
import useGridArticlesFoodit from '../hooks/useGridArticles';

const GridFooditServer = ({ id = '', layout = '', maxArticles = 24 }) => {
    const { articles } = useGridArticlesFoodit({
        id,
        layout,
        staticMode: true,
        maxArticles
    });

    return (
        <Static id={`acu-grid-ssr-${id}`}>
            <GridArticlesFoodit articles={articles} maxArticles={maxArticles} />
        </Static>
    );
};

export default GridFooditServer;
