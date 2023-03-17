import {
    infoLNMainLN10,
    infoLNMain
} from '../../../../../../../components/private/LN/api/common/home/config/configInfoSectionsByLayout';

const createNotasArray = elem => {
    const notasArray = [];
    const resp = {};
    for (let j = 0; j < elem.articles.length; j += 1) {
        const article = elem.articles[j];
        if (article.sectionAliasMobile === 'ln-acumulado/timeline') {
            const notas = createNotasArray(article);
            const timelineCaja = createCaja(
                'timeline',
                article.information && article.information.hideCaja,
                getFeature(elem.sectionAliasMobile),
                article.information && article.information.layout,
                notas.notasArray
            );
            resp.timelineCaja = timelineCaja;
            // eslint-disable-next-line no-continue
            continue;
        }
        const nota = {
            // eslint-disable-next-line no-underscore-dangle
            id_nota: article._id,
            url_nota: article.website_url,
            posicion: (j + 1).toString().padStart(2, '0')
        };
        notasArray.push(nota);
    }
    return {
        ...resp,
        notasArray
    };
};

const createCaja = (id, visible, feature, layout, notas) => {
    return {
        id_caja: id,
        visible: visible || true,
        feature,
        diagramacion_caja: layout,
        notas
    };
};
const getFeature = sectionAliasMobile => {
    let infoEntry = infoLNMainLN10[sectionAliasMobile];
    infoEntry = infoEntry || infoLNMain[sectionAliasMobile];
    infoEntry = infoEntry || infoLNMain.default;

    return infoEntry.tipoSeccion;
};
const transform = async (dataPage, query) => {
    const {
        information: { layoutPage },
        content_elements: elementsPage
    } = dataPage;
    try {
        const omitSections = {
            'ln-common/opinion': true,
            'ln-common/editoriales': true
        };
        let cajaCount = 1;
        const cajas = [];
        elementsPage.forEach((elem, i) => {
            if (elem.type !== 0) return; // Ignorar elementos que no son cajas
            if (omitSections[elem.sectionAliasMobile]) return; // Ignorar cajas que deben omitirse

            const notas = createNotasArray(elem);
            const caja = createCaja(
                cajaCount.toString().padStart(2, '0'),
                elem.information.hideCaja,
                getFeature(elem.sectionAliasMobile),
                elem.information.layout,
                notas.notasArray
            );

            cajaCount += 1;
            cajas.push(caja);
            if (notas.timelineCaja) cajas.push(notas.timelineCaja);
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
