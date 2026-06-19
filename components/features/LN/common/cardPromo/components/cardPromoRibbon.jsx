import React from 'react';
import { cx } from '@ln/ds-cva';
import { useCardPromoContext } from '../context/cardPromoContext';
import { cardRibbonVariants, getResponsiveRibbonClasses } from '../styles';

function CardPromoRibbon({
    label = 'Exclusivo suscriptor',
    className,
    ...props
}) {
    const { size, responsiveSize } = useCardPromoContext();
    const { container: responsiveContainer, icon: responsiveIcon } =
        getResponsiveRibbonClasses(responsiveSize, size);

    return (
        <div
            role="note"
            aria-label={label}
            className={cx(
                cardRibbonVariants({ size }),
                responsiveContainer,
                className
            )}
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className={cx(
                    size === 18 ? 'size-16' : 'size-24',
                    responsiveIcon
                )}
            >
                <path
                    d="M12 2.5C13.1046 2.5 14 3.39543 14 4.5C14 5.01446 13.8035 5.48155 13.4844 5.83594L16.6494 10.0371L20.0391 7.89355C20.0137 7.76629 20 7.63473 20 7.5C20 6.39543 20.8954 5.5 22 5.5C23.1046 5.5 24 6.39543 24 7.5C24 8.60457 23.1046 9.5 22 9.5C21.952 9.5 21.9046 9.49551 21.8574 9.49219L20.4658 20.7217C20.4105 21.1655 20.0134 21.5 19.542 21.5H4.45801C3.98663 21.5 3.58947 21.1655 3.53418 20.7217L2.1416 9.49219C2.09476 9.49547 2.04768 9.5 2 9.5C0.895431 9.5 0 8.60457 0 7.5C0 6.39543 0.895431 5.5 2 5.5C3.10457 5.5 4 6.39543 4 7.5C4 7.6348 3.98539 7.76623 3.95996 7.89355L7.35059 10.0371L10.5146 5.83594C10.1958 5.48161 10 5.01423 10 4.5C10 3.39543 10.8954 2.5 12 2.5Z"
                    fill="#333333"
                />
            </svg>
        </div>
    );
}

CardPromoRibbon.displayName = 'CardPromo.Ribbon';

export default CardPromoRibbon;
