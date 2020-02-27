const getAssetsPath = contextPath => deployment => assets => {
    const path = `${contextPath}/resources/dist/images`;
    return `${deployment(`${path}/${assets}`)}`;
};

export default getAssetsPath;
