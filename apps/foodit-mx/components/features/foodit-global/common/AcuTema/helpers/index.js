import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';

import CommonCardFoodit from '../../CommonCardFoodit/foodit';
import { transformArticleFooditTema } from '../../utils/notaFooditHelper';

export const createArticleListTema = ({
    articles = [],
    bookmarkedArticlesIds = [],
    isServer = false
}) =>
    articles.map((article, index) => {
        const {
            articleId,
            author,
            href,
            size = 'small',
            tag,
            time,
            title,
            variant,
            image = '',
            contentCode = '',
            hasVideo
        } = transformArticleFooditTema(article);

        const firstArticle = isServer && index === 0;
        return (
            <CommonCardFoodit
                articleId={articleId}
                showTime={Boolean(time)}
                time={time}
                linksProps={{ href, title }}
                size={size}
                variant={variant}
                src={SITE_FOODIT + image}
                alt={title}
                loading={firstArticle ? 'eager' : 'lazy'}
                fetchPriority={firstArticle ? 'high' : 'low'}
                tag={tag}
                title={title}
                author={author}
                className="col-span-8 col-span-4_md"
                key={articleId}
                contentCode={contentCode}
                hasVideo={hasVideo}
                fill={
                    bookmarkedArticlesIds.length &&
                    bookmarkedArticlesIds.includes(articleId)
                }
            />
        );
    });
