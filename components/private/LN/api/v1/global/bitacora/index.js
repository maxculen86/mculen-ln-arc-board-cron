import get from '../../../../../common/utils/get';

const getArticles = articles => {
    let posnum = 0;
    return (
        articles.map(item => {
            posnum += 1;
            const arcStoryId = get(item, '_id', null);
            return {
                id_nota: arcStoryId,
                url_nota: item.website_url,
                posicion: `${String(posnum).padStart(2, '0')}`
            };
        }) || []
    );
};

const index = children => {
    let cajanum = 0;
    const ArticlesbyBox = children.reduce((result, elem) => {
        const { information, feature } = elem;
        cajanum += 1;
        const articles = get(elem, 'articles', []);

        result.push({
            id_caja: `${String(cajanum).padStart(2, '0')}`,
            visible: !information.hideCaja || false,
            feature,
            diagramacion_caja: information.layout,
            notas: getArticles(articles)
        });

        return result;
    }, []);

    return { cajas: ArticlesbyBox };
};

export default index;
