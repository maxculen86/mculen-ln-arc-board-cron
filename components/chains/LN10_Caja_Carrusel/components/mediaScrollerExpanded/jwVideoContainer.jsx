import React, { forwardRef, useEffect, useState, memo } from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import JwVideoPlayer from './jwVideoPlayer';
import ShareV2 from '../../../../features/LN-common/shareV2/default';
import { isScriptLoaded } from '../helpers';
import loadJWPlayerScript from '../../../utils/loadJWPlayerScript';
import { videoContainerExpandedClasses } from './styles';

const JwVideoContainer = forwardRef(
    ({ handleNextCallback, isLastVideo, listVideoData = [], variant }, ref) => {
        const { onCloseMediaScrollerExpanded, videoMetadata } =
            useCajaCarruselContext();

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

        const {
            containerClassName,
            listItemClassName,
            videoContainerClassName,
            videoSocialContainerClassName,
            sharebarClassNames,
            closeClassNames,
            swipeClasses
        } = videoContainerExpandedClasses(variant);

        return (
            <ul
                ref={ref}
                className={containerClassName}
                style={{ willChange: 'transform, scroll-position' }}
            >
                {listVideoData.map(
                    (
                        {
                            id,
                            title,
                            isBanner,
                            node,
                            counterVideo,
                            origin,
                            roofData
                        },
                        index
                    ) => (
                        <li
                            key={id}
                            data-scroller-index={index}
                            data-scroller-id={id}
                            data-title={title}
                            data-origin={origin}
                            className={listItemClassName}
                        >
                            <div className={videoSocialContainerClassName}>
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
                                    <JwVideoPlayer
                                        videoId={id}
                                        title={title}
                                        index={index}
                                        counterVideo={counterVideo}
                                        handleNextCallback={handleNextCallback}
                                        isLoadedScriptJw={isLoadedScriptJw}
                                        origin={origin}
                                        variant={variant}
                                        roofData={roofData}
                                        duration={videoMetadata?.[id]?.duration}
                                        titleJwPlayer={
                                            videoMetadata?.[id]?.titleJwPlayer
                                        }
                                    />
                                )}
                            </div>
                            {showLeyendSwipeUp && (
                                <div
                                    className={swipeClasses}
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
                                    <Text className="font-bold text-white text-wrap">
                                        Desliza hacia arriba para continuar
                                    </Text>
                                </div>
                            )}
                        </li>
                    )
                )}
            </ul>
        );
    }
);

export default memo(JwVideoContainer);
