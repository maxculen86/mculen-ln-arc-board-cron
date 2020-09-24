import ArticleList from './articleList';
import Configuration from './configuration';

const index = acuData => {
    const resp = {
        acumuladoTotal: acuData.total,
        paginar: acuData.paginator > 0,
        titulo: acuData.name,
        notas: ArticleList(acuData.articles)
    };

    if (acuData.configuration) {
        resp.configuracion = Configuration(acuData.configuration);
    }

    return resp;
};
export default index;
