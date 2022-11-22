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
    alert(isReloaded);
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
    alert(isReloaded);
    return article ? userActions[action](article, dataLayer, isRealoaed) : true;
};

const userActions = {
    close: (article, dataLayer, isRealoaed) => {
        return (
            !isRealoaed &&
            dataLayer.push({
                event: 'CTR close',
                brand: 'stickyMobile_diag1',
                element: article
            })
        );
    },
    open: (article, dataLayer, isRealoaed) => {
        return (
            !isRealoaed &&
            dataLayer.push({
                event: 'CTR open note',
                brand: 'stickyMobile_diag1',
                element: article
            })
        );
    }
};
