import React from 'react';
import get from 'lodash.get';
import ArticleBase from './articleBase';
import Media from '../media';

const articleMain = ({
    articleData,
    extraClasses,
    children,
    border,
    dataSection
}) => {
    let media = null;
    // TODO: validar tipo autor correcto
    if (articleData.subtype === 99) {
        // TODO: la imagen de autor viene por fuera de anglerfishhhhhhh.......
        media = (
            <Media
                mediaData={articleData.by.credits}
                href={articleData.website_url}
            />
        );
    } else {
        const imagenDestacada = get(articleData, 'promo_items.basic', null);
        const type = get(imagenDestacada, 'type', null);

        media = (
            <Media
                mediaData={type === 'image' ? imagenDestacada : null}
                href={articleData.website_url}
            />
        );
    }

    return (
        <ArticleBase
            articleData={articleData}
            extraClasses={extraClasses}
            mediaComponent={media}
            border={border}
            dataSection={dataSection}
        >
            {children}
        </ArticleBase>
    );
};

export default articleMain;
