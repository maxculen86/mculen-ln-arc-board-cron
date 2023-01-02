import { useState, useEffect, useRef } from 'react';
import { useContent } from 'fusion:content';
import getScrollPercent from '../../../../private/LN/common/utils/getScrollPercent';
import { addLiftigniterEventTracking } from '../_helpers';

const useBuildMayInterest = ({
    cantidadNotas,
    userId,
    sessionId,
    excludeItems,
    arcSite,
    url,
    idArticle
}) => {
    const [isReady, setIsReady] = useState(false);
    const sectionReference = useRef();

    const articles = useContent({
        source: isReady && cantidadNotas ? 'liftigniterSource' : null,
        query: {
            cantidadNotas,
            referrer: url,
            imageConfig: 'boxArticles',
            idArticle,
            userId,
            sessionId,
            excludeItems,
            arcSite,
            action: 'model'
        }
    });

    useEffect(() => {
        if (articles && articles.length)
            addLiftigniterEventTracking(sectionReference);
    }, [articles]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercentRounded = getScrollPercent();
            if (!isReady && scrollPercentRounded > 60) {
                setIsReady(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        !isReady && window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isReady]);

    return { sectionReference, articles, isReady };
};

export default useBuildMayInterest;
