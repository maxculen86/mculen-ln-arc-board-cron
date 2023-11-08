import React from 'react';
import Carousel from '../Carousel/foodit';
import { LAYOUTS } from '../utils/helper-WebApi';
import RoofFoodit from '../../../../features/foodit-global/common/RoofFoodit/foodit';
import StaticContent from '../../../../private/common/staticContent';
import CommonCardFoodit from '../../../../features/foodit-global/common/CommonCardFoodit/foodit';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';

const { CAROUSEL, BN_12_GRID } = LAYOUTS;

export const RenderCollection = ({
    rules,
    title,
    hideCaja,
    hideTitle,
    layout,
    error,
    articles = []
}) => {
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
                />
                <Carousel articles={articles} />
            </div>
        ),
        [BN_12_GRID]: (
            <StaticContent className="hidden bn-12">
                <RoofFoodit
                    title={{ text: title }}
                    hide={hideTitle}
                    className={classNameRoof}
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
                                    fill={false} // TODO: boolean receta guardada
                                />
                            );
                        }
                    )}
                </div>
            </StaticContent>
        )
    };

    return hideCaja || (error && error.message) ? <></> : options[layout];
};

export default RenderCollection;
