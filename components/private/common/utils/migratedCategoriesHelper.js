import { DICTIONARY } from 'fusion:environment';

const categoriesDictionary = DICTIONARY.categories;

function findCategory(categoryToFind) {
    if (!categoryToFind) return null;

    const elem = categoriesDictionary.find(
        e => categoryToFind.toLowerCase() === e.ArcSectionId.toLowerCase()
    );

    return elem;
}

function getSecundaryCategory(category) {
    const elem = category.substr(category.lastIndexOf('/'));
    return elem;
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
        ? getPrincipalCategory(category)
        : getSecundaryCategory(category);

    const elem = findCategory(categoryToFind);

    if (!elem)
        throw new Error(
            `La categoria '${category}' no existe en el diccionario`
        );

    return elem.migrada;
};

const getCategory = (caterogy, isPrincipal = false) => {
    const categoryToFind = isPrincipal
        ? getPrincipalCategory(category)
        : getSecundaryCategory(category);

    const elem = findCategory(categoryToFind);

    if (!elem)
        throw new Error(
            `La categoria '${category}' no existe en el diccionario`
        );

    return elem;
};

export { isMigratedCategory, getCategory };
