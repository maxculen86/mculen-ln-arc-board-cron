import React from 'react';
import { Mediascroller } from '@ln/common-ui-mediascroller';
import CommonCardFoodit from '../../../../features/foodit-global/common/CommonCardFoodit/foodit';
import { Button } from '@ln/foodit-ui-button';
import StaticContent from '../../../../private/common/staticContent';

export const Carousel = ({ articles }) => {
    return (
        <Mediascroller
            className="flex flex-column gap-16 hide-mobile"
            elementsToScroll={4}
        >
            <Mediascroller.Track className="overflow-container">
                {articles.map(article => {
                    return <CommonCardFoodit article={article} />;
                })}
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
