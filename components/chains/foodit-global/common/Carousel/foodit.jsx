import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Mediascroller } from '@ln/common-ui-mediascroller';
import { Button } from '@ln/foodit-ui-button';
import CommonCardFoodit from '../../../../features/foodit-global/common/CommonCardFoodit/foodit';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import getImageAltText from '../../../../features/foodit-global/common/utils/getImageAltText';

const CustomButtonTag = React.forwardRef((props, ref) => (
    <Button variant="secondary" rounded="rounded-circle" ref={ref} {...props} />
));

export function Carousel({ articles = [], bookmarkedArticlesIds = [] }) {
    return (
        <Mediascroller className="flex flex-column gap-16 hide-mobile">
            <Mediascroller.Track
                fullWidth
                data-test-id="container-cards-carousel"
            >
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
                        image = {},
                        contentCode = ''
                    }) => {
                        const { resized_urls: resizedUrls, url } = image;
                        const { resizedUrl = '' } =
                            getShortestImage(resizedUrls);

                        return (
                            <CommonCardFoodit
                                fatherType="carousel"
                                articleId={articleId}
                                showTime={Boolean(time)}
                                time={time}
                                linksProps={{ href, title }}
                                size={size}
                                variant={variant}
                                src={resizedUrl || url}
                                alt={getImageAltText(image)}
                                sources={getImagesToLoadWithPicture(
                                    resizedUrls
                                )}
                                loading="lazy"
                                fetchPriority="low"
                                tag={tag}
                                title={title}
                                author={author}
                                key={articleId}
                                fill={bookmarkedArticlesIds.includes(articleId)}
                                titleEllipsis={2}
                                contentCode={contentCode}
                            />
                        );
                    }
                )}
            </Mediascroller.Track>
            <Mediascroller.Arrows
                arrowSize={16}
                className="bg-light-1"
                buttonTag={CustomButtonTag}
            />
            <Mediascroller.Progress
                containerClassName="w-144 h-5 mx-auto bg-light-100 rounded-24"
                className="bg-primary-positive rounded-24 transition-linear"
            />
        </Mediascroller>
    );
}

Carousel.propTypes = {
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
            contentCode: PropTypes.string
        })
    ).isRequired,
    bookmarkedArticlesIds: PropTypes.arrayOf(PropTypes.string)
};

Carousel.defaultProps = {
    bookmarkedArticlesIds: []
};

export default Carousel;
