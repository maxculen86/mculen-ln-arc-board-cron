const transform = (data, siteProps) => {
    const respData = data;
    try {
        return respData;
    } catch (error) {
        // eslint-disable-next-line no-console
        let dataStr = '';
        if (typeof respData === 'object' || Array.isArray(respData)) {
            dataStr = JSON.stringify(data);
        }
        console.warn(
            `Error Transform - content/pageSource : ${dataStr} - siteprops: ${JSON.stringify(
                siteProps
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
