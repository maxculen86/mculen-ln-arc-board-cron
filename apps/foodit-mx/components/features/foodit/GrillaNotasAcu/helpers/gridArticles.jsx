import React from 'react';
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
