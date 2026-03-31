import React, { useState, useEffect } from 'react';
import { getViewport } from '../../../common/utils/homeHelper';

import ModArticle from '../../../../common/mod-article';
import get from '../../../../common/utils/get';
import getNumericRatingValue from '../../../../common/utils/getNumericRatingValue';
import {
    transform,
    getWithMedia,
    getWithSubhead,
    getLabel,
    getIsRenderAutor
} from './noteCardHelper';

function NoteCard({
    article: content,
    articleProps,
    customFields,
    outputType,
    promoItems,
    index,
    boxPosition,
    layout,
    videoBackground,
    isPowa,
    handleClick,
    registerSuccessEvent,
    mobileImage,
    searchableField,
    isApertura
}) {
    const [article, setArticle] = useState(
        transform(content, customFields, promoItems)
    );
    const [withMedia, setWithMedia] = useState(
        getWithMedia(customFields, articleProps, article)
    );
    const [withSubhead, setWithSubhead] = useState(
        getWithSubhead(articleProps, withMedia, customFields)
    );
    const [label, setLabel] = useState(
        getLabel(content, customFields, withMedia, layout)
    );
    const [isRenderAutor, setIsRenderAutor] = useState(
        getIsRenderAutor(customFields, layout)
    );
    const { device } = getViewport();

    useEffect(() => {
        setWithMedia(getWithMedia(customFields, articleProps, article));
    }, [article, articleProps, customFields]);

    useEffect(() => {
        setArticle(transform(content, customFields, promoItems));
        setLabel(getLabel(content, customFields, withMedia, layout));
        setWithSubhead(getWithSubhead(articleProps, withMedia, customFields));
        setIsRenderAutor(getIsRenderAutor(customFields, layout));
    }, [articleProps, content, customFields, promoItems, withMedia, layout]);

    const layoutGrillaVideo = layout === 'grillaVideo1' && '--l';
    const titleSizeNoMedia =
        !withMedia && get(articleProps, 'titleSizeNoMedia');

    return (
        (article && (
            <ModArticle
                articleData={article}
                withMedia={withMedia}
                link={get(article, 'website_url')}
                titleSize={
                    layoutGrillaVideo ||
                    titleSizeNoMedia ||
                    get(articleProps, 'titleSize')
                }
                titleText={get(article, 'headlines.basic')}
                titleTag={get(articleProps, 'titleTag', 'h2')}
                titleWeight={get(articleProps, 'titleWeight')}
                authors={get(article, 'marquesina')}
                subheadText={
                    get(articleProps, 'skipSubhead', false)
                        ? false
                        : withSubhead && get(article, 'subheadlines.basic')
                }
                subheadTag={get(articleProps, 'subheadTag', 'h3')}
                leadText={get(article, 'label.volanta.text')}
                outputType={outputType}
                isRenderAuthor={
                    get(articleProps, 'skipRenderAuthor', false)
                        ? false
                        : isRenderAutor
                }
                label={label}
                anexo={
                    get(articleProps, 'skipHtml', false)
                        ? false
                        : !isRenderAutor && get(customFields, 'html')
                }
                boxPosition={boxPosition}
                artPosition={`0${Number(index) + 1}`.slice(-2)}
                videoBackground={videoBackground}
                isPowa={isPowa}
                device={device}
                layout={layout}
                handleClick={handleClick}
                isApertura={isApertura}
                registerSuccessEvent={registerSuccessEvent}
                mobileImage={mobileImage}
                searchableField={searchableField}
                rating={getNumericRatingValue(
                    get(article, 'content_elements', [])
                )}
            />
        )) ||
        null
    );
}

export default NoteCard;
