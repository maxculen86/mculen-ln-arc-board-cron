import {
    calcReadingMinutes,
    isExcludedSubtype
} from '../../../../../../features/LN-10-global/common/readingTime/_helpers';
import dateAndTimeUtil from '../../../../../common/utils/dateAndTimeUtil';
import get from '../../../../../common/utils/get';
import { getPrincipalCategory } from '../category';
import { getDomainCLL } from '../domain';
import getOpeningMode from '../label/openingMode';
import sentToApps from '../label/sentToApps';
import { openComments } from './comments';
import getIa from './ia';
import Metadata from './metadata';
import ModificadorTemplate from './modificadorTemplate';
import Relacionados from './relacionados';
import { getStoryTemplate } from './template';

export const getPaywallStatus = dataNota => {
    const paywallStatus = get(
        dataNota,
        'content_restrictions.content_code',
        null
    );

    if (!paywallStatus) return 'comun';

    return paywallStatus;
};

export const storyHeadline = (dataNota, type) => {
    if (dataNota.subtype === '9' && type === 'global') return null;

    if (!dataNota) throw new Error(`La información de la nota esta vacia`);
    const { first_publish_date: publishDate, display_date: displayDate } =
        dataNota;

    const { date: formatPublishDate, time: formatUpdateTime } =
        dateAndTimeUtil(publishDate);

    const edition = get(dataNota, 'label.edicion.text', null);
    const isPrintEdition = edition && edition.toLowerCase() === 'impresa';

    const { date: formatDislplayDate, time: formatDislplayTime } =
        dateAndTimeUtil(displayDate);

    const updateTimeText = !isPrintEdition ? ` • ${formatDislplayTime}` : '';
    const publishTimeText = !isPrintEdition ? ` • ${formatUpdateTime}` : '';

    return {
        fechaActualizacion: `${formatDislplayDate}${updateTimeText}`,
        fecha: `${formatPublishDate}${publishTimeText}`
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

    const enviarApps = sentToApps(dataNota);

    const openingMode = getOpeningMode(dataNota);

    const distributor = get(dataNota, 'distributor', null);

    const trust = get(dataNota, 'label.trust.text', null);
    let isTrust;
    if (trust) {
        isTrust = /nomostrartrust/.test(
            trust.toLowerCase().replace(/ /g, '').trim()
        );
    }

    const allowComments = get(dataNota, 'comments.allow_comments', null);

    const wordCount = get(
        dataNota,
        'planning.story_length.word_count_actual',
        ''
    );

    const readingMinutes = calcReadingMinutes(wordCount);

    const subtype = get(dataNota, 'subtype', '');

    const domain = getDomainCLL(dataNota);

    const resp = {
        id,
        template: getStoryTemplate(template) || template,
        url,
        readingTime:
            readingMinutes !== 0 && !isExcludedSubtype(subtype)
                ? `${readingMinutes}'`
                : null,
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
        metadata: Metadata(dataNota),
        ia: getIa(dataNota, subtype),
        openingMode,
        ...(domain && { domain })
    };

    switch (dataNota.subtype) {
        case '9':
            resp.HTML = cuerpo;
            break;
        case '16':
            break;
        default:
            resp.contenido = cuerpo;
            break;
    }

    return resp;
};
