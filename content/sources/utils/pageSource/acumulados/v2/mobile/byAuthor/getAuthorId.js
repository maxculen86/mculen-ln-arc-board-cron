function getId(displayId, pattern) {
    const regex = new RegExp(pattern).exec(displayId);
    if (regex && regex[1]) {
        return parseInt(regex[1]);
    }
    return displayId;
}

export function getAuthorId(displayId) {
    return getId(displayId, '^.+-([0-9]+)$');
}
