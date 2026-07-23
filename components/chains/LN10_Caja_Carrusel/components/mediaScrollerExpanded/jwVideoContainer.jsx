import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@ln/hooks';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import ShareV2 from '../../../../features/LN-common/shareV2/default';
import { videoContainerExpandedClasses } from './styles';
import usePersistentJwPlayer from '../hooks/usePersistentJwPlayer';
import { positionOver } from '../hooks/jwPlayerManager';
import { OVERLAY_Z_INDEX } from '../hooks/jwPlayerShared';
import get from '../../../../private/common/utils/get';

const SWIPE_LEGEND_TIMEOUT_MS = 5000;
const noopCleanup = () => {};

export function isOverlayVisible(listVideoData, currentIndex) {
    if (!listVideoData || !get(listVideoData, 'length')) return false;
    const item = get(listVideoData, [currentIndex]);
    if (!item) return false;
    return !get(item, 'isBanner');
}

function JwVideoContainer({
    handleNextCallback,
    isLastVideo,
    listVideoData = [],
    variant,
    ref
}) {
    const { onCloseMediaScrollerExpanded, currentIndex } =
        useCajaCarruselContext();

    const [showLegendSwipeUp, setShowLegendSwipeUp] = useState(isLastVideo);

    usePersistentJwPlayer({
        listVideoData,
        variant,
        handleNextCallback,
        scrollerRef: ref
    });

    const playerSlotRef = useRef(null);
    const { width: viewportWidth } = useWindowSize();

    useEffect(() => {
        const slot = playerSlotRef.current;
        const isHorizontal = variant === 'horizontal';
        const scroller = isHorizontal
            ? get(ref, 'current')
            : get(slot, 'parentElement');
        if (!scroller) return noopCleanup;
        if (!isHorizontal && !slot) return noopCleanup;

        const activeItem = scroller.querySelector(
            `[data-scroller-index="${currentIndex}"]`
        );
        if (!activeItem || !isOverlayVisible(listVideoData, currentIndex)) {
            return noopCleanup;
        }

        // Mounted in the <dialog> top-layer node, not document.body: a
        // body-level host renders behind the modal, and the scroller's
        // `will-change: transform` creates a containing block that would push
        // a fixed host off-screen. The dialog element has neither problem.
        const mountTarget = isHorizontal
            ? scroller.closest('dialog') || document.body
            : slot.closest('dialog') || slot;
        const positionTarget =
            activeItem.querySelector('.placeholder-jwplayer') || activeItem;
        const positionPlayer = () => positionOver(positionTarget, mountTarget);
        positionPlayer();

        scroller.addEventListener('scroll', positionPlayer, { passive: true });
        window.addEventListener('scroll', positionPlayer, { passive: true });

        if (typeof ResizeObserver !== 'function') {
            return () => {
                scroller.removeEventListener('scroll', positionPlayer);
                window.removeEventListener('scroll', positionPlayer);
            };
        }

        const resizeObserver = new ResizeObserver(positionPlayer);
        resizeObserver.observe(activeItem);
        resizeObserver.observe(scroller);

        return () => {
            resizeObserver.disconnect();
            scroller.removeEventListener('scroll', positionPlayer);
            window.removeEventListener('scroll', positionPlayer);
        };
    }, [currentIndex, listVideoData, viewportWidth, ref, variant]);

    useEffect(() => {
        if (!showLegendSwipeUp) return noopCleanup;

        const timer = setTimeout(
            () => setShowLegendSwipeUp(false),
            SWIPE_LEGEND_TIMEOUT_MS
        );

        return () => clearTimeout(timer);
    }, [showLegendSwipeUp]);

    if (!listVideoData.length) return null;

    const {
        containerClassName,
        listItemClassName,
        videoContainerClassName,
        videoSocialContainerClassName,
        sharebarClassNames,
        closeClassNames,
        swipeClasses,
        playerSlotClassName,
        placeholderClassName
    } = videoContainerExpandedClasses(variant);

    const overlayVisible = isOverlayVisible(listVideoData, currentIndex);

    return (
        <ul
            ref={ref}
            className={containerClassName}
            style={{ scrollBehavior: 'smooth' }}
        >
            {listVideoData.map(
                ({ id, title, isBanner, node, origin, renderKey }, index) => (
                    <li
                        key={
                            renderKey ||
                            JSON.stringify([
                                isBanner ? 'banner' : 'media-instance',
                                index
                            ])
                        }
                        data-scroller-index={index}
                        data-scroller-id={id}
                        data-title={title}
                        data-origin={origin}
                        className={listItemClassName}
                    >
                        <div
                            className={videoSocialContainerClassName}
                            style={{ zIndex: OVERLAY_Z_INDEX }}
                        >
                            <Button
                                title="Cerrar"
                                onClick={onCloseMediaScrollerExpanded}
                                className={closeClassNames}
                                variant="custom"
                                size="inherit"
                                iconOnly
                            >
                                <Icon size={24}>
                                    <IconSprite name="arrowLeft" />
                                </Icon>
                                <span className="text-16">Volver</span>
                            </Button>
                            {!isBanner && (
                                <ShareV2
                                    videoId={id}
                                    videoTitle={title}
                                    className={sharebarClassNames}
                                    {...(variant === 'horizontal' && {
                                        isHorizontal: true
                                    })}
                                />
                            )}
                        </div>
                        <div className={videoContainerClassName}>
                            {isBanner ? (
                                node
                            ) : (
                                <div className={placeholderClassName} />
                            )}
                        </div>
                        {showLegendSwipeUp && (
                            <div
                                className={swipeClasses}
                                style={{
                                    animation: 'float-up 1.5s infinite',
                                    zIndex: OVERLAY_Z_INDEX
                                }}
                            >
                                <Icon
                                    size={20}
                                    className="rotate-180 text-white"
                                >
                                    <IconSprite name="arrowDown" />
                                </Icon>
                                <Text className="font-bold text-white text-wrap">
                                    Desliza hacia arriba para continuar
                                </Text>
                            </div>
                        )}
                    </li>
                )
            )}
            {variant !== 'horizontal' && (
                <li
                    role="presentation"
                    ref={playerSlotRef}
                    className={`${playerSlotClassName}${overlayVisible ? '' : ' none'}`}
                />
            )}
        </ul>
    );
}

export default JwVideoContainer;
