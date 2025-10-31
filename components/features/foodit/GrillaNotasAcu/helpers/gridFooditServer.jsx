import React from 'react';
import Static from 'fusion:static';
import PropTypes from 'prop-types';
import { GridArticlesFoodit } from './gridArticles';
import useGridArticlesFoodit from '../hooks/useGridArticles';
import { RoofFoodit } from '../../../foodit-global/common/RoofFoodit/foodit';

function GridFooditServer({
    id = '',
    layout = '',
    maxArticles = 24,
    title = '',
    link = '',
    hide = false
}) {
    const { articles } = useGridArticlesFoodit({
        id,
        layout,
        staticMode: true,
        maxArticles
    });

    const shouldRenderRoof = !hide && (title || link);

    return (
        <Static id={`acu-grid-ssr-${id}`}>
            <div className="flex flex-column">
                {shouldRenderRoof && (
                    <RoofFoodit
                        title={{ text: title, as: 'h3' }}
                        linkProps={{ href: link, text: title }}
                        hide={hide}
                    />
                )}
                <GridArticlesFoodit
                    articles={articles}
                    maxArticles={maxArticles}
                />
            </div>
        </Static>
    );
}

GridFooditServer.propTypes = {
    id: PropTypes.string,
    layout: PropTypes.string,
    maxArticles: PropTypes.number,
    title: PropTypes.string,
    link: PropTypes.string,
    hide: PropTypes.bool
};

GridFooditServer.defaultProps = {
    id: '',
    layout: '',
    maxArticles: 24,
    title: '',
    link: '',
    hide: false
};

export default GridFooditServer;
