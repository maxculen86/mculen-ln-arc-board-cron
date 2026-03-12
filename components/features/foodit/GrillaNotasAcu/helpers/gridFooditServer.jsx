import React from 'react';
import Static from 'fusion:static';
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

export default GridFooditServer;
