import get from 'lodash.get';
import Apertura from './apertura/aperturaArticle';
import Cuerpo from './cuerpo';
import ModificadorTemplate from './modificadorTemplate';
import Relacionados from './relacionados';
import dateAndTimeUtil from '../../../../common/utils/dateAndTimeUtil';
import { getPrincipalCategory } from '../../common/category';
import { removeEmptyItems } from '../../common/utils/responseCleaner';
import matchObject from '../../common/utils/matchObject';

const displayComments = dataNota => {
    const optionDisplayComments = get(
        dataNota,
        'comments.display_comments',
        false
    );
    const generalCommentsConfig = get(
        dataNota,
        'navigationTreeSource.Termicas.livefyre',
        'false'
    );

    return generalCommentsConfig === 'true' && optionDisplayComments === true;
};

const openComments = dataNota => {
    const optionDisplayComments = get(
        dataNota,
        'comments.display_comments',
        false
    );
    const generalCommentsConfig = get(
        dataNota,
        'navigationTreeSource.Termicas.livefyre',
        'false'
    );
    const deadlineLivefyer = get(
        dataNota,
        'navigationTreeSource.migration.deadline_livefyre',
        ''
    );

    const firstPublishDate = get(dataNota, 'first_publish_date', '');
    const deadlineDate = deadlineLivefyer && new Date(deadlineLivefyer);
    const articlePublishDate = firstPublishDate && new Date(firstPublishDate);
    const validDate =
        deadlineDate &&
        articlePublishDate &&
        articlePublishDate >= deadlineDate.setHours(23, 0, 0, 0);

    return (
        validDate &&
        generalCommentsConfig === 'true' &&
        optionDisplayComments === true
    );
};
const indexNota = dataNota => {
    if (!dataNota) throw new Error(`La información de la nota esta vacia`);

    const {
        _id: id,
        subtype: template,
        website_url: url,
        taxonomy: { primary_section: primarySection },
        publish_date: publishDate,
        display_date: displayDate
    } = dataNota;

    const comentariosId = get(dataNota, 'label.livefyre_entrada_id.text', null);
    const allowComments = get(dataNota, 'comments.allow_comments', null);
    const paywallStatus = get(
        dataNota,
        'content_restrictions.content_code',
        null
    );
    const edition = get(dataNota, 'label.edicion.text', null);
    const showBanners = get(dataNota, 'label.mostrar_banners.text', null);

    const sentToApps = get(dataNota, 'label.enviar_a_apps.text', null);
    const enviarApps =
        matchObject(dataNota, 'contains') === false
            ? matchObject(dataNota, 'contains')
            : !(sentToApps && sentToApps.toLowerCase() === 'no');

    const isPrintEdition = edition && edition.toLowerCase() === 'impresa';
    const distributor = get(dataNota, 'distributor', null);
    const { date: formatPublishDate, time: formatUpdateTime } = dateAndTimeUtil(
        publishDate
    );

    const {
        date: formatDislplayDate,
        time: formatDislplayTime
    } = dateAndTimeUtil(displayDate);

    const resp = {
        id,
        template: template === '6' || template === '5' ? '1' : template,
        url,
        mostrarBanners: !(showBanners && showBanners.toLowerCase() === 'no'),
        paywallStatus: paywallStatus || 'comun',
        abiertoComentarios: displayComments(dataNota),
        comentarios: {
            abiertoComentarios: openComments(dataNota),
            permitirComentarios: allowComments
        },
        comentariosId: comentariosId || id,
        categoria: primarySection && getPrincipalCategory(primarySection),
        relacionados: Relacionados(dataNota),
        enviarApps,
        modificadorTemplate: ModificadorTemplate(distributor)
    };
    if (dataNota.subtype === '9') {
        resp.HTML = Cuerpo(dataNota);
    } else {
        resp.fechaActualizacion = `${formatDislplayDate}${
            !isPrintEdition ? ` • ${formatDislplayTime}` : ''
        }`;

        resp.fecha = `${formatPublishDate}${
            !isPrintEdition ? ` • ${formatUpdateTime}` : ''
        }`;

        resp.apertura = Apertura(dataNota);
        resp.contenido = Cuerpo(dataNota);
    }

    return removeEmptyItems(resp);
};

export default indexNota;
