import get from 'lodash.get';
import Section from './sectionArticle';
import Apertura from './aperturaArticle';
import Cuerpo from './cuerpo';
import Author from '../common/author';

const indexNota = dataNota => {
    const {
        _id: id,
        subtype,
        website_url: url,
        publish_date: fechaActualizacion,
        first_publish_date: fecha,
        taxonomy: { primary_section: primarySection },
        credits: { by: authors }
    } = dataNota;

    const entradaId = get(dataNota, 'label.livefyre_entrada_id.text', id);
    const autoresFixed = authors && authors.filter(a => a.type === 'author');

    const resp = {
        id,
        subtype,
        url,
        abiertoComentarios: dataNota.comments
            ? dataNota.comments.allow_comments
            : true,
        entradaId,
        fechaActualizacion,
        fecha,
        categoria: primarySection && Section(primarySection),
        apertura: Apertura(dataNota),
        contenido: Cuerpo(dataNota)
    };

    if (autoresFixed && autoresFixed.length > 0) {
        resp.autores = autoresFixed && autoresFixed.map(a => Author(a));
    }

    return resp;
};

export default indexNota;
