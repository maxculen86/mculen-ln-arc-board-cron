import get from '../../../../../common/utils/get';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';
import { Article as ArticleLN10 } from './article/index';
import { cardRegular as Article } from '../../../common/article/cardRegular/index';
import { cardAnexoHtmlOrUrl as Anexo } from '../../../common/article/cardAnexo/index';
import { storyBox } from '../../../common/home/boxTypes/storyBox';
import { anticipoBox } from '../../../common/home/boxTypes/anticipoBox';
import { anexoMobileBox } from '../../../common/home/boxTypes/anexoMobileBox';
import { bannerBox } from '../../../common/home/boxTypes/bannerBox';
import { sectionAcuBox } from '../../../common/home/boxTypes/sectionAcumuladoBox';
import configInfoSectionsByLayout from '../../../common/home/config/configInfoSectionsByLayout';
import {
    boxInfoBySectionAlias,
    boxInfoComplete
} from '../../../common/home/boxInformation/index';

const ArticleByLayout = {
    'LN-Home_Main': Article,
    'LN10-Home_Main': ArticleLN10,
    default: Article
};

const typeBox = {
    0: storyBox,
    1: bannerBox,
    2: anexoMobileBox,
    3: anticipoBox,
    4: sectionAcuBox
};

const index = (
    children,
    paramsFromPage = {
        rootPath:
            'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=json'
    }
) => {
    const layoutPage = get(paramsFromPage, 'information.layoutPage', 'null');
    const typeSection = configInfoSectionsByLayout(layoutPage);
    const articleFn = ArticleByLayout[layoutPage] || Article;

    if (!layoutPage || !typeSection) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error v1/mobile/home/index : ${JSON.stringify(
                paramsFromPage
            )} - errorMsj: Missing layoutPage`
        );

        return null;
    }

    const ArticlesbyBox = children.reduce((result, f, i) => {
        const { information, sectionAliasMobile } = f;

        const boxInfoBySection = boxInfoBySectionAlias[sectionAliasMobile];
        const boxInfo = boxInfoBySection
            ? boxInfoBySection(information, sectionAliasMobile, typeSection)
            : boxInfoComplete(information, sectionAliasMobile, typeSection);
        const type = Number(f.type);

        switch (type) {
            case 0:
                // eslint-disable-next-line no-unreachable
                result.push(
                    typeBox[type](f, boxInfo, articleFn, paramsFromPage)
                );
                break;
            case 1:
                // eslint-disable-next-line no-unreachable
                result.push(typeBox[type](f, typeSection));
                break;
            case 2:
                // eslint-disable-next-line no-unreachable
                result.push(typeBox[type](f, boxInfo, Anexo));
                break;

            case 3:
                result.push(typeBox[type](f, boxInfo));
                break;
            default:
                // eslint-disable-next-line no-console
                console.log('to discard');
                break;
        }

        return result;
    }, []);
    return [removeEmptyItems(ArticlesbyBox)];
};

export default index;
