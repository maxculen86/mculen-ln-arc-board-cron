import {
    infoLNMainLN10,
    infoLNMain
} from '../../../../../../../components/private/LN/api/common/home/config/configInfoSectionsByLayout';

const getFeature = sectionAliasMobile => {
    const infoEntry =
        infoLNMainLN10[sectionAliasMobile] ??
        infoLNMain[sectionAliasMobile] ??
        infoLNMain.default;
    return infoEntry.tipoSeccion;
};
const transform = async (dataPage, query) => {
    const {
        information: { layoutPage },
        content_elements: elementsPage
    } = dataPage;

    try {
        let elementsPageHome = elementsPage;
        elementsPageHome =
            elementsPageHome &&
            elementsPageHome.filter(elem => elem && elem.type === 0);
        // return elementsPageHome;
        // Returns boxes that type equal 0, becacuse have articles
        const cajas = elementsPageHome.map((elem, i) => {
            const notas = elem.articles.map((article, j) => {
                return {
                    // eslint-disable-next-line no-underscore-dangle
                    id_nota: article._id,
                    url_nota: article.website_url,
                    posicion: (j + 1).toString().padStart(2, '0')
                };
            });
            return {
                id_caja: (i + 1).toString().padStart(2, '0'),
                visible: elem.information.hideCaja || true,
                feature: getFeature(elem.sectionAliasMobile),
                diagramacion_caja: elem.information.layout,
                notas
            };
        });

        return { cajas };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - v1/bitacora/transform :  layout: ${layoutPage} - query: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
