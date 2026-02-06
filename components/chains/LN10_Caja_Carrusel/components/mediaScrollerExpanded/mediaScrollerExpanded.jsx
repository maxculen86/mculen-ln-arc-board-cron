import React, { useEffect, useRef, memo, useCallback } from 'react';

import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { useWindowSize } from '@ln/hooks';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import { resetTracking } from '../helpers';
import JwVideoContainer from './jwVideoContainer';
import {
    useHandleBack,
    useHandleNext,
    useObserverItems,
    useScrollTo,
    useUpdateVideoWidth
} from '../hooks';
import useHandlerBanner from '../hooks/useHandlerBanner';
import { mediaScrollerExpandedClasses, arrowsClassNames } from './styles';

function MediaScrollerExpanded({ listVideoData = [], variant = 'vertical' }) {
    const { currentIndex, setCurrentIndex } = useCajaCarruselContext();
    const containerRef = useRef(null);

    const { width: viewportWidth } = useWindowSize();
    const isMobile = viewportWidth < 768;
    const isTablet = viewportWidth < 1280;

    const { handleBannerViewed } = useHandlerBanner({
        listVideoData,
        currentIndex,
        isMobile
    });

    const showNext =
        variant === 'vertical'
            ? currentIndex < listVideoData.length - 1 && !isMobile
            : currentIndex < listVideoData.length - 1 && !isTablet;
    const showBack =
        variant === 'vertical'
            ? currentIndex > 0 && !isMobile
            : currentIndex > 0 && !isTablet;

    useObserverItems({
        containerRef,
        setCurrentIndex,
        currentIndex
    });

    const handleNextSuccess = useCallback(() => {
        handleBannerViewed({ currentPosition: currentIndex });
    }, [handleBannerViewed, currentIndex]);

    const handleNextCallback = useHandleNext({
        containerRef,
        showNext,
        isMobile,
        currentIndex,
        callback: handleNextSuccess
    });

    const handleBackSuccess = useCallback(() => {
        handleBannerViewed({
            currentPosition: currentIndex,
            isShowBack: true
        });
    }, [handleBannerViewed, currentIndex]);

    const handleBackCallback = useHandleBack({
        containerRef,
        showBack,
        callback: handleBackSuccess
    });

    useUpdateVideoWidth({
        containerRef,
        viewportWidth,
        isMobile
    });

    useScrollTo({
        containerRef,
        isMobile,
        currentIndex
    });

    useEffect(
        () => () => {
            resetTracking();
        },
        []
    );

    return (
        <div className={mediaScrollerExpandedClasses({ variant })}>
            {showBack && (
                <Button
                    title="Regresar"
                    onClick={handleBackCallback}
                    className={arrowsClassNames({ direction: 'left' })}
                    variant="custom"
                    iconOnly
                >
                    <Icon size={24} color="dark">
                        <IconSprite
                            name="arrowLeft"
                            fill="var(--neutral-light-800)"
                        />
                    </Icon>
                </Button>
            )}
            <JwVideoContainer
                ref={containerRef}
                handleNextCallback={handleNextCallback}
                isLastVideo={currentIndex < listVideoData.length - 1}
                listVideoData={listVideoData}
                variant={variant}
            />
            {showNext && (
                <Button
                    title="Avanzar"
                    onClick={handleNextCallback}
                    className={arrowsClassNames({
                        direction: 'right'
                    })}
                    variant="custom"
                    iconOnly
                >
                    <Icon size={24} color="dark">
                        <IconSprite
                            name="arrowRight"
                            fill="var(--neutral-light-800)"
                        />
                    </Icon>
                </Button>
            )}
        </div>
    );
}

export default memo(MediaScrollerExpanded);
