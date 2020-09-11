import { DICTIONARY } from 'fusion:environment';

const categoriesDictionary = DICTIONARY.categories;

function findCategory(categoryToFind) {
    if (!categoryToFind) return null;

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
    if (!category) return null;

    const principalCategory = `/${
        category.split('/').filter(e => {
            return e;
        })[0]
    }`;
    return principalCategory;
}

const isMigratedCategory = (caterogy, isPrincipal = false) => {
    const categoryToFind = isPrincipal
        ? getPrincipalCategory(caterogy)
        : getSecundaryCategory(caterogy);
    const elem = findCategory(categoryToFind);
    if (!elem) return null;

    return elem.migrada;
};

const getCategory = (caterogy, isPrincipal = false) => {
    const categoryToFind = isPrincipal
        ? getPrincipalCategory(caterogy)
        : getSecundaryCategory(caterogy);
    const elem = findCategory(categoryToFind);

    if (!elem) return null;

    return elem;
};

export { isMigratedCategory, getCategory };
