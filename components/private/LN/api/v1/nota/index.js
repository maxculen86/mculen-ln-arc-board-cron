import get from 'lodash.get';
import Section from './sectionArticle';
import Apertura from './apertura/aperturaArticle';
import Cuerpo from './cuerpo';
import ModificadorTemplate from './modificadorTemplate';
import Relacionados from './relacionados';

import { dateAndTimeForAppsUtil } from '../../../../common/utils/dateAndTimeUtil';

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

    const resp = {
        id,
        template,
        url,
        impresa: !!(edicion && edicion.toLowerCase() === 'impresa'),
        paywallStatus: paywallStatus ? paywallStatus : 'comun',
        abiertoComentarios: dataNota.comments
            ? dataNota.comments.display_comments
            : false,
        comentariosId: comentariosId || id,
        fechaActualizacion: dateAndTimeForAppsUtil(dataNota.publish_date),
        fecha: dateAndTimeForAppsUtil(dataNota.first_publish_date),
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
