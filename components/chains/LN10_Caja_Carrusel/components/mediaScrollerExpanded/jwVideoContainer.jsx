import React, { forwardRef, useEffect, useState, memo } from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { cx } from '@ln/cva';
import { Text } from '@ln/contenidos-ui-text';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import JwVideoPlayer from './jwVideoPlayer';
import ShareV2 from '../../../../features/LN-common/shareV2/default';
import { isScriptLoaded } from '../helpers';
import loadJWPlayerScript from '../../../utils/loadJWPlayerScript';

const JwVideoContainer = forwardRef(
    ({ handleNextCallback, isLastVideo, listVideoData = [] }, ref) => {
        const { onCloseMediaScrollerExpanded } = useCajaCarruselContext();

        const [showLeyendSwipeUp, setShowLeyendSwipeUp] = useState(isLastVideo);

        const [isLoadedScriptJw, setIsLoadedScriptJw] = useState(false);

        const playerId = 'OSRCuuxn';
        useEffect(() => {
            const isLoadedScript = isScriptLoaded(playerId);

            if (!isLoadedScript) {
                loadJWPlayerScript(playerId, () => {
                    setIsLoadedScriptJw(true);
                });
            }

            if (isLoadedScript) {
                setIsLoadedScriptJw(true);
            }
        }, []);
        useEffect(() => {
            let timer;
            if (showLeyendSwipeUp) {
                timer = setTimeout(() => {
                    setShowLeyendSwipeUp(false);
                }, 5000);
            }

            return () => {
                if (timer) clearTimeout(timer);
            };
        }, []);

        if (!listVideoData.length) return null;

        const _className = cx(
            'scroll-y-auto scroll-y-none_md scroll-x-auto_md hide-scrollbar',
            'scroll-snap-block-mandatory overscroll-bahavior-y-container scroll-snap-inline-mandatory_md',
            'w-100vw w-100_md h-100dvh_max767 grid_md grid-auto-flow-columm grid-auto-columns-100'
        );

        return (
            <ul
                ref={ref}
                className={_className}
                style={{ willChange: 'transform, scroll-position' }}
            >
                {listVideoData.map(
                    (
                        { id, title, isBanner, node, counterVideo, origin },
                        index
                    ) => (
                        <li
                            key={id}
                            data-scroller-index={index}
                            data-scroller-id={id}
                            data-title={title}
                            data-origin={origin}
                            className="scroll-snap-align-start scroll-snap-stop-always scroll-snap-align-center_md ratio-9-16 h-100dvh w-100 w-fit_md js-center flex"
                        >
                            <div className="flex h-100 w-100 ratio-9-16 relative py-16_m">
                                <div className="w-100 absolute top-0 left-0 z-10 bg-gradient-dark bg-none_lg py-8 mt-16_m">
                                    <Button
                                        title="Cerrar"
                                        onClick={onCloseMediaScrollerExpanded}
                                        className="py-8 px-16 text-white relative_lg left--130_lg"
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
                                            className="absolute top-0 right-0 right--55_lg"
                                        />
                                    )}
                                </div>
                                {isBanner ? (
                                    node
                                ) : (
                                    <JwVideoPlayer
                                        videoId={id}
                                        title={title}
                                        index={index}
                                        counterVideo={counterVideo}
                                        handleNextCallback={handleNextCallback}
                                        isLoadedScriptJw={isLoadedScriptJw}
                                        origin={origin}
                                    />
                                )}

                                {showLeyendSwipeUp && (
                                    <div
                                        className="flex flex-column ai-center w-100 absolute bottom-60 py-8 sm-only"
                                        style={{
                                            animation: 'float-up 1.5s infinite'
                                        }}
                                    >
                                        <Icon
                                            size={20}
                                            className="rotate-180 text-white"
                                        >
                                            <IconSprite name="arrowDown" />
                                        </Icon>
                                        <Text className="font-bold text-white">
                                            Desliza hacia arriba para continuar
                                        </Text>
                                    </div>
                                )}
                            </div>
                        </li>
                    )
                )}
            </ul>
        );
    }
);

export default memo(JwVideoContainer);
