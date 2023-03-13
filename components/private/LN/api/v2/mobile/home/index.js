import get from '../../../../../common/utils/get';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';
import { Article } from './article/index';
import { cardAnexoHtmlOrUrl as Anexo } from '../../../common/article/cardAnexo/index';
import { storyBox } from '../../../common/home/boxTypes/storyBox';
import { anticipoBox } from '../../../common/home/boxTypes/anticipoBox';
import { anexoMobileBox } from '../../../common/home/boxTypes/anexoMobileBox';
import { bannerBox } from '../../../common/home/boxTypes/bannerBox';
import { sectionAcuBox } from '../../../common/home/boxTypes/sectionAcumuladoBox';
import configInfoSectionsByLayout from '../../../common/home/config/configInfoSectionsByLayout';
import { boxInfoByLayoutBySectionAlias } from '../../../common/home/boxInformation/index';

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

        const boxInfoFunction = boxInfoByLayoutBySectionAlias(
            layoutPage,
            sectionAliasMobile
        );
        const boxInfo = boxInfoFunction(
            information,
            sectionAliasMobile,
            typeSection
        );

        const type = Number(f.type);
        switch (type) {
            case 0:
                // eslint-disable-next-line no-unreachable
                result.push(typeBox[type](f, boxInfo, Article, paramsFromPage));
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
                // eslint-disable-next-line no-console
                result.push(typeBox[type](f, boxInfo));
                break;
            default:
                //  Only to Discard the element.
                console.log('to discard');
                break;
        }

        return result;
    }, []);
    return [removeEmptyItems(ArticlesbyBox)];
};

export default index;
