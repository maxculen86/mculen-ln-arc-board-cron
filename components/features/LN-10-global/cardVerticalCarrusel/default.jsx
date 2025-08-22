import React, { useCallback, useRef, useState } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import { Cardv2 } from '@ln/contenidos-ui-cardv2';
import { Icon } from '@ln/common-ui-icon';
import { Badge } from '@ln/contenidos-ui-badge';
import { cx } from '@ln/cva';
import Video from './video';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { secondsToMinutes } from './helpers';
import { useCajaCarruselContext } from '../../../chains/LN10_Caja_Carrusel/components/cajaCarruselContext';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import { productClickFromClient } from '../../../private/common/utils/viewability';
import { registeredIdsSetAndInteractions } from '../../../chains/LN10_Caja_Carrusel/components/helpers';
import isSSR from '../../../private/LN/common/utils/isSSR';

function CardVertical({
    title = '',
    src = '',
    badgeText = '',
    poster = '',
    duration = 0,
    cardPosition,
    videoId,
    layoutType,
    titleJwPlayer,
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

    const handleClickCard = useCallback(event => {
        onOpenMediaScrollerExpanded();
        setCurrentIndex(cardPosition);
        registeredIdsSetAndInteractions.add('clickEventRegistered');
        addEventToDataLayerV2({
            event: 'video_view',
            contentType: 'video_story',
            origin: layoutType,
            rest: {
                page_title: titleJwPlayer,
                id_video: videoId
            }
        });
        handleProductClick(event);
    }, []);

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

    const _className = cx(
        'card-vertical-carousel',
        'cursor-pointer',
        title ? 'bg-gradient-accent' : 'bg-gradient-accent-sm'
    );

    return (
        <div ref={containerCardRef}>
            <Cardv2
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClickCard}
                variant="vertical"
                className={_className}
                {...viewabilityData}
            >
                <Cardv2.Media>
                    <Video
                        src={src}
                        poster={poster}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    />
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
