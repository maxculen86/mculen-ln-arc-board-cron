import {
    infoLNMain,
    infoLNMainLN10
} from '../../../../../../../components/private/LN/api/common/home/config/configInfoSectionsByLayout';
import { BackendLnError } from '../../../../../../../components/private/LN/api/common/models/backendLnError';
import { enumTypeError } from '../../../../../../../components/private/LN/api/common/enums/enumTypeError';
import { setRankingByLayout } from '../../../common/elements/ranking/index';

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
    'ln-common/ln10_en_vivo': 'h_enVivo',
    ranking: 'h_ranking'
};

const configPositionArticlesByBox = {
    default: { fields: ['_id', 'website_url'], savePosition: true }
};

const BoxType = {
    Notas: 'notas',
    Videos: 'videos'
};

const diagramationFromLayout = layout => {
    const diagramation = {
        'left-focal-without-timeline': 'apertura_left-focal-without-timeline',
        'left-focal-video-vertical': 'apertura_left-focal-with-video',
    };
    return diagramation[layout] ?? layout;
};

const createBox = ({
    id,
    visible,
    feature,
    layout,
    notas,
    type,
    itemCategory = 'N/A',
    videos = undefined }

) => {
    const base = {
        id_caja: id,
        visible,
        feature,
        diagramacion_caja: diagramationFromLayout(layout),
        item_category: itemCategory,
        [type]: notas
    };

    return videos ? { ...base, videos } : base;
};
const getFeature = sectionAliasMobile => {
    let infoEntry = infoLNMainLN10[sectionAliasMobile];
    infoEntry = infoEntry || infoLNMain[sectionAliasMobile];
    infoEntry = infoEntry || infoLNMain.default;

    return infoEntry.tipoSeccion;
};

const createVideo = (video, index) => {
    const { _id: id, website_url: url } = video;
    return {
        id_video: id,
        url_video: url,
        posicion: index.toString().padStart(2, '0')
    };
};

const createNota = (article, index) => {
    const { _id: id, website_url: url } = article;
    return {
        id_nota: id,
        url_nota: url,
        posicion: index.toString().padStart(2, '0')
    };
};

const normalizeCarousel = elem => ({
    ...elem,
    information: {
        ...elem.information,
        layout: 'carrusel',
        viewabilityRoof: elem.information.title
    },
    articles: elem.videos.map(({ jwVideoId, fullVideoUrl }) => ({
        _id: jwVideoId,
        website_url: fullVideoUrl
    }))
});

const CAROUSEL_ALIASES = [
    'ln10_caja_carrusel',
    'ln10_caja_carrusel_horizontal'
];

const normalizeElement = elem => {
    const isCarousel = CAROUSEL_ALIASES.includes(elem.sectionAliasMobile);
    return isCarousel ? normalizeCarousel(elem) : elem;
};


const createNotasArray = (elem, boxType) => {
    const notasArray = [];
    const resp = {};
    let posicion = elem.sectionAliasMobile === 'bnplayer' ? 1 : 0;
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
            const notas = createNotasArray(article, boxType);
            const box = createBox({
                id: specialBox[article.sectionAliasMobile],
                visible: !article.information?.hideCaja,
                feature: getFeature(elem.sectionAliasMobile),
                layout: article.information?.layout,
                notas: notas.notasArray,
                type: boxType,
                itemCategory: article.information?.viewabilityRoof
            });
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
        const nota =
            boxType === BoxType.Notas
                ? createNota(article, posicion)
                : createVideo(article, posicion);
        notasArray.push(nota);
    });

    return {
        ...resp,
        notasArray
    };
};

const createBoxAndNotas = (elem, paramCajaCount, cajas, boxType) => {
    const { sectionAliasMobile, information } = elem;
    const isSpecialBox = specialBoxRoot[sectionAliasMobile];
    let cajaCount = paramCajaCount;
    let videos;
    try {
        const notas = createNotasArray(elem, boxType);
        const boxId = isSpecialBox
            ? specialBoxRoot[sectionAliasMobile]
            : cajaCount.toString().padStart(2, '0');
        const hideCaja = information ? information.hideCaja : undefined;
        const informationLayout = information ? information.layout : undefined;
        const layout =
            elem.sectionAliasMobile === 'ln-common/ln10_en_vivo'
                ? 'enVivo'
                : informationLayout;

        if ((elem.sectionAliasMobile === 'bnplayer' || elem.sectionAliasMobile === 'apertura') && elem.video) {
            const videoPosition = information?.layout === 'left-focal-video-vertical' ? 6 : 1;
            videos = [
                createVideo(
                    {
                        _id: elem.video?.id,
                        website_url: elem.video?.fullVideoUrl
                    },
                    videoPosition
                )
            ];
        }
        const caja = createBox({
            id: boxId,
            visible: !hideCaja,
            feature: getFeature(sectionAliasMobile),
            layout,
            notas: notas.notasArray,
            type: boxType,
            itemCategory: information?.viewabilityRoof,
            videos
        }

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

const getRanking = async (query, layoutPage, elementsPageHome) => {
    // Add Ranking by Configuration set in file /pageSource/common/elements/ranking/config/configRankingPositionbySection.json
    const propsRanking = {
        website: query && query.website,
        layoutPage,
        globalContent: {},
        elementsPage: elementsPageHome
    };

    return (
        (setRankingByLayout[layoutPage] &&
            (await setRankingByLayout[layoutPage](propsRanking))) ||
        []
    );
};

const transform = async (dataPage, query) => {
    const {
        information: { layoutPage },
        content_elements: elementsPage
    } = dataPage;
    try {
        let cajaCount = 1;
        const cajas = [];
        let elements = await getRanking(query, layoutPage, elementsPage);
        if (elements.length === 0) {
            elements = elementsPage;
        }
        elements.forEach(elem => {
            const acceptedTypes = [0, 7, 10, 11, 12];
            if (!acceptedTypes.includes(elem.type)) return; // Ignorar elementos que no son cajas
            if (omitSections[elem.sectionAliasMobile]) return; // Ignorar cajas que deben omitirse

            const VIDEO_BOX_ALIASES = [
                'ln10_caja_carrusel',
                'ln10_caja_carrusel_horizontal'
            ];

            const boxType = VIDEO_BOX_ALIASES.includes(elem.sectionAliasMobile)
                ? BoxType.Videos
                : BoxType.Notas;
            cajaCount = createBoxAndNotas(
                normalizeElement(elem),
                cajaCount,
                cajas,
                boxType
            );
        });

        return {
            cajas,
            apiPageHomeSourceFetchDate:
                query.information?.apiPageHomeSourceFetchDate,
            layoutDate: query.information?.layoutDate,
            homeFetchDate: query.information?.homeFetchDate,
            keyCachedCall: query.information?.keyCachedCall
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
