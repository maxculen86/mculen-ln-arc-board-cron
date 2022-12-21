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
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - sources/utils/servicesSource/pages/transform : siteprops: ${JSON.stringify(
                siteProps
            )} - errorMsj:${error.message} - data: ${dataStr}`
        );
        throw new Error(error);
    }
};

export default transform;
