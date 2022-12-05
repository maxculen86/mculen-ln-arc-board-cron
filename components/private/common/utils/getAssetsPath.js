import { ARC_STATIC } from 'fusion:environment';

const getAssetsPath = contextPath => deployment => assets => {
    const path = `${contextPath}/resources/images/${assets}`;
    return `${ARC_STATIC}${deployment(path)}`;
};

export default getAssetsPath;
