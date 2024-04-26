import get from '../../../../../common/utils/get';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';
import { Article as ArticleLN10 } from './article/index';
import { ExternalArticle } from '../../../v1/mobile/home/externalArticle';
import { cardRegular as Article } from '../../../common/article/cardRegular/index';
import { cardAnexoItemMobile as CardAnexoLN } from '../../../common/article/cardAnexo/index';
import { CardAnexo as CardAnexoLN10 } from '../../../v1/mobile/home/article/cardAnexo/index';
import configInfoSectionsByLayout from '../../../common/home/config/configInfoSectionsByLayout';
import { boxInfoByLayoutBySectionAlias } from '../../../common/home/boxInformation/index';
import { boxTypeByLayout } from '../../../common/home/boxTypes/index';
import banners from '../../../common/home/boxInformation/LN10/boxes/config/configBannersBySectionAliasMobile';
import { attachBanners } from '../../../common/home/boxInformation/LN10/boxes/config/configHandler';
import { isNoteListenableHome as isNoteListenable } from '../../../../../../../content/sources/utils/audioNews/helper';

const excludeUrlsInBoxInfo = ['https://www.lanacion.com.ar/suscriptores/'];

const FunctionsBoxContentsByLayout = {
    'LN-Home_Main': {
        article: Article,
        anexo: CardAnexoLN,
        externalArticle: ExternalArticle
    },
    'LN10-Home_Main-V2': {
        article: ArticleLN10,
        anexo: CardAnexoLN10,
        externalArticle: ExternalArticle
    },
    default: {
        article: Article,
        anexo: CardAnexoLN,
        externalArticle: ExternalArticle
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

const index = (
    children,
    paramsFromPage = {
        rootPath:
            'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=json'
    },
    homeFetchDate = null
) => {
    const layoutPage =
        get(paramsFromPage, 'information.layoutPage', 'null') + '-V2';
    const typeSection = configInfoSectionsByLayout(layoutPage);

    if (!layoutPage || !typeSection) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error v2/mobile/home/index : ${JSON.stringify(
                paramsFromPage
            )} - errorMsj: Missing layoutPage`
        );

        return null;
    }

    const ArticlesbyBox = children.reduce((result, f, i) => {
        const { information, sectionAliasMobile } = f;
        const sectionBox = f;
        const informationValid = validateInfoBox(information);
        sectionBox.information = informationValid;

        if (f.articles && f.articles.length > 0) {
            f.articles = addListenableFlagForArticles(f.articles);
        }

        const boxInfoFunction = boxInfoByLayoutBySectionAlias(
            layoutPage,
            sectionAliasMobile
        );
        const box = boxInfoFunction(
            informationValid,
            sectionAliasMobile,
            typeSection
        );

        const boxInfo = attachBanners(box, sectionAliasMobile, banners);

        const type = Number(sectionBox.type);
        switch (type) {
            case 0:
                {
                    const articleFn =
                        get(
                            FunctionsBoxContentsByLayout,
                            `${layoutPage}.article`,
                            null
                        ) ||
                        get(
                            FunctionsBoxContentsByLayout,
                            `default.article`,
                            null
                        );
                    result.push(
                        boxTypeByLayout(layoutPage, type)(
                            sectionBox,
                            boxInfo,
                            articleFn,
                            paramsFromPage
                        )
                    );
                }
                break;
            case 7:
                {
                    const articleFn =
                        get(
                            FunctionsBoxContentsByLayout,
                            `${layoutPage}.externalArticle`,
                            null
                        ) ||
                        get(
                            FunctionsBoxContentsByLayout,
                            `default.externalArticle`,
                            null
                        );
                    result.push(
                        boxTypeByLayout(layoutPage, type)(
                            sectionBox,
                            boxInfo,
                            articleFn,
                            paramsFromPage
                        )
                    );
                }
                break;
            case 1:
            case 5:
                result.push(
                    boxTypeByLayout(layoutPage, type)(sectionBox, typeSection)
                );

                break;
            case 2:
                {
                    const anexoFn =
                        get(
                            FunctionsBoxContentsByLayout,
                            `${layoutPage}.anexo`,
                            null
                        ) ||
                        get(
                            FunctionsBoxContentsByLayout,
                            `default.anexo`,
                            null
                        );
                    result.push(
                        boxTypeByLayout(layoutPage, type)(
                            sectionBox,
                            boxInfo,
                            anexoFn
                        )
                    );
                }

                break;

            case 3:
            case 8:
                result.push(
                    boxTypeByLayout(layoutPage, type)(sectionBox, boxInfo)
                );
                break;
            case 4:
                result.push(boxTypeByLayout(layoutPage, type)(f, typeSection));
                break;
            default:
                // eslint-disable-next-line no-console
                console.log('to discard');
                break;
        }

        return result;
    }, []);

    const resultWithoutEmptyItems = removeEmptyItems(ArticlesbyBox);

    return [
        {
            metadata: {
                paginate: false,
                homeFetchDate: homeFetchDate
            },
            items: resultWithoutEmptyItems
        }
    ];
};

const addListenableFlagForArticles = articles => {
    return articles.map(x => {
        return {
            ...x,
            isListenable: isNoteListenable(x)
        };
    });
};

export default index;
