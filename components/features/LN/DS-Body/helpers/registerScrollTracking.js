import { registerScrollTrigger } from '../../../LN-common/hooks/useScrollDispatcher';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const registerScrollTracking = () => {
    registerScrollTrigger({
        id: 'scroll-body-GA',
        type: 'percentage',
        threshold: 25,
        thresholdStep: 25,
        callback: percent => {
            addEventToDataLayerV2({
                event: 'scroll_tracking_nota',
                contentType: 'nota',
                rest: {
                    scroll_percent: percent
                }
            });
        }
    });
};

export default registerScrollTracking;
