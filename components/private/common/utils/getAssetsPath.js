import { ARC_STATIC } from 'fusion:environment';

const getAssetsPath = contextPath => deployment => assets => {
    const path = `${contextPath}/resources/images`;
    return `${ARC_STATIC}${deployment(`${path}/${assets}`)}`;
};

export default getAssetsPath;
