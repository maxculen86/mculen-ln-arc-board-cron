import React, { memo } from 'react';
import { cx } from '@ln/ds-cva';
import Image from '../../../../features/ui/ln/image/default';
import CardFooter from './components/CardFooter';
import {
    cardContainer,
    imageContainer,
    imageStyles,
    textContainer
} from './styles';

function Card({
    variant = 'regular',
    title,
    href,
    imgSrc,
    author,
    formattedDate,
    dateTime,
    description,
    loading: loadingProp,
    fetchPriority: fetchPriorityProp
}) {
    const _cardContainer = cardContainer({ variant });
    const _imageContainer = imageContainer({ variant });
    const _imageStyles = imageStyles({ variant });
    const _textContainer = textContainer({ variant });

    const textStyles = cx(variant === 'highlights' && 'flex flex-col gap-8');

    const showImage = imgSrc || variant !== 'highlights';

    const resolvedLoading =
        loadingProp ?? (variant === 'highlights' ? 'eager' : 'lazy');
    const resolvedFetchPriority =
        fetchPriorityProp ?? (variant === 'highlights' ? 'high' : 'low');

    return (
        <a href={href} className={_cardContainer}>
            {showImage && (
                <div className={_imageContainer} aria-hidden="true">
                    <Image
                        className={_imageStyles}
                        src={imgSrc}
                        alt={title}
                        loading={resolvedLoading}
                        decoding="async"
                        fetchPriority={resolvedFetchPriority}
                        skipResizerReplace
                    />
                </div>
            )}
            <div className={_textContainer}>
                <div className={textStyles}>
                    <h3 className="font-primary text-[22px] md:text-[18px]">
                        <div>{title}</div>
                    </h3>
                    {variant === 'highlights' && description ? (
                        <p className="text-body-sm text-base-light font-secondary">
                            {description}
                        </p>
                    ) : null}
                </div>
                <CardFooter
                    variant={variant}
                    author={author}
                    formattedDate={formattedDate}
                    dateTime={dateTime}
                />
            </div>
        </a>
    );
}

export default memo(Card);
