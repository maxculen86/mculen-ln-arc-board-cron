import { LANACIONAR_URLASSETS } from 'fusion:environment';

const getAssetsPath = contextPath => deployment => assets => {
    const path = `${contextPath}/resources/dist/images`;
    return `${LANACIONAR_URLASSETS}${deployment(`${path}/${assets}`)}`;
};

export default getAssetsPath;
