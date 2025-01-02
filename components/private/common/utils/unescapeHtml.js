const htmlEntities = {
    nbsp: ' ',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'"
};

const unescapeHtml = (str = '') =>
    str.replace(/&([^;]+);/g, (entity, entityCode) => {
        let match;
        if (entityCode in htmlEntities) {
            return htmlEntities[entityCode];
        }
        // eslint-disable-next-line
        if ((match = entityCode.match(/^#(\d+)$/))) {
            // eslint-disable-next-line
            return String.fromCharCode(~~match[1]);
        }
        return entity;
    });

export default unescapeHtml;
