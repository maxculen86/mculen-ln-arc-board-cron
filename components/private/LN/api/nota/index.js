import get from 'lodash.get';
import Section from './sectionArticle';
import Apertura from './aperturaArticle';
import Cuerpo from './cuerpo';

const indexNota = dataNota => {
    const {
        _id: id,
        subtype,
        website_url: url,
        publish_date: fechaActualizacion,
        first_publish_date: fecha,
        taxonomy: { primary_section: primarySection }
    } = dataNota;
    const entradaId = get(dataNota, 'label.livefyre_entrada_id.text', id);

    return {
        id,
        subtype,
        url,
        abiertoComentarios: dataNota.comments
            ? dataNota.comments.allow_comments
            : true,
        entradaId,
        fechaActualizacion,
        fecha,
        categoria: primarySection ? Section(primarySection) : undefined,
        apertura: Apertura(dataNota),
        contenido: Cuerpo(dataNota)
    };
};

export default indexNota;
