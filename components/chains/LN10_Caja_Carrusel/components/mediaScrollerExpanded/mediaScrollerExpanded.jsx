import React, { useEffect, useRef } from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { useWindowSize } from '@ln/hooks';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import { registeredIdsSet } from '../helpers';
import JwVideoContainer from './jwVideoContainer';
import {
    useHandleBack,
    useHandleNext,
    useObserverItems,
    useScrollTo,
    useUpdateVideoWidth
} from '../hooks';

function MediaScrollerExpanded() {
    const { currentIndex, setCurrentIndex, videosData } =
        useCajaCarruselContext();

    const containerRef = useRef(null);

    useObserverItems({
        containerRef,
        setCurrentIndex,
        currentIndex
    });

    const { width: viewportWidth } = useWindowSize();
    const isMobile = viewportWidth < 768;
    const showNext = currentIndex < videosData.length - 1 && !isMobile;
    const showBack = currentIndex > 0 && !isMobile;

    const handleNextCallback = useHandleNext({
        containerRef,
        showNext
    });
    const handleBackCallback = useHandleBack({
        containerRef,
        showBack
    });

    useUpdateVideoWidth({
        containerRef,
        isMobile
    });

    useScrollTo({ containerRef, isMobile, currentIndex });

    useEffect(
        () => () => {
            registeredIdsSet.clear();
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
                    <Icon size={24}>
                        <IconSprite name="arrowLeft" />
                    </Icon>
                </Button>
            )}
            <JwVideoContainer ref={containerRef} />
            {showNext && (
                <Button
                    title="Avanzar"
                    onClick={handleNextCallback}
                    className="bg-white absolute top-50 z-1 arrow-right_md"
                    variant="custom"
                    style={{ transition: 'none' }}
                    iconOnly
                >
                    <Icon size={24}>
                        <IconSprite name="arrowRight" />
                    </Icon>
                </Button>
            )}
        </div>
    );
}

export default MediaScrollerExpanded;
