import categoriesDictionary from '../../../../resources/dictionaries/categoriesDictionary.json';

function finCategory(categoryToFind) {
    const elem = categoriesDictionary.find(
        e => categoryToFind.toLowerCase() == e.ArcSectionId.toLowerCase()
    );
    return elem;
}

function getId(displayId, pattern) {
    const regex = new RegExp(pattern).exec(displayId);
    if (regex && regex[1]) {
        return parseInt(regex[1]);
    } else {
        return displayId;
    }
}

export function getTagId(displayId) {
    return getId(displayId, '^.+-tid([0-9]+)$');
}

export function getAutorId(displayId) {
    return getId(displayId, '^.+-([0-9]+)$');
}

export function isMigratedCategory(caterogy) {
    const categoryToFind = `/${
        caterogy.split('/').filter(e => {
            return e;
        })[0]
    }`;
    const elem = finCategory(categoryToFind);
    if (!elem) return null;

    return elem.migrada;
}

export function getCategoryId(caterogy) {
    const categoryToFind = caterogy.substr(caterogy.lastIndexOf('/'));
    const elem = finCategory(categoryToFind);

    if (!elem) return null;

    return elem;
}
