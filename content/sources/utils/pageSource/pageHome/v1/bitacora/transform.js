import {
    infoLNMainLN10,
    infoLNMain
} from '../../../../../../../components/private/LN/api/common/home/config/configInfoSectionsByLayout';
import { BackendLnError } from '../../../../../../../components/private/LN/api/common/models/backendLnError';
import { enumTypeError } from '../../../../../../../components/private/LN/api/common/enums/enumTypeError';

const specialBox = {
    'ln-acumulado/timeline': 'timeline',
    'ln-common/ln10_timeline': 'timeline',
    'ln-10/timeline': 'timeline',
    'ln-common/ln10_editorial': 'h_editoriales'
};
const omitSections = {
    'ln-common/ln10_en_vivo': false
};
const specialBoxRoot = {
    'ln-common/opinion': 'h_opinion',
    'ln-common/ln10_opinion': 'h_opinion',
    'ln-common/ln10_en_vivo': 'h_enVivo'
};

const configPositionArticlesByBox = {
    default: { fields: ['_id', 'website_url'], savePosition: true }
};

const createBox = (
    id,
    visible,
    feature,
    layout,
    notas,
    itemCategory = 'N/A'
) => ({
    id_caja: id,
    visible: visible || true,
    feature,
    diagramacion_caja: layout,
    item_category: itemCategory,
    notas
});

const getFeature = sectionAliasMobile => {
    let infoEntry = infoLNMainLN10[sectionAliasMobile];
    infoEntry = infoEntry || infoLNMain[sectionAliasMobile];
    infoEntry = infoEntry || infoLNMain.default;

    return infoEntry.tipoSeccion;
};

const createNota = (article, index) => {
    const { _id: id, website_url: url } = article;
    return {
        id_nota: id,
        url_nota: url,
        posicion: index.toString().padStart(2, '0')
    };
};
const createNotasArray = elem => {
    const notasArray = [];
    const resp = {};
    let posicion = 0;
    const configPositionArticles =
        configPositionArticlesByBox[elem && elem.sectionAliasMobile] ||
        configPositionArticlesByBox.default;

    if (!elem.articles) {
        return {
            ...resp,
            notasArray
        };
    }
    elem.articles.forEach(article => {
        if (specialBox[article.sectionAliasMobile]) {
            const notas = createNotasArray(article);
            const box = createBox(
                specialBox[article.sectionAliasMobile],
                article.information?.hideCaja,
                getFeature(elem.sectionAliasMobile),
                article.information?.layout,
                notas.notasArray,
                article.information?.viewabilityRoof
            );
            resp.specialBox = box;
            return;
        }
        if (
            !article ||
            (configPositionArticles &&
                configPositionArticles.fields?.some(f => !article[f]))
        ) {
            if (configPositionArticles?.savePosition) posicion += 1;
            return;
        }
        posicion += 1;
        const nota = createNota(article, posicion);
        notasArray.push(nota);
    });

    return {
        ...resp,
        notasArray
    };
};

const createBoxAndNotas = (elem, paramCajaCount, cajas) => {
    const { sectionAliasMobile, information } = elem;
    const isSpecialBox = specialBoxRoot[sectionAliasMobile];
    let cajaCount = paramCajaCount;
    try {
        const notas = createNotasArray(elem);
        const boxId = isSpecialBox
            ? specialBoxRoot[sectionAliasMobile]
            : cajaCount.toString().padStart(2, '0');
        const hideCaja = information ? information.hideCaja : undefined;
        const informationLayout = information ? information.layout : undefined;
        const layout =
            elem.sectionAliasMobile === 'ln-common/ln10_en_vivo'
                ? 'enVivo'
                : informationLayout;

        const caja = createBox(
            boxId,
            hideCaja,
            getFeature(sectionAliasMobile),
            layout,
            notas.notasArray,
            information.viewabilityRoof
        );
        cajas.push(caja);
        if (notas.specialBox) cajas.push(notas.specialBox);
        if (!isSpecialBox) cajaCount += 1;
        return cajaCount;
    } catch (error) {
        if (!isSpecialBox) cajaCount += 1;
        console.error(
            new BackendLnError(
                `Error Transform - v1/bitacora/transform 
            La caja ${elem.sectionAliasMobile} no se pudo parsear correctamente,
            elem: ${elem}`,
                enumTypeError.bitacoraError
            )
        );
        return cajaCount;
    }
};

const transform = async (dataPage, query) => {
    const {
        information: { layoutPage },
        content_elements: elementsPage
    } = dataPage;
    try {
        let cajaCount = 1;
        const cajas = [];
        elementsPage.forEach(elem => {
            if (elem.type !== 0 && elem.type !== 7 && elem.type !== 11) return; // Ignorar elementos que no son cajas
            if (omitSections[elem.sectionAliasMobile]) return; // Ignorar cajas que deben omitirse
            cajaCount = createBoxAndNotas(elem, cajaCount, cajas);
        });

        return {
            cajas,
            apiPageHomeSourceFetchDate:
                query.information.apiPageHomeSourceFetchDate,
            layoutDate: query.information.layoutDate,
            homeFetchDate: query.information.homeFetchDate,
            keyCachedCall: query.information.keyCachedCall
        };
    } catch (error) {
        throw new BackendLnError(
            `Error Transform - v1/bitacora/transform :  layout: ${layoutPage} - 
        query: ${JSON.stringify(query)} - errorMsj:${error.message}`,
            enumTypeError.bitacoraError
        );
    }
};

export default transform;
