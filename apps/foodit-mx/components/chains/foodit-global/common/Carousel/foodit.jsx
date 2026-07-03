import React from 'react';
import { Mediascroller } from '@ln/common-ui-mediascroller';
import { Button } from '@ln/foodit-ui-button';
import classNames from 'classnames';

const CustomButtonTag = React.forwardRef((props, ref) => (
    <Button variant="secondary" rounded="rounded-circle" ref={ref} {...props} />
));

export function Carousel({ children, type, carouselMobile = false }) {
    const classCarouselMobile = carouselMobile
        ? 'pt-24 pt-0_md'
        : 'hide-mobile';

    const dataTestId = {
        nutritional: 'container-carousel-nutritional',
        category: 'container-category-cards-carousel',
        collection: 'container-cards-carousel',
        collection_4: 'container-cards-carousel-4'
    };
    const classMediaScroller = {
        nutritional: '--info-nutricional',
        category: '--carousel-category',
        collection: classCarouselMobile,
        collection_4: classCarouselMobile
    };
    const propsTrack = {
        nutritional: { fullWidth: true },
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
        nutritional: 'lg-none',
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
                data-testid={dataTestId[type]}
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

export default Carousel;
