import categoriesDictionary from '../../../../resources/dictionaries/categoriesDictionary.json';

function findCategory(categoryToFind) {
    const elem = categoriesDictionary.find(
        e => categoryToFind.toLowerCase() == e.ArcSectionId.toLowerCase()
    );
    return elem;
}

function getSecundaryCategory(caterogy) {
    const category = caterogy.substr(caterogy.lastIndexOf('/'));
    return category;
}

function getPrincipalCategory(caterogy) {
    const principalCategory = `/${
        caterogy.split('/').filter(e => {
            return e;
        })[0]
    }`;
    return principalCategory;
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

export function isMigratedCategory(caterogy, isPrincipal = false) {
    const categoryToFind = isPrincipal
        ? getPrincipalCategory(caterogy)
        : getSecundaryCategory(caterogy);
    const elem = findCategory(categoryToFind);
    if (!elem) return null;

    return elem.migrada;
}

export function getCategory(caterogy, isPrincipal = false) {
    const categoryToFind = isPrincipal
        ? getPrincipalCategory(caterogy)
        : getSecundaryCategory(caterogy);
    const elem = findCategory(categoryToFind);

    if (!elem) return null;

    return elem;
}
