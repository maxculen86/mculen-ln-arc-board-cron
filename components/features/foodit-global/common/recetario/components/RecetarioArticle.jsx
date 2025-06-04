import React from 'react';

import PropTypes from 'prop-types';
import get from '../../../../../private/common/utils/get';
import getAuthorsAsString from '../../../../../private/common/utils/getAuthorsAsString';
import { getImagesToLoadWithPicture } from '../../../../../private/LN/common/utils/mediaHelper';

import CommonCardFoodit from '../../CommonCardFoodit/foodit';

function RecetarioArticle({ article, handleDeleteBookmark, isFirst = false }) {
    const {
        bookmarkTypeId,
        bookmarkId,
        bookmarkContent: {
            image = {},
            time = null,
            headlines = {},
            canonical_url: canonicalUrl,
            variant,
            tag
        } = {}
    } = article || {};
    const { url = {}, resized_urls: resizedUrls = [] } = image;
    const title = get(headlines, 'basic', '');

    return (
        <CommonCardFoodit
            key={bookmarkId}
            articleId={bookmarkTypeId}
            showTime={Boolean(time)}
            time={time}
            className="col-span-8 col-span-4_md"
            linksProps={{
                href: canonicalUrl,
                title
            }}
            size="small"
            variant={variant || 'm'}
            src={get(url, 'resizedUrl', '')}
            alt={title}
            sources={getImagesToLoadWithPicture(false, resizedUrls)}
            loading={isFirst ? 'eager' : 'lazy'}
            fetchPriority={isFirst ? 'high' : 'low'}
            tag={tag}
            fill
            title={title}
            author={getAuthorsAsString(article.bookmarkContent, false)}
            bookmarkAction={() =>
                handleDeleteBookmark(bookmarkId, bookmarkTypeId)
            }
        />
    );
}
RecetarioArticle.propTypes = {
    article: PropTypes.shape({
        bookmarkContent: PropTypes.shape({})
    }).isRequired,
    handleDeleteBookmark: PropTypes.func.isRequired,
    isFirst: PropTypes.bool.isRequired
};

export default RecetarioArticle;
