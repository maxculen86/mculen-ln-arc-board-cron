import React, { useEffect, useRef, memo } from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { useWindowSize } from '@ln/hooks';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import { registeredIdsSetAndInteractions, isScriptLoaded } from '../helpers';
import JwVideoContainer from './jwVideoContainer';
import {
    useHandleBack,
    useHandleNext,
    useObserverItems,
    useScrollTo,
    useUpdateVideoWidth
} from '../hooks';

import loadJWPlayerScript from '../../../utils/loadJWPlayerScript';

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
    const playerId = 'OSRCuuxn';

    const handleNextCallback = useHandleNext({
        containerRef,
        showNext,
        isMobile
    });
    const handleBackCallback = useHandleBack({
        containerRef,
        showBack
    });

    useUpdateVideoWidth({
        containerRef,
        viewportWidth,
        isMobile
    });

    useScrollTo({ containerRef, isMobile, currentIndex });

    useEffect(() => {
        if (!isScriptLoaded(playerId)) {
            loadJWPlayerScript(playerId);
        }
    }, []);

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
                isLastVideo={currentIndex < videosData.length - 1}
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

export default memo(MediaScrollerExpanded);
