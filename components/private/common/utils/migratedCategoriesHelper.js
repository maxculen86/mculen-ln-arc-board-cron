import { DICTIONARY } from 'fusion:environment';

const categoriesDictionary = DICTIONARY.categories;

function findCategory(categoryToFind) {
    const elem = categoriesDictionary.find(
        e => categoryToFind.toLowerCase() === e.ArcSectionId.toLowerCase()
    );

    return elem;
}

function getSecundaryCategory(category) {
    if (!category) throw new Error(`No se admiten categorias null`);

    const elem = category.substr(category.lastIndexOf('/'));
    return elem;
}

function getPrincipalCategory(category) {
    if (!category) throw new Error(`No se admiten categorias null`);

    const principalCategory = `/${
        category.split('/').filter(e => {
            return e;
        })[0]
    }`;
    return principalCategory;
}

const isMigratedCategory = (category, migration) => {
    if (!migration) {
        throw new Error(
            `La categoria '${category}' no posee la propiedad migration`
        );
    }

    const migrada = migration.migrated_mob === 'true' ? true : false;
    return migrada;
};

const getCategory = (category, isPrincipal = false) => {
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
