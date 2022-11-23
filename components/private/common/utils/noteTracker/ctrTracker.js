export const checkUserRealoadAction = activeWindow => {
    const pageAccessByReload = activeWindow.performance
        .getEntriesByType('navigation')
        .map(nav => nav.type)
        .includes('reload');

    return pageAccessByReload;
};

export const crtViewTracker = (article = {}) => {
    const { _id: id } = article;

    const { dataLayer } = window;
    const isReloaded = checkUserRealoadAction(window);
    if (!isReloaded && article) {
        dataLayer.push({
            event: 'CTR view',
            brand: 'stickyMobile_diag1',
            element: article.canonical_url,
            id
        });
    }
    return true;
};

export const handleClickForCTRcomponent = (action, article) => {
    const { dataLayer } = window;
    const isReloaded = checkUserRealoadAction(window);
    return article ? userActions[action](article, dataLayer, isReloaded) : true;
};

const userActions = {
    close: (article, dataLayer, isReloaded) => {
        return (
            !isReloaded &&
            dataLayer.push({
                event: 'CTR close',
                brand: 'stickyMobile_diag1',
                element: article
            })
        );
    },
    open: (article, dataLayer, isReloaded) => {
        return (
            !isReloaded &&
            dataLayer.push({
                event: 'CTR open note',
                brand: 'stickyMobile_diag1',
                element: article
            })
        );
    }
};
