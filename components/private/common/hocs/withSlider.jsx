import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';

function withSlider(WrappedComponent, pageSizeParam) {
    return Consumer(props => {
        const DEFAULT_SLIDE_COUNT = 1;
        // TODO: corregir para devolver algo desde server
        if (typeof window !== 'object') return null;

        const windowBetweenRanges = (lowerRange, topRange) => {
            const { innerWidth } = window;
            if (!lowerRange && !topRange) return true;
            if (!lowerRange) return innerWidth <= topRange;
            if (!topRange) return innerWidth >= lowerRange;
            return innerWidth >= lowerRange && innerWidth <= topRange;
        };

        // Levanto config de paginacion
        const siteVars = getProperties(props.arcSite);
        const { sliderConfig } = siteVars;

        const configPageSize =
            sliderConfig &&
            sliderConfig.find(v =>
                windowBetweenRanges(v.lowerRange, v.topRange)
            );

        // Defino estados
        const [pageSize, setPageSize] = useState(
            configPageSize ? configPageSize.pageSize : pageSizeParam
        );
        const [currentStartIndex, setCurrentStartIndex] = useState(0);
        const [hasNextPage, setHasNextPage] = useState(
            props.children.length > pageSize
        );
        const [hasPrevPage, setHasPrevPage] = useState(false);

        const totalCount = props.children.length;

        // Defino funciones auxiliares
        const getHasNextPage = nextCurrentIndex => {
            return totalCount > nextCurrentIndex + pageSize;
        };

        const getHasPrevPage = nextCurrentIndex => {
            return nextCurrentIndex > 0;
        };

        const nextButtonHandler = () => {
            const newPage = currentStartIndex + DEFAULT_SLIDE_COUNT;
            setCurrentStartIndex(newPage);
            setHasNextPage(getHasNextPage(newPage));
            setHasPrevPage(true);
        };

        const prevButtonHandler = () => {
            const newPage = currentStartIndex - DEFAULT_SLIDE_COUNT;
            setCurrentStartIndex(newPage);
            setHasPrevPage(getHasPrevPage(newPage));
            setHasNextPage(
                currentStartIndex - DEFAULT_SLIDE_COUNT + pageSize < totalCount
            );
        };

        // Escucho eventos de resize
        useEffect(() => {
            const updatePageSize = () => {
                if (sliderConfig) {
                    // for (let index = 0; index < sliderConfig.length; index++) {
                    const elem = sliderConfig.find(e => {
                        return windowBetweenRanges(e.lowerRange, e.topRange);
                    });
                    if (elem) {
                        if (elem.pageSize !== pageSize) {
                            setPageSize(elem.pageSize);
                            setHasNextPage(
                                currentStartIndex + elem.pageSize < totalCount
                            );
                        }
                        // break;
                    }
                }
            };

            updatePageSize();
            window.addEventListener('resize', updatePageSize);

            return () => {
                window.removeEventListener('resize', updatePageSize);
            };
        }, [pageSize, currentStartIndex, totalCount, sliderConfig]);

        const slider = {
            nextButtonHandler,
            prevButtonHandler,
            hasNextPage: () => hasNextPage,
            hasPrevPage: () => hasPrevPage
        };
        return (
            <WrappedComponent slider={slider} {...props}>
                {props.children.slice(
                    currentStartIndex,
                    currentStartIndex + pageSize
                )}
            </WrappedComponent>
        );
    });
}

export default withSlider;
