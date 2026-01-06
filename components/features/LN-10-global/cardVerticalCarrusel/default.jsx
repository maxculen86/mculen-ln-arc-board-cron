import React, { useCallback, useRef, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/cva';
import Video from './video';
import { secondsToMinutes } from './helpers';
import { useCajaCarruselContext } from '../../../chains/LN10_Caja_Carrusel/components/cajaCarruselContext';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import { productClickFromClient } from '../../../private/common/utils/viewability';
import { registeredIdsSetAndInteractions } from '../../../chains/LN10_Caja_Carrusel/components/helpers';
import isSSR from '../../../private/LN/common/utils/isSSR';
import CardVertical from '../../ui/ln/card/default';
import Icon from '../../ui/ln/icon/default';

function CardVerticalContainer({
    title = '',
    src = '',
    badgeText = '',
    poster = '',
    duration = 0,
    cardPosition,
    videoId,
    layoutType = '',
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
        <div ref={containerCardRef} data-tw>
            <CardVertical
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClickCard}
                className={_className}
                {...viewabilityData}
            >
                <CardVertical.Media className="w-full h-full">
                    <Video
                        src={src}
                        poster={poster}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    />
                </CardVertical.Media>
                <CardVertical.Description
                    className="w-full"
                    style={{ gap: '12px' }}
                >
                    {badgeText && (
                        <span className="bg-black rounded-16 uppercase z-1 text-[12px] px-8 py-6 text-white">
                            {badgeText}
                        </span>
                    )}
                    <CardVertical.Title title={title} />
                    {Boolean(duration) && (
                        <div className="flex ai-center gap-8 text-14 leading-0 text-neutral-light-100">
                            <div className="h-20 w-20 flex ai-center jc-center">
                                <Icon
                                    name="mediaPlay"
                                    size={20}
                                    className="custom-class"
                                />
                            </div>
                            <time className="pr-8">
                                {secondsToMinutes(duration)}
                            </time>
                        </div>
                    )}
                </CardVertical.Description>
            </CardVertical>
        </div>
    );
}

export default CardVerticalContainer;
