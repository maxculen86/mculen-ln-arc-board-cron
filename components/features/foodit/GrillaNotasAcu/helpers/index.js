import React from 'react';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';
import CommonCardFoodit from '../../../foodit-global/common/CommonCardFoodit/foodit';
import { transformArticleFoodit } from '../../../foodit-global/common/utils/notaFooditHelper';

export const createArticleList = ({ articles = [] } = {}) => {
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
        const { alt_text, caption, subtitle, resized_urls, url } = image;
        return (
            <CommonCardFoodit
                articleId={articleId}
                showTime={Boolean(time)}
                time={time}
                linksProps={{ href, title }}
                size={size}
                variant={variant}
                src={url}
                alt={alt_text || caption || subtitle}
                sources={getImagesToLoadWithPicture(resized_urls)}
                loading={'lazy'}
                fetchPriority={'low'}
                tag={tag}
                title={title}
                author={author}
                className="col-span-8 col-span-4_md"
                key={articleId}
                fill={false} // TODO: boolean receta guardada
            />
        );
    });
};
