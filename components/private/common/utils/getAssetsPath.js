import { SITE_LANACION } from 'fusion:environment';

const getAssetsPath = contextPath => deployment => assets => {
    const path = `${contextPath}/resources/images`;
    return `${SITE_LANACION}${deployment(`${path}/${assets}`)}`;
};

export default getAssetsPath;
