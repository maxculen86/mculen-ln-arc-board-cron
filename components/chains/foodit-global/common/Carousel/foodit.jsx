import React from 'react';
import { Mediascroller } from '@ln/common-ui-mediascroller';
import { Button } from '@ln/foodit-ui-button';
import CommonCardFoodit from '../../../../features/foodit-global/common/CommonCardFoodit/foodit';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import getImageAltText from '../../../../features/foodit-global/common/utils/getImageAltText';

export const Carousel = ({ articles = [], bookmarkedArticlesIds = [] }) => {
    return (
        <>
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
                            const { resized_urls, url } = image;
                            const { resizedUrl = '' } = getShortestImage(
                                resized_urls
                            );

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
                                    sources={getImagesToLoadWithPicture(
                                        resized_urls
                                    )}
                                    loading={'lazy'}
                                    fetchPriority={'low'}
                                    tag={tag}
                                    title={title}
                                    author={author}
                                    key={articleId}
                                    fill={bookmarkedArticlesIds.includes(
                                        articleId
                                    )}
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
                    buttonTag={props => (
                        <Button
                            variant="secondary"
                            rounded="rounded-circle"
                            {...props}
                        />
                    )}
                />
                <Mediascroller.Progress
                    containerClassName="w-144 h-5 mx-auto bg-light-100 rounded-24"
                    className="bg-primary-positive rounded-24 transition-linear"
                />
            </Mediascroller>
        </>
    );
};
export default Carousel;
