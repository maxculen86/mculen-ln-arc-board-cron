import get from 'lodash.get';
import Section from './sectionArticle';
import Apertura from './aperturaArticle';

const indexNota = dataNota => {
    const {
        _id: id,
        subtype,
        website_url: url,
        publish_date: publishDate,
        first_publish_date: firstPublishDate,
        taxonomy: { primary_section: primarySection }
    } = dataNota;
    const entradaId = get(dataNota, 'label.livefyre_entrada_id.text', id);

    return {
        id,
        subtype,
        url,
        comments: dataNota.comments ? dataNota.comments.allow_comments : true,
        entradaId,
        publishDate,
        firstPublishDate,
        pimarySection: primarySection ? Section(primarySection) : undefined,
        apertura: Apertura(dataNota)
    };
};

export default indexNota;
