import React from 'react';
import { getShortestImage } from '../../../../private/LN/common/utils/mediaHelper';
import CommonCardFoodit from '../../../foodit-global/common/CommonCardFoodit/foodit';
import { transformArticleFoodit } from '../../../foodit-global/common/utils/notaFooditHelper';
import getImageAltText from '../../../foodit-global/common/utils/getImageAltText';

export const createArticleList = ({
    articles = [],
    bookmarkedArticlesIds = []
} = {}) =>
    articles.map(article => {
        const {
            articleId,
            author,
            href,
            size = 'small',
            tag,
            time,
            title,
            variant,
            image = {},
            contentCode = '',
            hasVideo
        } = transformArticleFoodit(article);
        const { resized_urls: resizedUrls, url } = image;
        const { resizedUrl = '' } = getShortestImage(resizedUrls);

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
                loading="lazy"
                fetchPriority="low"
                tag={tag}
                title={title}
                author={author}
                className="col-span-8 col-span-4_md"
                key={articleId}
                fill={
                    bookmarkedArticlesIds.length &&
                    bookmarkedArticlesIds.includes(articleId)
                }
                contentCode={contentCode}
                hasVideo={hasVideo}
            />
        );
    });
