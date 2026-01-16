import React, { useRef, useEffect } from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { useWindowSize } from '@ln/hooks';
import {
    useHandleBack,
    useHandleNext,
    useObserverItems,
    useScrollTo,
    useUpdateVideoWidth
} from '../hooks';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import { JwVideoContainer } from './jwVideoContainer';
import { useCajaCarruselContext } from '../cajaCarruselContext';

export function MediaScrollerExpanded({ listVideoData = [] }) {
    const { currentIndex, setCurrentIndex } = useCajaCarruselContext();
    const containerRef = useRef(null);
    const carouselWrapperRef = useRef(null);

    const { width: viewportWidth } = useWindowSize();
    const isMobile = viewportWidth < 768;
    const showNext = currentIndex < listVideoData.length - 1 && !isMobile;
    const showBack = currentIndex > 0 && !isMobile;

    useEffect(() => {
        if (!carouselWrapperRef.current) {
            return undefined;
        }

        const timer = setTimeout(() => {
            carouselWrapperRef.current?.focus({ preventScroll: true });
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useObserverItems({
        containerRef,
        setCurrentIndex
    });

    const handleNextCallback = useHandleNext({
        containerRef,
        showNext,
        isMobile,
        currentIndex
    });

    const handleBackCallback = useHandleBack({
        containerRef,
        showBack,
        isMobile,
        currentIndex
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

    useEffect(() => {
        const handleKeyDown = event => {
            if (!carouselWrapperRef.current?.contains(document.activeElement)) {
                return;
            }

            switch (event.key) {
                case 'ArrowLeft':
                    if (currentIndex > 0) {
                        event.preventDefault();
                        handleBackCallback();
                    }
                    break;
                case 'ArrowRight':
                    if (currentIndex < listVideoData.length - 1) {
                        event.preventDefault();
                        handleNextCallback();
                    }
                    break;
                case 'ArrowUp':
                    if (currentIndex > 0 && isMobile) {
                        event.preventDefault();
                        handleBackCallback();
                    }
                    break;
                case 'ArrowDown':
                    if (currentIndex < listVideoData.length - 1 && isMobile) {
                        event.preventDefault();
                        handleNextCallback();
                    }
                    break;
                case 'Home':
                    event.preventDefault();
                    if (isMobile) {
                        containerRef.current?.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } else {
                        containerRef.current?.scrollTo({
                            left: 0,
                            behavior: 'smooth'
                        });
                    }
                    break;
                case 'End':
                    event.preventDefault();
                    if (isMobile) {
                        containerRef.current?.scrollTo({
                            top: containerRef.current.scrollHeight,
                            behavior: 'smooth'
                        });
                    } else {
                        containerRef.current?.scrollTo({
                            left: containerRef.current.scrollWidth,
                            behavior: 'smooth'
                        });
                    }
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [
        currentIndex,
        listVideoData.length,
        isMobile,
        handleBackCallback,
        handleNextCallback,
        containerRef
    ]);

    return (
        <div
            ref={carouselWrapperRef}
            className="flex jc-center ai-center w-100_md"
            tabIndex={-1}
        >
            {showBack && (
                <Button
                    title="Regresar"
                    onClick={handleBackCallback}
                    className="bg-white absolute top-50 z-1 arrow-left_md"
                    variant="custom"
                    style={{ transition: 'none' }}
                    iconOnly
                    aria-label="Botón para regresar al video anterior"
                >
                    <Icon size={16} color="dark">
                        <IconSprite name="arrow-left" />
                    </Icon>
                </Button>
            )}
            <JwVideoContainer
                ref={containerRef}
                listVideoData={listVideoData}
                handleNextCallback={handleNextCallback}
            />
            {showNext && (
                <Button
                    title="Avanzar"
                    onClick={handleNextCallback}
                    className="bg-white absolute top-50 z-1 arrow-right_md sm-none"
                    variant="custom"
                    style={{ transition: 'none' }}
                    iconOnly
                    aria-label="Botón para avanzar al siguiente video"
                >
                    <Icon size={16} color="dark">
                        <IconSprite name="arrow-right" />
                    </Icon>
                </Button>
            )}
        </div>
    );
}
