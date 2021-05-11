import get from 'lodash.get';
import Image from '../common/image';
import { authorHomeMobile } from '../common/author';
import { getTag, getFeaturedTag } from '../common/tag';
import { getPrincipalCategory } from '../common/category';
import { removeEmptyItems } from '../common/utils/responseCleaner';
import { getTagId } from '../../../../common/utils/getElementId';

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
    const sections = get(article, 'taxonomy.sections', null);
    const tags = get(article, 'taxonomy.tags', null);
    const bajada = get(article, 'subheadlines.basic', null);
    const volanta = get(label, 'volanta.text', null);
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
        //tituloMobile,
        volanta,
        bajada,
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

    /*     if (primarySection) {
        resp.tagProducto = getPrincipalCategory(primarySection);
    } */
    if (sections && sections.length > 0) {
        sections.map(v => {
            if (v._id.includes('ln') || v._id.includes('revista')) {
                const tagProducto = {
                    id: getTagId(v._id),
                    valor: v.name,
                    tipoId: 7,
                    formatoId: 1,
                    tipoDescripcion: 'Producto'
                };
                resp.tagProducto = tagProducto;
                return tagProducto;
            }
        });
    }
    /*    if (tags && tags.length > 0) {
        // Teporal hasta verificar el tag tipo producto
        const tagProducto = {
            id: getTagId(tags[0].slug),
            valor: tags[0].text,
            tipoId: 7,
            formatoId: 1,
            tipoDescripcion: 'Producto'
        };
        resp.tagProducto = tagProducto; //getTag(tags[0]);
    } */
    return resp;
    //return removeEmptyItems(resp);
};

export default articleItem;
