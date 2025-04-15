import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { useWindowSize } from '@ln/hooks';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import { registeredIdsSetAndInteractions } from '../helpers';
import JwVideoContainer from './jwVideoContainer';
import {
    useHandleBack,
    useHandleNext,
    useObserverItems,
    useScrollTo,
    useUpdateVideoWidth
} from '../hooks';
import useHandlerBanner from '../hooks/useHandlerBanner';

function MediaScrollerExpanded({ listVideoData = [] }) {
    const { currentIndex, setCurrentIndex } = useCajaCarruselContext();
    const containerRef = useRef(null);

    const { width: viewportWidth } = useWindowSize();
    const isMobile = viewportWidth < 768;

    const { handleBannerViewed } = useHandlerBanner({
        listVideoData,
        currentIndex,
        isMobile
    });

    const showNext = currentIndex < listVideoData.length - 1 && !isMobile;
    const showBack = currentIndex > 0 && !isMobile;

    useObserverItems({
        containerRef,
        setCurrentIndex,
        currentIndex
    });

    const handleNextCallback = useHandleNext({
        containerRef,
        showNext,
        isMobile,
        currentIndex,
        callback: () => handleBannerViewed({ currentPosition: currentIndex })
    });

    const handleBackCallback = useHandleBack({
        containerRef,
        showBack,
        currentIndex,
        callback: () =>
            handleBannerViewed({
                currentPosition: currentIndex,
                isShowBack: true
            })
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
            registeredIdsSetAndInteractions.clear();
        },
        []
    );

    return (
        <div className="flex jc-center ai-center w-100_md">
            {showBack && (
                <Button
                    title="Regresar"
                    onClick={handleBackCallback}
                    className="bg-white absolute top-50 z-1 arrow-left_md"
                    variant="custom"
                    style={{ transition: 'none' }}
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
            />
            {showNext && (
                <Button
                    title="Avanzar"
                    onClick={handleNextCallback}
                    className="bg-white absolute top-50 z-1 arrow-right_md"
                    variant="custom"
                    style={{ transition: 'none' }}
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

MediaScrollerExpanded.propTypes = {
    listVideoData: PropTypes.arrayOf().isRequired
};

export default memo(MediaScrollerExpanded);
