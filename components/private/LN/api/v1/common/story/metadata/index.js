import get from '../../../../../../common/utils/get';

const metadataIndex = dataArticle => {
    const resp = {};
    const metadata = get(dataArticle, 'label', null);
    if (!metadata) {
        return null;
    }
    Object.entries(metadata).forEach(([key, value]) => {
        if (key === 'eje_subeje') {
            resp[key] = get(value, 'text', null);
        }
    });
    if (Object.keys(resp).length === 0) {
        return null;
    }
    return resp;
};

export default metadataIndex;
