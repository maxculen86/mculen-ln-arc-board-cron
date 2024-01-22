export const getIconPath = ({
    deployment,
    contextPath,
    critical,
    arcSite
} = {}) => {
    if (!contextPath || !deployment) return '';

    const fileName = `${arcSite}-sprite-${
        critical ? 'critical' : 'default'
    }.svg`;
    const path = `${contextPath}/resources/images/${fileName}`;
    const deploymentPath = deployment(path);

    return deploymentPath;
};
