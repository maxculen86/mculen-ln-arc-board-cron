import get from 'lodash.get';
import Section from './sectionArticle';
import Apertura from './apertura/aperturaArticle';
import Cuerpo from './cuerpo';
import ModificadorTemplate from './modificadorTemplate';
import Relacionados from './relacionados';
import dateAndTimeUtil from '../../../../common/utils/dateAndTimeUtil';

const indexNota = dataNota => {
    const {
        _id: id,
        subtype: template,
        website_url: url,
        taxonomy: { primary_section: primarySection }
    } = dataNota;

    const comentariosId = get(dataNota, 'label.livefyre_entrada_id.text');
    const paywallStatus = get(dataNota, 'content_restrictions.content_code');
    const edicion = get(dataNota, 'label.edicion.text');
    const showBanners = get(dataNota, 'label.mostrar_banners.display');
    const { date, time } = dateAndTimeUtil(dataNota.first_publish_date);
    const { date: publishDate, time: updateTime } = dateAndTimeUtil(
        dataNota.publish_date
    );
    const impresa =
        typeof edicion !== 'undefined' && edicion.toLowerCase() === 'impresa'
            ? true
            : false;

    const resp = {
        id,
        template,
        url,
        mostrarBanners: typeof showBanners !== 'undefined' ? showBanners : true,
        paywallStatus: paywallStatus ? paywallStatus : 'comun',
        abiertoComentarios: dataNota.comments
            ? dataNota.comments.display_comments
            : false,
        comentariosId: comentariosId || id,
        categoria: primarySection && Section(primarySection),
        relacionados: Relacionados(dataNota),
        enviarApps: true
    };

    if (dataNota.subtype === '9') {
        resp.HTML = Cuerpo(dataNota);
    } else {
        resp.fechaActualizacion = `${date}${!impresa ? ` • ${time}` : ''}`;
        resp.fecha = `${publishDate}${!impresa ? ` • ${updateTime}` : ''}`;
        resp.contenido = Cuerpo(dataNota);
        resp.apertura = Apertura(dataNota);
    }

    const modificadorTemplate = ModificadorTemplate(dataNota);
    if (modificadorTemplate) resp.modificadorTemplate = modificadorTemplate;

    const enviarApps = get(dataNota, 'label.enviar_a_apps');
    if (
        !enviarApps ||
        !enviarApps.text ||
        enviarApps.text.toLowerCase() == 'no'
    )
        resp.enviarApps = false;

    return resp;
};

export default indexNota;
