import get from '../../../../../common/utils/get';
import Image from '../../../common/elements/image';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';
import { Article } from './article/index';
import { cardAnexoHtmlOrUrl as Anexo } from '../../../common/article/cardAnexo/index';
import getEmbedHref from '../../../../../common/utils/getEmbedHref';
import { storyBox } from '../../../common/home/boxTypes/storyBox';
import { anticipoBox } from '../../../common/home/boxTypes/anticipoBox';
import { anexoMobileBox } from '../../../common/home/boxTypes/anexoMobileBox';
import { bannerBox } from '../../../common/home/boxTypes/bannerBox';
import { sectionAcuBox } from '../../../common/home/boxTypes/sectionAcumuladoBox';
import configTypeSection from './config/getTypeSection';

const featureInformation = (information, section, typeSection) => {
    if (!information) return null;
    const type = typeSection[section] || typeSection.default;
    const res = {
        ...type,
        diagramacion: information.layout || null
    };
    if (section === 'Anticipo') {
        res.chapita = information.textBadge;
        res.volanta = information.lead;
        res.url = information.url;
        if (information.video === '') {
            res.texto = information.title;
        }
        res.video = getEmbedHref('src', information.video);
    }

    if (!information.hideTitle && section !== 'Apertura') {
        const image = get(information.image, 'promo_items.basic', null);
        const imagenUrl = get(image, 'additional_properties.originalUrl', null);
        let accionBoton = null;

        if (image && image.type === 'image') res.imagen = Image(image);
        if (imagenUrl) res.imagenUrl = imagenUrl;
        if (information.botomText && information.botomLink)
            res.imagenUrl = imagenUrl;

        if (information.botomText && information.botomLink) {
            accionBoton = {
                titulo: information.botomText,
                url: information.botomLink,
                estilo: information.botomStyle
            };
        }

        return {
            ...res,
            tituloCaja: information.title,
            url: information.url,
            chapita: information.chapita,
            chapitaStyle: information.chapitaStyle,
            accionBoton
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
    const typeSection = configTypeSection();

    const ArticlesbyBox = children.reduce((result, f, i) => {
        const { information, sectionAliasMobile } = f;

        const featureInfo = featureInformation(
            information,
            sectionAliasMobile,
            typeSection
        );
        switch (Number(f.type)) {
            case 0:
                // eslint-disable-next-line no-unreachable
                result.push(
                    typeBox[f.type](f, featureInfo, Article, paramsFromPage)
                );
                break;
            case 1:
                // eslint-disable-next-line no-unreachable
                result.push(typeBox[f.type](f, typeSection));

                break;
            case 2:
                // eslint-disable-next-line no-unreachable
                result.push(typeBox[f.type](f, featureInfo, Anexo));
                break;
            case 3:
                // eslint-disable-next-line no-console
                result.push(typeBox[f.type](f, featureInfo));
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
