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

    return (
        <Static id={`acu-grid-ssr-${id}`}>
            <GridArticlesFoodit
                articles={articles}
                maxArticles={maxArticles}
                haveShowButton={haveShowButton}
            />
        </Static>
    );
};

export default GridFooditServer;
