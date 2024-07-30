import React from 'react';

import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import { filterBookmarksByArticledIs } from '../../../../features/foodit-global/common/bookmark/_helper';
import getImageAltText from '../../../../features/foodit-global/common/utils/getImageAltText';

import { LAYOUTS } from '../utils/helper-WebApi';

import Carousel from '../Carousel/foodit';
import RoofFoodit from '../../../../features/foodit-global/common/RoofFoodit/foodit';
import CommonCardFoodit from '../../../../features/foodit-global/common/CommonCardFoodit/foodit';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import {
    BOOKMARK_FILLED,
    BOOKMARK_PLUS
} from '../../../../features/foodit-global/common/bookmark/iconHelper';

const { CAROUSEL, BN_12_GRID } = LAYOUTS;

export const RenderCollection = ({
    rules,
    title,
    hideCaja,
    hideTitle,
    layout,
    error,
    link = '',
    collectionId = '',
    articles = []
}) => {
    const bookmarkedArticles = filterBookmarksByArticledIs(articles);
    const fill =
        bookmarkedArticles.length &&
        bookmarkedArticles.length === articles.length;

    const {
        roofAs = '',
        classNameParent = '',
        classNameChildren = '',
        classNameRoof = ''
    } = rules;
    const tooltipText = 'Guardar todo';

    const options = {
        [CAROUSEL]: (
            <div className="carousel-container">
                <RoofFoodit
                    title={{ text: title, as: roofAs }}
                    hide={hideTitle}
                    className={classNameRoof}
                    linkProps={{ href: link, text: title }}
                    buttonProps={{
                        text: tooltipText,
                        title: tooltipText,
                        'data-collectionid': collectionId,
                        onClick: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            window?.LN?.observable?.publish('openModal', {
                                carouselTitle: title,
                                ids: articles.map(article => article.articleId),
                                collectionArticles: articles.filter(
                                    article =>
                                        !bookmarkedArticles.includes(
                                            article.articleId
                                        )
                                )
                            });
                        }
                    }}
                    icon={
                        <IconSprite
                            name={fill ? BOOKMARK_FILLED : BOOKMARK_PLUS}
                            critical={false}
                        />
                    }
                />
                <Carousel
                    articles={articles}
                    bookmarkedArticlesIds={bookmarkedArticles}
                />
            </div>
        ),
        [BN_12_GRID]: (
            <>
                <RoofFoodit
                    title={{ text: title }}
                    hide={hideTitle}
                    className={classNameRoof}
                    linkProps={{ href: link, text: title }}
                />
                <div className={classNameParent}>
                    {articles.map(
                        ({
                            articleId,
                            author,
                            href,
                            size,
                            tag,
                            time,
                            title: titleArticle,
                            variant,
                            image = {},
                            contentCode = ''
                        }) => {
                            const { resized_urls, url } = image;
                            const { resizedUrl = '' } = getShortestImage(
                                resized_urls
                            );

                            return (
                                <CommonCardFoodit
                                    articleId={articleId}
                                    showTime={Boolean(time)}
                                    time={time}
                                    linksProps={{ href, title: titleArticle }}
                                    size={size}
                                    variant={variant}
                                    src={resizedUrl || url}
                                    alt={getImageAltText(image)}
                                    sources={getImagesToLoadWithPicture(
                                        resized_urls
                                    )}
                                    loading={'lazy'}
                                    fetchPriority={'low'}
                                    tag={tag}
                                    title={titleArticle}
                                    author={author}
                                    className={classNameChildren}
                                    key={articleId}
                                    contentCode={contentCode}
                                />
                            );
                        }
                    )}
                </div>
            </>
        )
    };

    return hideCaja || (error && error.message) ? <></> : options[layout];
};

export default RenderCollection;
