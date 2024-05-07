import React from 'react';
import Carousel from '../Carousel/foodit';
import { LAYOUTS } from '../utils/helper-WebApi';
import RoofFoodit from '../../../../features/foodit-global/common/RoofFoodit/foodit';
import CommonCardFoodit from '../../../../features/foodit-global/common/CommonCardFoodit/foodit';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import { filterBookmarksByArticledIs } from '../../../../features/foodit-global/common/bookmark/_helper';

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
    const options = {
        [CAROUSEL]: (
            <div className="carousel-container">
                <RoofFoodit
                    title={{ text: title, as: roofAs }}
                    hide={hideTitle}
                    className={classNameRoof}
                    linkProps={{ href: link, text: title }}
                    buttonProps={{
                        text: 'Guardar todo',
                        'data-collectionid': collectionId,
                        onClick: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.LN.observable.publish('openModal', {
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
                            name={fill ? 'bookmark-filled' : 'bookmark-plus'}
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
                            title,
                            variant,
                            image = {}
                        }) => {
                            const { alt_text, resized_urls, url } = image;
                            return (
                                <CommonCardFoodit
                                    articleId={articleId}
                                    showTime={Boolean(time)}
                                    time={time}
                                    linksProps={{ href, title }}
                                    size={size}
                                    variant={variant}
                                    src={url}
                                    alt={alt_text}
                                    sources={getImagesToLoadWithPicture(
                                        resized_urls
                                    )}
                                    loading={'lazy'}
                                    fetchPriority={'low'}
                                    tag={tag}
                                    title={title}
                                    author={author}
                                    className={classNameChildren}
                                    key={articleId}
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
