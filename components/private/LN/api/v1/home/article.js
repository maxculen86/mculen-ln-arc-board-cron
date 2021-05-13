import get from 'lodash.get';
import Image from '../common/image';
import { authorHomeMobile } from '../common/author';
import { getTag, getFeaturedTag } from '../common/tag';
import { getPrincipalCategory } from '../common/category';
import { removeEmptyItems } from '../common/utils/responseCleaner';
import { getTagId } from '../../../../common/utils/getElementId';
import Relacionados from '../../../api/v1/nota/relacionados';

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
    const chapita = get(label, 'chapita.text', null);

    const resp = {
        id,
        templateId,
        sitioId: null, // pendiente Enumeracion
        //tipo: null, // no va
        //externo: null, // no va
        url,
        //mostrarEtiqueta  //Se reemplaza por el campo chapita
        //exclusivo: null, // no va
        titulo: titulo || tituloMobile,
        volanta,
        bajada,
        chapita
        //marquesina: null,
        //imagen: null,
        //autor: null,
        //encuentro: //Pendiente
        //tagProducto: // se reemplaza por campos categorias y chapita // Representa notas donde la seccion o tag son LN+ o Revistas,
        //tagDestacado: // se reemplaza por campos categorias y chapita // Representa notas contenLab y Patrocinado
        //tableroDolar: //Pendiente
    };

    if (image && image.type === 'image') {
        resp.imagen = Image(image);
    }

    if (authors && authors.length > 0) {
        const authorsFixed = authors.filter(v => v.type === 'author');
        if (authorsFixed.length > 0) {
            resp.autor = authorHomeMobile(authorsFixed[0]);
            resp.marquesina = `Por ${resp.autor.valor}`;
        }
    }

    const relacionados = Relacionados(article);
    if (relacionados.categorias && relacionados.categorias.length > 0) {
        // return relacionados.categorias.map(v => {
        //     return type(v);
        // });
        resp.categorias = [
            getPrincipalCategory(primarySection),
            ...relacionados.categorias
        ];
    }

    //return resp;
    return removeEmptyItems(resp);
};

export default articleItem;
