import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Cardv2 } from '@ln/contenidos-ui-cardv2';
import { Icon } from '@ln/common-ui-icon';
import { Badge } from '@ln/contenidos-ui-badge';
import { useOnClickOutside } from '@ln/hooks';
import Video from './video';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { secondsToMinutes } from './helpers';
import { useCajaCarruselContext } from '../../../chains/LN10_Caja_Carrusel/components/cajaCarruselContext';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';

function CardVertical({
    title = '',
    src = '',
    badgeText = '',
    poster = '',
    duration = 0,
    cardPosition,
    videoId,
    layoutType,
    titleJwPlayer
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isTouching, setIsTouching] = useState(false);

    const { setCurrentIndex, onOpenMediaScrollerExpanded } =
        useCajaCarruselContext();

    const touchTimeoutRef = useRef(null);
    const containerCardRef = useRef(null);

    const handleCardMouseEnter = useCallback(() => {
        if (!isTouching) {
            setIsPlaying(true);
        }
    }, [isTouching]);

    const handleCardMouseLeave = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const handleCardTouchStart = useCallback(() => {
        setIsTouching(true);
        touchTimeoutRef.current = setTimeout(() => {
            setIsPlaying(true);
        }, 400);
    }, []);

    const handleClickCardOutside = useCallback(() => {
        clearTimeout(touchTimeoutRef?.current);
        setIsTouching(false);
        setIsPlaying(false);
    }, []);

    const handleClickCard = useCallback(() => {
        onOpenMediaScrollerExpanded();
        setCurrentIndex(cardPosition);
        addEventToDataLayerV2({
            event: 'video_view',
            contentType: 'video_story',
            origin: layoutType,
            rest: {
                page_title: titleJwPlayer,
                id_video: videoId
            }
        });
    }, []);

    useEffect(() => () => clearTimeout(touchTimeoutRef?.current), []);

    useOnClickOutside(containerCardRef, handleClickCardOutside);

    return (
        <div ref={containerCardRef}>
            <Cardv2
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
                onTouchStart={handleCardTouchStart}
                onClick={handleClickCard}
                className="card-vertical-carousel cursor-pointer"
                variant="vertical"
            >
                <Cardv2.Media>
                    <Video src={src} poster={poster} isPlaying={isPlaying} />
                </Cardv2.Media>
                <Cardv2.Description style={{ gap: '12px' }}>
                    {badgeText && (
                        <Badge type="negative" className="mb-4">
                            {badgeText}
                        </Badge>
                    )}
                    <Cardv2.Title title={title} />

                    {Boolean(duration) && (
                        <div className="flex ai-center gap-8 text-14 text-neutral-light-100">
                            <Icon size={20}>
                                <IconSprite name="mediaPlay" />
                            </Icon>
                            <time className="pr-8">
                                {secondsToMinutes(duration)}
                            </time>
                        </div>
                    )}
                </Cardv2.Description>
            </Cardv2>
        </div>
    );
}

CardVertical.propTypes = {
    title: PropTypes.string,
    src: PropTypes.string,
    badgeText: PropTypes.string,
    poster: PropTypes.string,
    duration: PropTypes.number,
    cardPosition: PropTypes.number.isRequired,
    videoId: PropTypes.string.isRequired,
    layoutType: PropTypes.string,
    titleJwPlayer: PropTypes.string.isRequired
};
CardVertical.defaultProps = {
    title: '',
    src: '',
    badgeText: '',
    poster: '',
    duration: 0,
    layoutType: ''
};
export default CardVertical;
