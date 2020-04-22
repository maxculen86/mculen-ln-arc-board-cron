import get from 'lodash.get';
import Section from './sectionArticle';
import Apertura from './aperturaArticle';
import Cuerpo from './cuerpo';

import { dateAndTimeForAppsUtil } from '../../../../common/utils/dateAndTimeUtil';

const indexNota = dataNota => {
    const {
        _id: id,
        subtype: template,
        website_url: url,
        taxonomy: { primary_section: primarySection }
    } = dataNota;

    const entradaId = get(dataNota, 'label.livefyre_entrada_id.text', id);

    const resp = {
        id,
        template,
        url,
        abiertoComentarios: dataNota.comments
            ? dataNota.comments.allow_comments
            : true,
        entradaId,
        fechaActualizacion: dateAndTimeForAppsUtil(dataNota.publish_date),
        fecha: dateAndTimeForAppsUtil(dataNota.first_publish_date),
        categoria: primarySection && Section(primarySection),
        apertura: Apertura(dataNota),
        contenido: Cuerpo(dataNota)
    };

    return resp;
};

export default indexNota;
