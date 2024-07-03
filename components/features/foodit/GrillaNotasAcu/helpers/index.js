import React from 'react';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import CommonCardFoodit from '../../../foodit-global/common/CommonCardFoodit/foodit';
import { transformArticleFoodit } from '../../../foodit-global/common/utils/notaFooditHelper';
import getImageAltText from '../../../foodit-global/common/utils/getImageAltText';

export const createArticleList = ({
    articles = [],
    bookmarkedArticlesIds = []
} = {}) => {
    return articles.map(article => {
        const {
            articleId,
            author,
            href,
            size = 'small',
            tag,
            time,
            title,
            variant,
            image = {}
        } = transformArticleFoodit(article);
        const { resized_urls, url } = image;
        const { resizedUrl = '' } = getShortestImage(resized_urls);

        return (
            <CommonCardFoodit
                articleId={articleId}
                showTime={Boolean(time)}
                time={time}
                linksProps={{ href, title }}
                size={size}
                variant={variant}
                src={resizedUrl || url}
                alt={getImageAltText(image)}
                sources={getImagesToLoadWithPicture(resized_urls)}
                loading={'lazy'}
                fetchPriority={'low'}
                tag={tag}
                title={title}
                author={author}
                className="col-span-8 col-span-4_md"
                key={articleId}
                fill={
                    bookmarkedArticlesIds.length &&
                    bookmarkedArticlesIds.includes(articleId)
                }
            />
        );
    });
};
