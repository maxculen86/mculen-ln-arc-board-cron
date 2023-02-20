import get from '../../../../../common/utils/get';
import Image from '../../../common/elements/image';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';
import { cardRegular as Article } from '../../../common/article/cardRegular/index';
import { cardAnexoHtmlOrUrl as Anexo } from '../../../common/article/cardAnexo/index';
import { storyBox } from '../../../common/home/boxTypes/storyBox';
import { anticipoBox } from '../../../common/home/boxTypes/anticipoBox';
import { anexoMobileBox } from '../../../common/home/boxTypes/anexoMobileBox';
import { bannerBox } from '../../../common/home/boxTypes/bannerBox';
import { sectionAcuBox } from '../../../common/home/boxTypes/sectionAcumuladoBox';
import configInfoSectionsByLayout from '../../../common/home/config/configInfoSectionsByLayout';

const featureInformation = (information, section, typeSection) => {
    if (!information) return null;
    const sectionAlias = section && section.toLowerCase();
    const type = typeSection[sectionAlias] || typeSection.default;

    const res = {
        ...type,
        diagramacion: information.layout || null
    };

    if (section === 'LN-common/cajaAnticipo') {
        res.texto = information.title;
    }

    if (!information.hideTitle && !['apertura'].includes(section)) {
        const image = get(information.image, 'promo_items.basic', null);
        const imagenUrl = get(image, 'additional_properties.originalUrl', null);
        if (image && image.type === 'image') res.imagen = Image(image);
        if (imagenUrl) res.imagenUrl = imagenUrl;
        return {
            ...res,
            tituloCaja: information.title,
            url: information.url
        };
    }
    return res;
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

        const featureInfo = featureInformation(
            information,
            sectionAliasMobile,
            typeSection
        );
        const type = Number(f.type);
        switch (type) {
            case 0:
                // eslint-disable-next-line no-unreachable
                result.push(
                    typeBox[type](f, featureInfo, Article, paramsFromPage)
                );
                break;
            case 1:
                // eslint-disable-next-line no-unreachable
                result.push(typeBox[type](f, typeSection));
                break;
            case 2:
                // eslint-disable-next-line no-unreachable
                result.push(typeBox[type](f, featureInfo, Anexo));
                break;

            case 3:
                result.push(typeBox[type](f, featureInfo));
                break;
            default:
                // eslint-disable-next-line no-console
                console.log('to discard');
                break;
        }

        return result;
    }, []);
    return [removeEmptyItems(ArticlesbyBox)];
    // return [ArticlesbyBox]; //[removeEmptyItems(ArticlesbyBox)];
};

export default index;
