import React from 'react';
import StaticContent from '../../../../private/common/staticContent';
import { GridArticlesFoodit } from './gridArticles';
import useGridArticlesFoodit from '../hooks/useGridArticles';

const GridFooditServer = ({ idSection = '' }) => {
    const { articles } = useGridArticlesFoodit({
        id: idSection,
        staticMode: true
    });
    return (
        <StaticContent>
            <GridArticlesFoodit articles={articles} />
        </StaticContent>
    );
};

export default GridFooditServer;
