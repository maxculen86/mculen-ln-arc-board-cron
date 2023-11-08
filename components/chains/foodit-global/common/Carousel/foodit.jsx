import React from 'react';
import { Mediascroller } from '@ln/common-ui-mediascroller';
import { Button } from '@ln/foodit-ui-button';
import CommonCardFoodit from '../../../../features/foodit-global/common/CommonCardFoodit/foodit';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';

export const Carousel = ({ articles }) => {
    return (
        <Mediascroller
            className="flex flex-column gap-16 hide-mobile"
            elementsToScroll={4}
        >
            <Mediascroller.Track className="overflow-container">
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
                                key={articleId}
                                fill={false} // TODO: boolean receta guardada
                            />
                        );
                    }
                )}
            </Mediascroller.Track>
            <Mediascroller.Arrows
                arrowSize={16}
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
    );
};
export default Carousel;
