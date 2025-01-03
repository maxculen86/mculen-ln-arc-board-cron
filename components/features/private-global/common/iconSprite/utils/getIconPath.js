// TODO: Se debe agregar una prop "type" al componente IconSprite de contenidos.
export const getIconPath = ({
    deployment,
    contextPath,
    critical,
    color,
    arcSite
} = {}) => {
    if (!contextPath || !deployment) return '';
    const spriteType =
        (critical && 'critical') || (color && 'color') || 'default';
    const fileName = `${arcSite}-sprite-${spriteType}.svg`;
    const path = `${contextPath}/resources/images/${fileName}`;
    return deployment(path);
};
