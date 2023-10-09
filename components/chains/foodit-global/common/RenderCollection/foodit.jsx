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
    const { roofAs, classNameParent, classNameChildren } = rules;
    const options = {
        [CAROUSEL]: (
            <>
                <RoofFoodit
                    title={{ text: title, as: roofAs }}
                    hide={hideTitle}
                />
                <Carousel articles={articles} />
            </>
        ),
        [BN_12_GRID]: (
            <>
                <StaticContent>
                    <RoofFoodit
                        title={{ text: title, as: roofAs }}
                        hide={hideTitle}
                    />
                    <div className={classNameParent}>
                        {articles.map(article => (
                            <CommonCardFoodit
                                article={article}
                                className={classNameChildren}
                            />
                        ))}
                    </div>
                </StaticContent>
            </>
        )
    };

    return hideCaja || (error && error.message) ? <></> : options[layout];
};

export default RenderCollection;
