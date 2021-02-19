import browser from '../../../private/common/utils/browser';

const getSizesFrom = (isAdmin, sizeCf, pageCf, paramUrlId, requestUri) => {
    let size = browser.getSizesFrom(
        isAdmin,
        sizeCf,
        paramUrlId,
        'size',
        requestUri
    );
    const page = browser.getSizesFrom(
        isAdmin,
        pageCf,
        paramUrlId,
        'page',
        requestUri
    );

    if (size > 100) size = 100;

    return { size, page };
};

export default getSizesFrom;
