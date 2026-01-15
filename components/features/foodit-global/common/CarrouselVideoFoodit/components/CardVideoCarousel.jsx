import React, { useCallback, useRef, useState } from 'react';
import { Badge } from '@ln/foodit-ui-badge';
import { Icon } from '@ln/common-ui-icon';
import { Image } from '@ln/common-ui-image';
import { Text } from '@ln/common-ui-text';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

import isSSR from '../../../../../private/LN/common/utils/isSSR';

import { useCajaCarruselContext } from '../../../../../chains/foodit_Carousel_Videos/cajaCarruselContext';
import { getClassNamesMedia, secondsToMinutes } from '../hooks/helpers';
import {
    useHandlePlayVideoCarrusel,
    useObserverMobAndTab
} from '../hooks/hook';

function CardCarouselVideo({
    textTitle,
    textAuthor,
    duration,
    badge,
    cardData = {},
    cardPosition = 0
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const isDesktop = !isSSR() && window?.innerWidth > 1279;
    const { onOpenMediaScrollerExpanded, setCurrentIndex } =
        useCajaCarruselContext();

    useHandlePlayVideoCarrusel({ videoRef, isPlaying });
    useObserverMobAndTab({ videoRef, setIsPlaying });
    const { classNamePoster, classNameVideo } = getClassNamesMedia(isPlaying);

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

    const handleOpen = useCallback(() => {
        onOpenMediaScrollerExpanded();
        setCurrentIndex(cardPosition);
    }, [onOpenMediaScrollerExpanded, setCurrentIndex, cardPosition]);

    return (
        <article className="cursor-pointer">
            <div
                role="button"
                tabIndex={0}
                data-testid="card-carousel-video"
                aria-label="Abrir video en pantalla completa"
                className="relative w-full ratio-9-16 overflow-hidden border border-light-200"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleOpen}
                onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOpen();
                    }
                }}
            >
                <div className="flex jc-center ai-center relative overflow-hidden ratio-9-16 -z-1 w-full h-full">
                    <Image
                        src={cardData.image.src}
                        alt={cardData.image.alt}
                        className={classNamePoster}
                    />

                    <video
                        ref={videoRef}
                        src={cardData.video.src}
                        playsInline
                        loop
                        muted
                        preload="metadata"
                        autoPlay={false}
                        className={classNameVideo}
                    />
                </div>

                <div className="text-neutral-light-1 absolute inset-x-0 bottom-0 z-5 h-[55%] px-16 md:px-24 xl:px-32 py-16 md:py-24 xl:py-32 flex flex-col items-center justify-end gap-16 text-center bg-gradient-video-card">
                    {badge && <Badge>{badge}</Badge>}

                    {textTitle && (
                        <Text className="prumo prumo-semibold text-24 font-primary font-normal">
                            {textTitle}
                        </Text>
                    )}

                    {textAuthor && (
                        <Text className="roboto text-14 font-secondary font-normal">
                            Por {textAuthor}
                        </Text>
                    )}

                    {duration && (
                        <div className="roboto text-14 flex justify-center">
                            <Icon size={20}>
                                <IconSprite name="play-filled" />
                            </Icon>
                            <Text>{secondsToMinutes(duration)}</Text>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

export default CardCarouselVideo;
