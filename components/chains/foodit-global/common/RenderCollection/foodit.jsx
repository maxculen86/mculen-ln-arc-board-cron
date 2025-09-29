import React from 'react';
import PropTypes from 'fusion:prop-types';

import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import { filterBookmarksByArticledIs } from '../../../../features/foodit-global/common/bookmark/_helper';
import getImageAltText from '../../../../features/foodit-global/common/utils/getImageAltText';

import { LAYOUTS } from '../utils/helper-WebApi';

import { Carousel } from '../Carousel/foodit';
import { RoofFoodit } from '../../../../features/foodit-global/common/RoofFoodit/foodit';
import CommonCardFoodit from '../../../../features/foodit-global/common/CommonCardFoodit/foodit';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import {
    BOOKMARK_FILLED,
    BOOKMARK_PLUS
} from '../../../../features/foodit-global/common/bookmark/iconHelper';

const { CAROUSEL, CAROUSEL_4, BN_12_GRID } = LAYOUTS;
const ELEMENTS_TO_OPTIMIZE_IN_MOBILE_CAROUSEL = 1;

export function RenderCollection({
    rules,
    title,
    hideCaja,
    hideTitle,
    layout,
    error,
    carouselMobile,
    link = '',
    collectionId = '',
    articles = [],
    carouselIndex = 0
}) {
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
    const tooltipText = fill ? 'Guardado' : 'Guardar todo';

    const buttonsProps = {
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
                    article => !bookmarkedArticles.includes(article.articleId)
                )
            });
        }
    };

    const renderArticles = articles.map(
        (
            {
                articleId,
                author,
                href,
                size,
                tag,
                time,
                title: titleArticle,
                variant,
                image = {},
                contentCode = '',
                hasVideo
            },
            index
        ) => {
            const { resized_urls: resizedUrls, url } = image;
            const { resizedUrl = '' } = getShortestImage(resizedUrls);

            const isFirstCarousel = carouselIndex === 0;
            const isMobile =
                typeof window !== 'undefined' && window.innerWidth <= 768;
            const shouldOptimize =
                isFirstCarousel && isMobile && carouselMobile;

            const elementsToOptimize = [CAROUSEL, CAROUSEL_4].includes(layout)
                ? ELEMENTS_TO_OPTIMIZE_IN_MOBILE_CAROUSEL
                : 0;
            const hasEagerLoading =
                shouldOptimize && index < elementsToOptimize;

            const imageProps = hasEagerLoading
                ? { loading: 'eager', fetchPriority: 'high' }
                : { loading: 'lazy', fetchPriority: 'low' };

            const propsCard = {
                [CAROUSEL]: {
                    fill: bookmarkedArticles.includes(articleId),
                    titleEllipsis: 2
                },
                [CAROUSEL_4]: {
                    fill: bookmarkedArticles.includes(articleId),
                    titleEllipsis: 2
                },
                [BN_12_GRID]: {
                    className: classNameChildren
                }
            };

            return (
                <CommonCardFoodit
                    fatherType={layout}
                    articleId={articleId}
                    showTime={Boolean(time)}
                    time={time}
                    linksProps={{ href, title: titleArticle }}
                    size={size}
                    variant={variant}
                    src={resizedUrl || url}
                    alt={getImageAltText(image)}
                    sources={getImagesToLoadWithPicture(false, resizedUrls)}
                    loading={imageProps.loading}
                    fetchPriority={imageProps.fetchPriority}
                    tag={tag}
                    title={titleArticle}
                    author={author}
                    key={articleId}
                    contentCode={contentCode}
                    hasVideo={hasVideo}
                    {...propsCard[layout]}
                />
            );
        }
    );

    const getCarouselFromType = type => (
        <div className="carousel-container">
            <RoofFoodit
                carouselMobile={carouselMobile}
                title={{ text: title, as: roofAs }}
                hide={hideTitle}
                className={classNameRoof}
                linkProps={{ href: link, text: title }}
                buttonProps={buttonsProps}
                icon={
                    <IconSprite
                        name={fill ? BOOKMARK_FILLED : BOOKMARK_PLUS}
                        critical={false}
                    />
                }
            />
            <Carousel carouselMobile={carouselMobile} type={type}>
                {renderArticles}
            </Carousel>
        </div>
    );

    const options = {
        [CAROUSEL]: getCarouselFromType('collection'),
        [CAROUSEL_4]: getCarouselFromType('collection_4'),
        [BN_12_GRID]: (
            <>
                <RoofFoodit
                    title={{ text: title }}
                    hide={hideTitle}
                    className={classNameRoof}
                    linkProps={{ href: link, text: title }}
                />
                <div className={classNameParent}>{renderArticles}</div>
            </>
        )
    };

    return hideCaja || (error && error.message)
        ? React.Fragment
        : options[layout];
}

RenderCollection.propTypes = {
    rules: PropTypes.shape({
        roofAs: PropTypes.string,
        classNameParent: PropTypes.string,
        classNameChildren: PropTypes.string,
        classNameRoof: PropTypes.string
    }).isRequired,
    title: PropTypes.string.isRequired,
    hideCaja: PropTypes.bool,
    hideTitle: PropTypes.bool,
    carouselMobile: PropTypes.bool,
    layout: PropTypes.oneOf([CAROUSEL, BN_12_GRID]).isRequired,
    error: PropTypes.shape({
        message: PropTypes.string
    }),
    link: PropTypes.string,
    collectionId: PropTypes.string,
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            articleId: PropTypes.string.isRequired,
            author: PropTypes.string,
            href: PropTypes.string,
            size: PropTypes.string,
            tag: PropTypes.string,
            time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            title: PropTypes.string.isRequired,
            variant: PropTypes.string,
            image: PropTypes.shape({
                resized_urls: PropTypes.arrayOf(
                    PropTypes.shape({
                        url: PropTypes.string
                    })
                ),
                url: PropTypes.string
            }),
            contentCode: PropTypes.string,
            hasVideo: PropTypes.bool
        })
    ).isRequired,
    type: PropTypes.string,
    carouselIndex: PropTypes.number
};

RenderCollection.defaultProps = {
    hideCaja: false,
    hideTitle: false,
    carouselMobile: false,
    link: '',
    collectionId: '',
    error: null,
    type: ''
};

export default RenderCollection;
