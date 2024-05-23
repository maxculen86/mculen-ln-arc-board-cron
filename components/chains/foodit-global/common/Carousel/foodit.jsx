import React, { useState } from 'react';
import { Mediascroller } from '@ln/common-ui-mediascroller';
import { Button } from '@ln/foodit-ui-button';
import CommonCardFoodit from '../../../../features/foodit-global/common/CommonCardFoodit/foodit';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';
import { getTypeOfDevice } from '@ln/hooks';
import getImageAltText from '../../../../features/foodit-global/common/utils/getImageAltText';

export const Carousel = ({ articles = [], bookmarkedArticlesIds = [] }) => {
    const device = getTypeOfDevice({
        breakpoints: {
            mobile: 768
        }
    });

    const isMobile = device === 'mobile';
    const elementsToScroll = 4;
    const page = 1;

    const [articlesShow, setArticlesShow] = useState(
        isMobile ? [...articles.slice(0, elementsToScroll * page)] : articles
    );
    const showButtonLoad = isMobile && articles.length !== articlesShow.length;

    const loadMore = () => {
        setArticlesShow(articles.slice(0, elementsToScroll * (page + 1)));
    };

    return (
        <>
            <Mediascroller
                className="flex flex-column gap-16 hide-mobile"
                elementsToScroll={elementsToScroll}
            >
                <Mediascroller.Track fullWidth>
                    {articlesShow.map(
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
                            const { resized_urls, url } = image;
                            return (
                                <CommonCardFoodit
                                    articleId={articleId}
                                    showTime={Boolean(time)}
                                    time={time}
                                    linksProps={{ href, title }}
                                    size={size}
                                    variant={variant}
                                    src={url}
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
            {showButtonLoad && (
                <div className="flex jc-center pt-32 sm-only">
                    <Button
                        title="Ver más"
                        variant="secondary"
                        onClick={loadMore}
                    >
                        Ver más
                    </Button>
                </div>
            )}
        </>
    );
};
export default Carousel;
