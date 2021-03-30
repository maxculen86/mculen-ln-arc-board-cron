const htmlEntities = {
    nbsp: ' ',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
};

const unescapeHtml = str => {
    return str.replace(/\&([^;]+);/g, function(entity, entityCode) {
        let match;
        if (entityCode in htmlEntities) {
            return htmlEntities[entityCode];
        }
        if ((match = entityCode.match(/^#(\d+)$/))) {
            return String.fromCharCode(~~match[1]);
        }
        return entity;
    });
};

export default unescapeHtml;
