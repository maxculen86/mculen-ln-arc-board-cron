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
    const { date: publishDate, time:updateTime } = dateAndTimeUtil(dataNota.publish_date);
    const impresa = typeof edicion !== 'undefined' && edicion.toLowerCase() === 'impresa' ? true: false;

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
        fechaActualizacion: `${date}${!impresa ? ` • ${time}` : ''}`,
        fecha: `${publishDate}${!impresa ? ` • ${updateTime}` : ''}`,
        categoria: primarySection && Section(primarySection),
        apertura: Apertura(dataNota),
        contenido: Cuerpo(dataNota),
        relacionados: Relacionados(dataNota)
    };

    const modificadorTemplate = ModificadorTemplate(dataNota);

    if (modificadorTemplate) resp.modificadorTemplate = modificadorTemplate;

    return resp;
};

export default indexNota;
