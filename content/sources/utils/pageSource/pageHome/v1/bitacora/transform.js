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
        const omitSections = {
            'ln-acumulado/timeline': true,
            'ln-common/opinion': true,
            'ln-common/editoriales': true
        };
        const cajas = elementsPage
            ?.filter(elem => elem && elem.type === 0)
            .map((elem, i) => {
                if (omitSections[elem.sectionAliasMobile]) {
                    return null; // Omitir la caja
                }
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
            })
            .filter(caja => caja !== null); // Eliminar cajas nulas

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
