import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Mediascroller } from '@ln/common-ui-mediascroller';
import { Button } from '@ln/foodit-ui-button';
import classNames from 'classnames';

const CustomButtonTag = React.forwardRef((props, ref) => (
    <Button variant="secondary" rounded="rounded-circle" ref={ref} {...props} />
));

export function Carousel({ children, type }) {
    const classMediaScroller = {
        category: '--carousel-category',
        collection: 'hide-mobile'
    };
    const propsTrack = {
        category: {
            className: 'overflow-container'
        },
        collection: {
            fullWidth: true,
            'data-test-id': 'container-cards-carousel'
        }
    };
    const classProgress = {
        category: 'lg-none',
        collection: ''
    };

    const containerClassName = classNames(
        'w-144 h-5 mx-auto bg-light-100 rounded-24',
        classProgress[type]
    );

    return (
        <Mediascroller
            className={`flex flex-column gap-16 ${classMediaScroller[type]}`}
        >
            <Mediascroller.Track {...propsTrack[type]}>
                {children}
            </Mediascroller.Track>
            {type === 'collection' && (
                <Mediascroller.Arrows
                    arrowSize={16}
                    className="bg-light-1"
                    buttonTag={CustomButtonTag}
                />
            )}
            <Mediascroller.Progress
                containerClassName={containerClassName}
                className="bg-primary-positive rounded-24 transition-linear"
            />
        </Mediascroller>
    );
}

Carousel.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string.isRequired
};

export default Carousel;
