/* eslint-disable react/prop-types */
import React from 'react';
import { CustomArticleFooditBox } from '../../../../../features/LN-10-global/customArticles/fooditBox/default';
import { CustomArticleSegmentedBox } from '../../../../../features/LN-10-global/customArticles/segmentedBox/default';

export function RenderCustomArticle({ isFoodit, isSegmentedBox, articleData }) {
    if (isFoodit) {
        return <CustomArticleFooditBox {...articleData} />;
    }

    if (isSegmentedBox) {
        return <CustomArticleSegmentedBox {...articleData} />;
    }
    return null;
}
