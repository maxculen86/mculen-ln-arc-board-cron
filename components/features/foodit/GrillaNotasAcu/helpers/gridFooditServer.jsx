import React from 'react';
import StaticContent from '../../../../private/common/staticContent';
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
        <StaticContent>
            <GridArticlesFoodit articles={articles} />
        </StaticContent>
    );
};

export default GridFooditServer;
