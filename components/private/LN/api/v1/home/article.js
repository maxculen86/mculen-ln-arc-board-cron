import get from 'lodash.get';
import Image from '../common/image';
import { authorHomeMobile } from '../common/author';
import { getTag } from '../common/tag';
import { getPrincipalCategory } from '../common/category';
import { removeEmptyItems } from '../common/utils/responseCleaner';

const articleItem = (article, diagramacion) => {
    const {
        _id: id,
        subtype: templateId,
        headlines: { basic: titulo, mobile: tituloMobile },
        website_url: url,
        label
    } = article;

    if (!titulo) {
        throw new Error('Titulo de la nota es null o undefined');
    }

    const authors = get(article, 'credits.by', null);
    const image = get(article, 'promo_items.basic', null);
    const primarySection = get(article, 'taxonomy.primary_section', null);
    //const tags = get(article, 'taxonomy.tags', null);
    const bajada = get(article, 'subheadlines.basic', null);
    const volanta = get(label, 'volanta.text', '');
    //bajada
    const resp = {
        id,
        templateId,
        sitioId: null,
        tipo: null,
        //externo: null, // no va
        url,
        exclusivo: null,
        titulo: titulo || tituloMobile,
        tituloMobile,
        volanta,
        marquesina: null,
        imagen: null,
        autor: null,
        tagProducto: null
    };

    if (image && image.type === 'image') {
        resp.imagen = Image(image);
    }

    if (authors && authors.length > 0) {
        const authorsFixed = authors.filter(v => v.type === 'author');
        if (authorsFixed.length > 0) {
            resp.autor = authorHomeMobile(authorsFixed[0]);
            resp.marquesina = `Por ${resp.autor.valor}`;
            /*             resp.autor = authorsFixed.map(v => {
                return Author(v);
            }); */
        }
    }

    if (primarySection) {
        resp.tagProducto = getPrincipalCategory(primarySection);
    }
    /* 
    if (tags && tags.length > 0) {
        resp.tagProducto = tags.map(v => {
            return getTag(v);
        });
    } */
    return resp;
    //return removeEmptyItems(resp);
};

export default articleItem;
