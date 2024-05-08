import {
    infoLNMainLN10,
    infoLNMain
} from '../../../../../../../components/private/LN/api/common/home/config/configInfoSectionsByLayout';
import BackendLnError from '../../../../../../../components/private/LN/api/common/models/backendLnError';
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
    webstories: { fields: ['_id', 'website_url'], savePosition: false },
    default: { fields: ['_id', 'website_url'], savePosition: true }
};

const createBoxAndNotas = (elem, cajaCount, cajas) => {
    const { sectionAliasMobile, information } = elem;
    const isSpecialBox = specialBoxRoot[sectionAliasMobile];

    try {
        const notas = createNotasArray(elem);
        const boxId = isSpecialBox
            ? specialBoxRoot[sectionAliasMobile]
            : cajaCount.toString().padStart(2, '0');
        const hideCaja = information ? information.hideCaja : undefined;
        const layout =
            elem.sectionAliasMobile === 'ln-common/ln10_en_vivo'
                ? 'enVivo'
                : information
                ? information.layout
                : undefined;
        const caja = createBox(
            boxId,
            hideCaja,
            getFeature(sectionAliasMobile),
            layout,
            notas.notasArray
        );
        cajas.push(caja);
        if (notas.specialBox) cajas.push(notas.specialBox);
        // eslint-disable-next-line no-param-reassign
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

const createNota = (article, index) => ({
    // eslint-disable-next-line no-underscore-dangle
    id_nota: article._id,
    url_nota: article.website_url,
    posicion: index.toString().padStart(2, '0')
});

const createBox = (id, visible, feature, layout, notas) => ({
    id_caja: id,
    visible: visible || true,
    feature,
    diagramacion_caja: layout,
    notas
});

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

    for (const element of elem.articles) {
        const article = element;
        if (specialBox[article.sectionAliasMobile]) {
            const notas = createNotasArray(article);
            const box = createBox(
                specialBox[article.sectionAliasMobile],
                article.information && article.information.hideCaja,
                getFeature(elem.sectionAliasMobile),
                article.information && article.information.layout,
                notas.notasArray
            );
            resp.specialBox = box;
            // eslint-disable-next-line no-continue
            continue;
        }
        if (
            !article ||
            (configPositionArticles &&
                configPositionArticles.fields &&
                configPositionArticles.fields.some(f => !article[f]))
        ) {
            if (configPositionArticles && configPositionArticles.savePosition)
                posicion += 1;
            // eslint-disable-next-line no-continue
            continue;
        }
        posicion += 1;
        const nota = createNota(article, posicion);
        notasArray.push(nota);
    }
    return {
        ...resp,
        notasArray
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
        content_elements: elementsPage,
        homeFetchDate: homeFetchDate = null,
        layoutDate: layoutDate = null,
        keyCachedCall: keyCachedCall = null,
        apiPageHomeSourceFetchDate: apiPageHomeSourceFetchDate = null
    } = dataPage;
    try {
        let cajaCount = 1;
        const cajas = [];

        elementsPage.forEach((elem, i) => {
            if (elem.type !== 0 && elem.type !== 7 && elem.type !== 11) return; // Ignorar elementos que no son cajas
            if (omitSections[elem.sectionAliasMobile]) return; // Ignorar cajas que deben omitirse
            cajaCount = createBoxAndNotas(elem, cajaCount, cajas);
        });

        return {
            cajas,
            apiPageHomeSourceFetchDate,
            layoutDate,
            homeFetchDate,
            keyCachedCall
        };
    } catch (error) {
        // eslint-disable-next-line no-console

        throw new BackendLnError(
            `Error Transform - v1/bitacora/transform :  layout: ${layoutPage} - 
        query: ${JSON.stringify(query)} - errorMsj:${error.message}`,
            enumTypeError.bitacoraError
        );
    }
};

export default transform;
