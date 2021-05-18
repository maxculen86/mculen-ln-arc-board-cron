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
        subtype: templateId,
        headlines: { basic: titulo, mobile: tituloMobile },
        website_url: url,
        label
    } = article;

    if (!titulo) {
        throw new Error('Titulo de la nota es null o undefined');
    }

    const id = get(article, '_id', null);
    const authors = get(article, 'credits.by', null);
    const image = get(article, 'promo_items.basic', null);
    const bajada = get(article, 'subheadlines.basic', null);
    const volanta = get(label, 'volanta.text', null);
    const chapita = get(label, 'chapita.text', null);

    const resp = {
        id,
        templateId,
        sitioId: null, // pendiente Enumeracion
        url,
        titulo: titulo || tituloMobile,
        volanta,
        bajada,
        chapita
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
        resp.categorias = relacionados.categorias;
    }

    return removeEmptyItems(resp);
};

export default articleItem;
