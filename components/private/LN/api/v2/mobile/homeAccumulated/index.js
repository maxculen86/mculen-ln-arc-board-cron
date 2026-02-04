import get from '../../../../../common/utils/get';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';
import { Article as ArticleLN10 } from '../../../v1/mobile/home/article/index';
import { cardRegular as Article } from '../../../common/article/cardRegular/index';
import { cardAnexoItemMobile as CardAnexoLN } from '../../../common/article/cardAnexo/index';
import { CardAnexo as CardAnexoLN10 } from '../home/article/cardAnexo/index';
import configInfoSectionsByLayout from '../../../common/home/config/configInfoSectionsByLayout';
import { boxInfoByLayoutBySectionAlias } from '../../../common/home/boxInformation/index';
import { boxTypeByLayout } from '../../../common/home/boxTypes/index';
import banners from '../../../common/home/boxInformation/LN10/boxes/config/configBannersBySectionAliasMobile';
import { attachBanners } from '../../../common/home/boxInformation/LN10/boxes/config/configHandler';
import { isNoteListenableForApps as isNoteListenable } from '../../../../../../../content/sources/utils/audioNews/helper';

const excludeUrlsInBoxInfo = ['https://www.lanacion.com.ar/suscriptores/'];

const FunctionsBoxContentsByLayout = {
    'LN-Home_Main': {
        article: Article,
        anexo: CardAnexoLN
    },
    'LN10-Home_Main': {
        article: ArticleLN10,
        anexo: CardAnexoLN10
    },
    'LN-acumulado': {
        article: Article,
        anexo: CardAnexoLN10
    },
    default: {
        article: Article,
        anexo: CardAnexoLN
    }
};

const validateInfoBox = information => {
    const informationValid = information;
    const urlLink = informationValid
        ? informationValid.url || informationValid.link
        : null;
    if (excludeUrlsInBoxInfo.includes(urlLink)) {
        if (informationValid.url) informationValid.url = null;
        if (informationValid.link) informationValid.link = null;
    }
    return informationValid;
};

const addListenableFlagForArticles = articles =>
    articles.map(x => ({
        ...x,
        isListenable: isNoteListenable(x)
    }));
const index = (
    children,
    paramsFromPage = {
        rootPath:
            'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=json'
    }
) => {
    const layoutPage = get(paramsFromPage, 'information.layoutPage', 'null');
    const typeSection = configInfoSectionsByLayout(layoutPage);
    if (!layoutPage || !typeSection) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error v2/mobile/homeAccumulated/index : ${JSON.stringify(
                paramsFromPage
            )} - errorMsj: Missing layoutPage`
        );

        return null;
    }

    const articleFn =
        get(FunctionsBoxContentsByLayout, `${layoutPage}.article`, null) ??
        get(FunctionsBoxContentsByLayout, `default.article`, null);

    const anexoFn =
        get(FunctionsBoxContentsByLayout, `${layoutPage}.anexo`, null) ??
        get(FunctionsBoxContentsByLayout, `default.anexo`, null);

    const ArticlesbyBox = children.reduce((result, f) => {
        const { information, sectionAliasMobile } = f;
        const sectionBox = f;
        const informationValid = validateInfoBox(information);
        sectionBox.information = informationValid;

        const boxInfoFunction = boxInfoByLayoutBySectionAlias(
            layoutPage,
            sectionAliasMobile
        );
        const box = boxInfoFunction(
            informationValid,
            sectionAliasMobile,
            typeSection
        );

        if (sectionBox.articles && sectionBox.articles.length > 0) {
            sectionBox.articles = addListenableFlagForArticles(f.articles);
        }

        const type = Number(sectionBox.type);
        const boxTypeHandler = boxTypeByLayout(layoutPage, type);
        const boxInfo = attachBanners(box, sectionAliasMobile, banners);
        const handlerArticle = () =>
            boxTypeHandler(sectionBox, boxInfo, articleFn, paramsFromPage);

        const handlerAnexo = () => boxTypeHandler(sectionBox, boxInfo, anexoFn);

        const handlerCarrusel = () => boxTypeHandler(sectionBox, boxInfo);

        const mapHandlers = {
            0: handlerArticle,
            2: handlerAnexo,
            10: handlerCarrusel
        };

        const handler = mapHandlers[type];

        if (handler) result.push(handler());

        return result;
    }, []);
    return [removeEmptyItems(ArticlesbyBox)];
};

export default index;
