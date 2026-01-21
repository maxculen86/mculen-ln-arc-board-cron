import { registerScrollTrigger } from '../../../LN-common/hooks/useScrollDispatcher';

const registerScrollTracking = () => {
    registerScrollTrigger({
        id: 'scroll-body-GA',
        type: 'percentage',
        threshold: 10,
        thresholdStep: 10,
        callback: percent => {
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'scroll_tracking_nota',
                    scroll_percent: percent,
                    content_type: 'nota'
                });
            }
        }
    });
};

export default registerScrollTracking;
