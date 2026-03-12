import { useEffect } from 'react';
import { loadViafoura } from '../helper';
import { VIDEO_COMENTARIOS } from '../../../../private/common/utils/subtypes/subtypeHelper';

export default function useLoadViafouraComments({
    outputType,
    getCookie,
    subscription,
    setIsReady,
    setMessage,
    showComponent,
    shouldLoad,
    termicaLivefyre,
    containerRef,
    subtype,
    articleId
} = {}) {
    useEffect(() => {
        const runLoadViafoura = () =>
            loadViafoura({
                outputType,
                getCookie,
                subscription,
                setIsReady,
                setMessage,
                articleId
            });

        if (!showComponent) {
            return () => {};
        }

        if (subtype === VIDEO_COMENTARIOS) {
            runLoadViafoura();
            return () => {};
        }

        const observer = new IntersectionObserver(
            entries => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    runLoadViafoura();
                    observer.disconnect();
                }
            },
            { rootMargin: '500px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [shouldLoad, termicaLivefyre]);
}
