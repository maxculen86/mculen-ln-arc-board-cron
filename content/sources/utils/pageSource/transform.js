const transform = (data, siteProps) => {
    try {
        const respData = data;
        return respData;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - content/pageSource : ${JSON.stringify(
                data
            )} - siteprops: ${JSON.stringify(siteProps)} - errorMsj:${
                error.message
            }`
        );
        throw new Error(error);
    }
};

export default transform;
