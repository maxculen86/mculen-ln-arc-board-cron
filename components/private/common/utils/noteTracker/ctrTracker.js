import { scheduleTask } from '../scheduleTask';

const position = '101101';
const eventClick = 'productClickNota';
const ctrBrand = 'stickyMobile_diag1';

export const checkUserRealoadAction = activeWindow => {
    return activeWindow.performance
        .getEntriesByType('navigation')
        .map(nav => nav.type)
        .includes('reload');
};

export const crtViewTracker = (tracked, trackSetter) => {
    const { dataLayer } = window;
    const isReloaded = checkUserRealoadAction(window);
    if (!isReloaded && tracked) {
        trackSetter(false);
        scheduleTask(() =>
            dataLayer.push({
                event: 'impressionNota',
                ctr_brand: ctrBrand,
                ctr_position: position
            })
        );
    }
};

export const handleClickForCTRcomponent = action => {
    const { dataLayer } = window;
    const isReloaded = checkUserRealoadAction(window);
    return !isReloaded ? userActions[action](dataLayer) : true;
};

const userActions = {
    close: dataLayer => {
        return scheduleTask(() =>
            dataLayer.push({
                event: eventClick,
                ctr_brand: 'stickyMobile_close',
                ctr_position: position
            })
        );
    },
    open: dataLayer => {
        return scheduleTask(() =>
            dataLayer.push({
                event: eventClick,
                ctr_brand: ctrBrand,
                ctr_position: position
            })
        );
    }
};
