import { useEffect } from 'react';
import { isMobileWebView } from '../utils/isMobileWebView';
import { pushFooditEvent } from '../utils/pushFooditEvent';

export const useWebviewPageView = (params = {}) => {
    useEffect(() => {
        if (!isMobileWebView()) return;
        pushFooditEvent({ event: 'page_view', ...params });
    }, []);
};
