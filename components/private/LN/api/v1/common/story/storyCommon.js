import get from '../../../../../common/utils/get';
import matchObject from '../utils/matchObject';
import Apertura from './apertura/aperturaArticle';
import ModificadorTemplate from './modificadorTemplate';
import Relacionados from './relacionados';
import Metadata from './metadata';
import dateAndTimeUtil from '../../../../../common/utils/dateAndTimeUtil';
import { getPrincipalCategory } from '../category';
import { openComments } from './comments';

const getPaywallStatus = dataNota => {
    const paywallStatus = get(
        dataNota,
        'content_restrictions.content_code',
        null
    );

    if (!paywallStatus || paywallStatus === 'cerrada') return 'comun';

    return paywallStatus;
};

export const storyHeadline = (dataNota, type) => {
    if (dataNota.subtype === '9' && type === 'global') return null;

    if (!dataNota) throw new Error(`La información de la nota esta vacia`);
    const { publish_date: publishDate, display_date: displayDate } = dataNota;

    const { date: formatPublishDate, time: formatUpdateTime } = dateAndTimeUtil(
        publishDate
    );

    const edition = get(dataNota, 'label.edicion.text', null);
    const isPrintEdition = edition && edition.toLowerCase() === 'impresa';

    const {
        date: formatDislplayDate,
        time: formatDislplayTime
    } = dateAndTimeUtil(displayDate);

    return {
        fechaActualizacion: `${formatDislplayDate}${
            !isPrintEdition ? ` • ${formatDislplayTime}` : ''
        }`,
        fecha: `${formatPublishDate}${
            !isPrintEdition ? ` • ${formatUpdateTime}` : ''
        }`,
        apertura: Apertura(dataNota)
    };
};

export const storyCommon = (dataNota, cuerpo) => {
    if (!dataNota) throw new Error(`La información de la nota esta vacia`);
    const {
        _id: id,
        subtype: template,
        website_url: url,
        taxonomy: { primary_section: primarySection }
    } = dataNota;

    const showBanners = get(dataNota, 'label.mostrar_banners.text', null);

    const sentToApps = get(dataNota, 'label.enviar_a_apps.text', null);
    const enviarApps =
        matchObject(dataNota, 'contains') === false
            ? matchObject(dataNota, 'contains')
            : !(sentToApps && sentToApps.toLowerCase() === 'no');

    const distributor = get(dataNota, 'distributor', null);

    const trust = get(dataNota, 'label.trust.text', null);
    let isTrust;
    if (trust) {
        isTrust = /nomostrartrust/.test(
            trust
                .toLowerCase()
                .replace(/ /g, '')
                .trim()
        );
    }

    const allowComments = get(dataNota, 'comments.allow_comments', null);

    const resp = {
        id,
        template: template === '6' || template === '5' ? '1' : template,
        url,
        mostrarBanners: !(showBanners && showBanners.toLowerCase() === 'no'),
        paywallStatus: getPaywallStatus(dataNota),
        comentarios: {
            abiertoComentarios: openComments(dataNota),
            permitirComentarios: allowComments
        },
        categoria: primarySection && getPrincipalCategory(primarySection),
        relacionados: Relacionados(dataNota),
        enviarApps,
        modificadorTemplate: ModificadorTemplate(distributor),
        trust: !isTrust,
        metadata: Metadata(dataNota)
    };

    if (dataNota.subtype === '9') resp.HTML = cuerpo(dataNota);
    else resp.contenido = cuerpo(dataNota);

    return resp;
};
