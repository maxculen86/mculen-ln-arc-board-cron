import get from '../../../../../common/utils/get';

const getData = (
    data,
    title,
    disclaimer,
    arrayKey,
    itemTransform,
    hide = false
) => {
    const itemsToMap = data?.embed?.config?.[arrayKey];
    if (!data || Object.keys(data).length === 0) return null;
    if (!itemsToMap || itemsToMap?.length === 0) return null;
    if (hide) return null;

    return {
        title,
        disclaimer,
        items: itemsToMap.map(itemTransform)
    };
};

const getTermica = (dataNota, path) =>
    get(dataNota, `navigationTreeSource.Termicas.${path}`, 'false') === 'true';

const getIa = dataNota => {
    const { glossary } = dataNota?.promo_items || {};
    const hideGlossary = getTermica(dataNota, 'hide_articles_glossary_apps');
    return {
        glossary: getData(
            glossary,
            'Glosario',
            'Realizado con Inteligencia Artificial',
            'arrayData',
            word => ({ key: word.key, value: word.value }),
            hideGlossary
        )
    };
};

export default getIa;
