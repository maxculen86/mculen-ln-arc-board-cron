import React from 'react';
import Static from 'fusion:static';
import PropTypes from 'prop-types';
import { GridArticlesFoodit } from './gridArticles';
import useGridArticlesFoodit from '../hooks/useGridArticles';

function GridFooditServer({ id = '', layout = '', maxArticles = 24 }) {
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
}

GridFooditServer.propTypes = {
    id: PropTypes.string,
    layout: PropTypes.string,
    maxArticles: PropTypes.number
};

GridFooditServer.defaultProps = {
    id: '',
    layout: '',
    maxArticles: 24
};

export default GridFooditServer;
