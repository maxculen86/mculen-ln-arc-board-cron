function getId(displayId, pattern) {
    const regex = new RegExp(pattern).exec(displayId);
    if (regex && regex[1]) {
        return parseInt(regex[1]);
    }
    return displayId;
}

export function getTagId(displayId) {
    return getId(displayId, '^.+-tid([0-9]+)$');
}

export function getAutorId(displayId) {
    return getId(displayId, '^.+-([0-9]+)$');
}
