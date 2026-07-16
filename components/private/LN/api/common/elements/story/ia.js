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
    const { summary } = dataNota?.promo_items || {};
    const hideArticlesSummary = getTermica(
        dataNota,
        'hide_articles_summary_apps'
    );
    return {
        summary: getData(
            summary,
            'Resumen de lectura',
            'Realizado con Inteligencia Artificial',
            'arrayBullets',
            bullet => ({ value: bullet }),
            hideArticlesSummary
        )
    };
};

export default getIa;
