import React, { useCallback, useRef, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/ds-cva';
import Video from './video';
import {
    secondsToMinutes,
    cardVideoClassNames,
    getDesktopPreviewVideo,
    getDesktopPosterImage
} from './helpers';
import { useCajaCarruselContext } from '../../../chains/LN10_Caja_Carrusel/components/cajaCarruselContext';
import { productClickFromClient } from '../../../private/common/utils/viewability';
import isSSR from '../../../private/LN/common/utils/isSSR';
import Icon from '../../ui/ln/icon/default';
import CardVideo from '../../ui/ln/cardVideo/default';

function CardCarruselContainer({
    title = '',
    src = '',
    badgeText = '',
    poster = '',
    duration = 0,
    cardPosition,
    videoId,
    layoutType,
    titleJwPlayer,
    variant,
    shouldLoadPreview = false,
    ...viewabilityData
}) {
    const [isPlaying, setIsPlaying] = useState(false);

    const { globalContent = {} } = useAppContext();
    const { _id = '' } = globalContent;
    const skipProductClickScore =
        _id.includes('quesale') || _id.includes('que-sale');

    const { setCurrentIndex, onOpenMediaScrollerExpanded } =
        useCajaCarruselContext();

    const containerCardRef = useRef(null);

    const handleProductClick = event => {
        if (skipProductClickScore) return;
        productClickFromClient(event, 'manual');
    };

    const isDesktop = !isSSR() && window?.innerWidth > 1279;
    const isHorizontalDesktop = variant === 'horizontal' && isDesktop;
    const previewVideoSrc = isHorizontalDesktop
        ? getDesktopPreviewVideo(src)
        : src;
    const previewPosterImage = isHorizontalDesktop
        ? getDesktopPosterImage(poster)
        : poster;

    const handleClickCard = useCallback(
        event => {
            onOpenMediaScrollerExpanded();
            setCurrentIndex(cardPosition);
            handleProductClick(event);
        },
        [cardPosition, onOpenMediaScrollerExpanded, setCurrentIndex]
    );

    const handleMouseEnter = useCallback(() => {
        if (isDesktop) {
            setIsPlaying(true);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (isDesktop) {
            setIsPlaying(false);
        }
    }, []);

    return (
        <div ref={containerCardRef}>
            <CardVideo
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClickCard}
                className={cardVideoClassNames({
                    variant,
                    withTitle: Boolean(title)
                })}
                variant={variant}
                {...viewabilityData}
            >
                <CardVideo.Media>
                    <Video
                        src={shouldLoadPreview ? previewVideoSrc : undefined}
                        poster={previewPosterImage}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    />
                </CardVideo.Media>
                <CardVideo.Description className="w-full">
                    <CardVideo.Badge>{badgeText}</CardVideo.Badge>
                    <div
                        className={cx(
                            'flex flex-col items-center gap-16',
                            variant === 'horizontal' &&
                                'flex-row justify-between w-full md:flex-col md:items-center max-md:mt-auto',
                            variant === 'vertical' && 'flex-col items-center'
                        )}
                    >
                        <CardVideo.Title title={title} />
                        {Boolean(duration) && (
                            <div
                                className={cx(
                                    'flex items-center gap-8 text-14 leading-0 text-neutral-100 pl-8',
                                    variant === 'horizontal' && 'max-md:hidden'
                                )}
                            >
                                <div className="h-20 w-20 flex items-center justify-center">
                                    <Icon name="play-filled" size={20} />
                                </div>
                                <time className="pr-8">
                                    {secondsToMinutes(duration)}
                                </time>
                            </div>
                        )}
                    </div>
                </CardVideo.Description>
            </CardVideo>
        </div>
    );
}

export default CardCarruselContainer;
