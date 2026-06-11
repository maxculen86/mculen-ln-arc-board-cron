import React from 'react';
import { cx } from '@ln/ds-cva';
import Image from '../../../../ui/ln/image/default';
import { useCardPromoContext } from '../context/cardPromoContext';
import { cardMediaVariants, getResponsiveCardClasses } from '../styles';

function CardPromoMedia({ src, alt, sources = [], className }) {
    const { size, orientation, responsiveSize, responsiveOrientation } =
        useCardPromoContext();
    const responsiveClasses = getResponsiveCardClasses(
        'media',
        responsiveSize,
        responsiveOrientation,
        size,
        orientation
    );
    return (
        <div
            className={cardMediaVariants({
                size,
                orientation,
                className: cx(responsiveClasses, className)
            })}
        >
            <Image
                key={src}
                src={src}
                alt={alt}
                sources={sources}
                objectFit="cover"
                hidePlaceholder
                classnames={{ wrapper: 'h-full w-full' }}
            />
        </div>
    );
}

CardPromoMedia.displayName = 'CardPromo.Media';

export default CardPromoMedia;
