import { useEffect } from 'react';
import useLazyEmbeds from '../../../LN-common/hooks/useLazyEmbeds';
import useScrollDispatcher from '../../../LN-common/hooks/useScrollDispatcher';

function BaseBodyWrapper({
    children,
    contentElements = [],
    outputType = 'default',
    noteId = '',
    selector = 'cuerpo__nota',
    bodyOrigin = 'Body default',
    scrollStartSelector = 'h1',
    scrollEndSelector = '#fin-de-nota',
    onRegisterScrollTrigger = () => {}
}) {
    useLazyEmbeds({
        contentElements,
        outputType,
        bodyOrigin,
        noteId,
        selector
    });

    useScrollDispatcher({
        startSelector: scrollStartSelector,
        endSelector: scrollEndSelector
    });

    useEffect(() => {
        onRegisterScrollTrigger();
    }, []);

    return children;
}

export default BaseBodyWrapper;
