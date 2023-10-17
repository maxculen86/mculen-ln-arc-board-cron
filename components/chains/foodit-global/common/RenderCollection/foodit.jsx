import React from 'react';
import CommonCardFoodit from '../../../../features/foodit-global/common/CommonCardFoodit/foodit';
import Carousel from '../Carousel/foodit';
import { LAYOUTS } from '../utils/helper-WebApi';
import RoofFoodit from '../../../../features/foodit-global/common/RoofFoodit/foodit';
import StaticContent from '../../../../private/common/staticContent';

const { CAROUSEL, BN_12_GRID } = LAYOUTS;

export const RenderCollection = ({
    rules,
    title,
    hideCaja,
    hideTitle,
    layout,
    error,
    articles
}) => {
    const { roofAs, classNameParent, classNameChildren, classNameRoof } = rules;
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
                    title={{ text: title, as: roofAs }}
                    hide={hideTitle}
                    className={classNameRoof}
                />
                <div className={classNameParent}>
                    {articles.map(article => (
                        <CommonCardFoodit
                            article={article}
                            className={classNameChildren}
                            key={article.title}
                        />
                    ))}
                </div>
            </StaticContent>
        )
    };

    return hideCaja || (error && error.message) ? <></> : options[layout];
};

export default RenderCollection;
