export const checkUserRealoadAction = activeWindow => {
    const pageAccessedByReload = activeWindow.performance
        .getEntriesByType('navigation')
        .map(nav => nav.type)
        .includes('reload');

    return pageAccessedByReload;
};

export const crtViewTracker = (article = {}) => {
    const { _id: id } = article;

    const { dataLayer } = window;
    const isRealoaed = checkUserRealoadAction(window);
    console.log(
        '🚀 ~ file: ctrTracker.js ~ line 15 ~ crtViewTracker ~ isRealoaed',
        isRealoaed
    );

    const shouldNotSend = dataLayer.some((element = {}) => {
        const { id: elementId = '' } = element;

        return elementId === id;
    });

    if (!shouldNotSend && article) {
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

    return article ? userActions[action](article, dataLayer) : true;
};

const userActions = {
    close: (article, dataLayer) => {
        return dataLayer.push({
            event: 'CTR close',
            brand: 'stickyMobile_diag1',
            element: article
        });
    },
    open: (article, dataLayer) => {
        return dataLayer.push({
            event: 'CTR open note',
            brand: 'stickyMobile_diag1',
            element: article
        });
    }
};
