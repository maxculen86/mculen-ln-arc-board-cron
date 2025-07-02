import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Mediascroller } from '@ln/common-ui-mediascroller';
import { Button } from '@ln/foodit-ui-button';
import classNames from 'classnames';

const CustomButtonTag = React.forwardRef((props, ref) => (
    <Button variant="secondary" rounded="rounded-circle" ref={ref} {...props} />
));

export function Carousel({ children, type }) {
    const dataTestId = {
        category: 'container-category-cards-carousel',
        collection: 'container-cards-carousel',
        collection_4: 'container-cards-carousel-4'
    };
    const classMediaScroller = {
        category: '--carousel-category',
        collection: 'hide-mobile',
        collection_4: 'hide-mobile'
    };
    const propsTrack = {
        category: {
            className: 'overflow-container'
        },
        collection: {
            fullWidth: true
        },
        collection_4: {
            fullWidth: true
        }
    };
    const classProgress = {
        category: 'lg-none',
        collection: '',
        collection_4: ''
    };

    const containerClassName = classNames(
        'w-144 h-5 mx-auto bg-light-100 rounded-24',
        classProgress[type]
    );

    return (
        <Mediascroller
            className={`flex flex-column gap-16 ${classMediaScroller[type]}`}
        >
            <Mediascroller.Track
                {...propsTrack[type]}
                data-test-id={dataTestId[type]}
            >
                {children}
            </Mediascroller.Track>
            {['collection'].includes(type) && (
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
