export const checkUserRealoadAction = activeWindow => {
    const pageAccessByReload = activeWindow.performance
        .getEntriesByType('navigation')
        .map(nav => nav.type)
        .includes('reload');

    return pageAccessByReload;
};

export const crtViewTracker = (tracked, trackSetter) => {
    const { dataLayer } = window;
    const isReloaded = checkUserRealoadAction(window);
    if (!isReloaded && tracked) {
        trackSetter(false);
        dataLayer.push({
            event: 'impressionNota',
            ctr_brand: 'stickyMobile_diag1',
            ctr_position: '101101'
        });
    }
};

export const handleClickForCTRcomponent = action => {
    const { dataLayer } = window;
    const isReloaded = checkUserRealoadAction(window);
    return !isReloaded ? userActions[action](dataLayer) : true;
};

const userActions = {
    close: dataLayer => {
        return dataLayer.push({
            event: 'productClickNota',
            ctr_brand: 'stickyMobile_close',
            ctr_position: '101101'
        });
    },
    open: dataLayer => {
        return dataLayer.push({
            event: 'productClickNota',
            ctr_brand: 'stickyMobile_diag1',
            ctr_position: '101101'
        });
    }
};
