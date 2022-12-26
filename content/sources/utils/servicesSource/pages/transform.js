import getPageElements from '../../../../../components/private/LN/api/global/page';

const transform = async (data, query) => {
    const respData = data;
    try {
        const pageSections = getPageElements(respData);
        return pageSections;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - content/apiPageSource :  siteprops: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
