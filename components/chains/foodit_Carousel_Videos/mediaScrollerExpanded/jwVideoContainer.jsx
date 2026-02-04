import React, {
    forwardRef,
    useCallback,
    useEffect,
    useState,
    memo
} from 'react';

import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { cx } from '@ln/cva';
import { Button } from '@ln/foodit-ui-button';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import { isScriptLoaded } from '../../LN10_Caja_Carrusel/components/helpers';
import loadJWPlayerScript from '../../utils/loadJWPlayerScript';
import JwVideoPlayer from './jwVideoPlayer';

function VideoItemComponent({
    id,
    title,
    displayTitle,
    index,
    totalVideos,
    isLoadedScriptJw,
    handleNextCallback,
    handleClose,
    showLegendSwipeUp
}) {
    const { currentIndex } = useCajaCarruselContext();
    const isActive = currentIndex === index;

    return (
        <li
            data-scroller-index={index}
            className="scroll-snap-align-start scroll-snap-stop-always scroll-snap-align-center_md ratio-9-16 h-100dvh w-100 w-fit_md js-center flex"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${totalVideos}${title ? `: ${title}` : ''}`}
            aria-current={isActive ? 'true' : undefined}
        >
            <div className="flex h-100 w-100 ratio-9-16 relative py-16_md">
                <div className="w-100 absolute top-0 left-0 z-10 bg-gradient-video-expanded bg-none_md py-8 mt-16_md">
                    <Button
                        title="Cerrar"
                        className="py-8 px-16 text-neutral-light-1 relative_md left--104_md"
                        variant="custom"
                        size="inherit"
                        iconOnly
                        onClick={handleClose}
                        aria-label="Cerrar carrusel de videos y volver a la página anterior"
                    >
                        <Icon size={16}>
                            <IconSprite name="arrow-left" />
                        </Icon>
                        <span
                            style={{ fontSize: '14px' }}
                            className="uppercase"
                        >
                            Volver
                        </span>
                    </Button>
                </div>
                <JwVideoPlayer
                    videoId={id}
                    title={title}
                    displayTitle={displayTitle}
                    index={index}
                    isLoadedScriptJw={isLoadedScriptJw}
                    handleNextCallback={handleNextCallback}
                />
                {showLegendSwipeUp && (
                    <div
                        className="text-neutral-light-1 flex flex-column ai-center w-100 absolute bottom-60 py-8 sm-only"
                        style={{ animation: 'float-up 1.5s infinite' }}
                    >
                        <Icon
                            size={20}
                            className="rotate-180"
                            aria-hidden="true"
                        >
                            <IconSprite name="arrow-down" />
                        </Icon>
                        <Text className="roboto roboto-bold">
                            Desliza hacia arriba para continuar
                        </Text>
                    </div>
                )}
            </div>
        </li>
    );
}

const VideoItem = memo(VideoItemComponent);

export const JwVideoContainer = forwardRef(
    ({ listVideoData, handleNextCallback }, ref) => {
        const [showLegendSwipeUp, setShowLegendSwipeUp] = useState(true);
        const [isLoadedScriptJw, setIsLoadedScriptJw] = useState(false);
        const { onCloseMediaScrollerExpanded } = useCajaCarruselContext();
        const handleClose = useCallback(() => {
            onCloseMediaScrollerExpanded();
        }, [onCloseMediaScrollerExpanded]);

        const playerId = 'OSRCuuxn';

        useEffect(() => {
            let isMounted = true;
            const isLoadedScript = isScriptLoaded(playerId);

            if (!isLoadedScript) {
                loadJWPlayerScript(playerId, () => {
                    if (isMounted) {
                        setIsLoadedScriptJw(true);
                    }
                });
            }

            if (isLoadedScript) {
                setIsLoadedScriptJw(true);
            }

            return () => {
                isMounted = false;
            };
        }, []);

        useEffect(() => {
            const timer = setTimeout(() => {
                setShowLegendSwipeUp(false);
            }, 5000);

            return () => clearTimeout(timer);
        }, []);

        const _className = cx(
            'scroll-y-auto scroll-y-none_md scroll-x-auto_md hide-scrollbar bg-black',
            'scroll-snap-block-mandatory overscroll-bahavior-y-container scroll-snap-inline-mandatory_md',
            'w-100vw w-100_md h-100dvh grid_md grid-auto-flow-columm grid-auto-columns-100'
        );

        return (
            <ul
                ref={ref}
                className={_className}
                style={{ willChange: 'transform, scroll-position' }}
                role="region"
                aria-label="Carrusel de videos"
                aria-roledescription="carrusel"
            >
                {listVideoData.map(({ id, title, displayTitle }, index) => (
                    <VideoItem
                        key={id}
                        id={id}
                        title={title}
                        displayTitle={displayTitle}
                        index={index}
                        totalVideos={listVideoData.length}
                        isLoadedScriptJw={isLoadedScriptJw}
                        handleNextCallback={handleNextCallback}
                        handleClose={handleClose}
                        showLegendSwipeUp={showLegendSwipeUp}
                    />
                ))}
            </ul>
        );
    }
);
