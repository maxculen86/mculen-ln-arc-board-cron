import get from '../../../../../common/utils/get';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';
import { generateHashContentVersion } from '../../../common/utils/contentVersionGenerator';
import { Article as ArticleLN10 } from './article/index';
import { cardRegular as Article } from '../../../common/article/cardRegular/index';
import { cardAnexoItemMobile as CardAnexoLN } from '../../../common/article/cardAnexo/index';
import { CardAnexo as CardAnexoLN10 } from '../../../v1/mobile/home/article/cardAnexo/index';
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
    'LN10-Home_Main-V2': {
        article: ArticleLN10,
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
            'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=json',
        information: {
            homeFetchDate: null,
            layoutDate: null,
            keyCachedCall: null,
            apiPageHomeSourceFetchDate: null
        }
    }
) => {
    const layoutPage = `${get(paramsFromPage, 'information.layoutPage', 'null')}-V2`;
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

    const ArticlesbyBox = children.reduce((result, f) => {
        const { information, sectionAliasMobile } = f;
        const sectionBox = f;
        const informationValid = validateInfoBox(information);
        sectionBox.information = informationValid;

        if (sectionBox.articles && sectionBox.articles.length > 0) {
            sectionBox.articles = addListenableFlagForArticles(f.articles);
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

        try {
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
                case 1:
                case 5:
                    result.push(
                        boxTypeByLayout(layoutPage, type)(
                            sectionBox,
                            typeSection
                        )
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
                case 10:
                case 12:
                    result.push(
                        boxTypeByLayout(layoutPage, type)(sectionBox, boxInfo)
                    );
                    break;
                case 4:
                    result.push(
                        boxTypeByLayout(layoutPage, type)(f, typeSection)
                    );
                    break;
                default:
                    // eslint-disable-next-line no-console
                    console.log('to discard');
                    break;
            }
        } catch (e) {
            console.error(
                `${e.name}: ${e.message} at api/v2/mobile/home/index on element: ${JSON.stringify(information)}`
            );
        }

        return result;
    }, []);

    const resultWithoutEmptyItems = removeEmptyItems(ArticlesbyBox);
    const hashContentVersion = generateHashContentVersion(
        resultWithoutEmptyItems
    );

    return [
        {
            metadata: {
                paginate: false,
                apiPageHomeSourceFetchDate:
                    paramsFromPage.information.apiPageHomeSourceFetchDate,
                layoutDate: paramsFromPage.information.layoutDate,
                homeFetchDate: paramsFromPage.information.homeFetchDate,
                keyCachedCall: paramsFromPage.information.keyCachedCall,
                contentVersion: hashContentVersion
            },
            items: resultWithoutEmptyItems
        }
    ];
};

export default index;
