import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { createArticleListTema } from '.';

function GridTemaServer({ articles = [] }) {
    return (
        <Static id="acu-grid-ssr-tema">
            <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32">
                {createArticleListTema({ articles, isServer: true })}
            </div>
        </Static>
    );
}

GridTemaServer.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            articleId: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
            size: PropTypes.string.isRequired,
            tag: PropTypes.string.isRequired,
            time: PropTypes.string,
            title: PropTypes.string.isRequired,
            variant: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            contentCode: PropTypes.string.isRequired
        })
    ).isRequired
};
export default GridTemaServer;
