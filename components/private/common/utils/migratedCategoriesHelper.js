import categoriesDictionary from '../../../../resources/dictionaries/categoriesDictionary.json';

function findCategory(categoryToFind) {
    const elem = categoriesDictionary.find(
        e => categoryToFind.toLowerCase() === e.ArcSectionId.toLowerCase()
    );
    return elem;
}

function getSecundaryCategory(caterogy) {
    const category = caterogy.substr(caterogy.lastIndexOf('/'));
    return category;
}

function getPrincipalCategory(category) {
    const principalCategory = `/${
        category.split('/').filter(e => {
            return e;
        })[0]
    }`;
    return principalCategory;
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
