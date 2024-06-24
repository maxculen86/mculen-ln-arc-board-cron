import React from 'react';

import get from '../../../../../private/common/utils/get';
import getAuthorsAsString from '../../../../../private/common/utils/getAuthorsAsString';
import { getImagesToLoadWithPicture } from '../../../../../private/LN/common/utils/mediaHelper';

import CommonCardFoodit from '../../CommonCardFoodit/foodit';

const RecetarioArticle = ({ article, handleDeleteBookmark }) => {
    const {
        bookmarkTypeId,
        bookmarkId,
        bookmarkContent: {
            image = {},
            time = null,
            headlines = {},
            canonical_url,
            variant,
            tag
        } = {}
    } = article || {};
    const { url = {}, resized_urls = [] } = image;
    const title = get(headlines, 'basic', '');

    return (
        <CommonCardFoodit
            key={bookmarkId}
            articleId={bookmarkTypeId}
            showTime={Boolean(time)}
            time={time}
            className="col-span-8 col-span-4_md"
            linksProps={{
                href: canonical_url,
                title: title
            }}
            size={'small'}
            variant={variant || 'm'}
            src={get(url, 'resizedUrl', '')}
            alt={title}
            sources={getImagesToLoadWithPicture(resized_urls)}
            loading={'lazy'}
            fetchPriority={'low'}
            tag={tag}
            fill={true}
            title={title}
            author={getAuthorsAsString(article.bookmarkContent, false)}
            bookmarkAction={() =>
                handleDeleteBookmark(bookmarkId, bookmarkTypeId)
            }
        />
    );
};

export default RecetarioArticle;
