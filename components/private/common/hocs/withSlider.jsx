import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';

const DEFAULT_SLIDE_COUNT = 1;

// Defino funciones auxiliares
const getHasNextPage = (totalCount, nextCurrentIndex, pageSize) => {
    return totalCount > nextCurrentIndex + pageSize;
};

const getHasPrevPage = nextCurrentIndex => {
    return nextCurrentIndex > 0;
};

const windowBetweenRanges = (lowerRange, topRange) => {
    const { innerWidth } = window;
    if (!lowerRange && !topRange) return true;
    if (!lowerRange) return innerWidth <= topRange;
    if (!topRange) return innerWidth >= lowerRange;
    return innerWidth >= lowerRange && innerWidth <= topRange;
};

// HOC
function withSlider(WrappedComponent, pageSizeParam) {
    return Consumer(props => {
        // TODO: corregir para devolver algo desde server
        if (typeof window !== 'object') return null;

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

        // Funciones auxiliares para alterar state
        const nextButtonHandler = () => {
            const newPage = currentStartIndex + DEFAULT_SLIDE_COUNT;
            setCurrentStartIndex(newPage);
            setHasNextPage(getHasNextPage(totalCount, newPage, pageSize));
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
