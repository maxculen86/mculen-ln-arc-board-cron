function getId(displayId, pattern) {
    const regex = new RegExp(pattern).exec(displayId);
    if (regex && regex[1]) {
        return parseInt(regex[1]);
    }
    return displayId;
}

function getValidateId(displayId, pattern) {
    const regex = new RegExp(pattern).exec(displayId);
    if (regex && regex[1]) {
        return parseInt(regex[1]);
    }
    return 0;
}

export function getTagId(displayId) {
    return getValidateId(displayId, '^.+-tid([0-9]+)$');
}

export function getAutorId(displayId) {
    return getId(displayId, '^.+-([0-9]+)$');
}
