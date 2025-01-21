import React from 'react';
import PropTypes from 'prop-types';
import { createArticleList } from '.';

export function GridArticlesFoodit({
    articles = [],
    bookmarkedArticlesIds = []
}) {
    return (
        <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32">
            {createArticleList({ articles, bookmarkedArticlesIds })}
        </div>
    );
}
GridArticlesFoodit.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({})),
    bookmarkedArticlesIds: PropTypes.arrayOf(PropTypes.string)
};

GridArticlesFoodit.defaultProps = {
    articles: [],
    bookmarkedArticlesIds: []
};
