import { ARC_STATIC } from 'fusion:environment';

const getAssetsPath = contextPath => deployment => assets => {
    const path = `${contextPath}/resources/images`;
    if (deployment && assets) {
        return `${ARC_STATIC}${deployment(`${path}/${assets}`)}`;
    }
    return path;
};

export default getAssetsPath;
