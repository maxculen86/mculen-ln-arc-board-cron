import get from 'lodash.get';
import Image from '../common/image';
import { authorHomeMobile } from '../common/author';
import { removeEmptyItems } from '../common/utils/responseCleaner';
import Relacionados from '../nota/relacionados';

const articleItem = article => {
    const id = get(article, '_id', null);
    const {
        subtype: templateId,
        headlines: { basic: titulo, mobile: tituloMobile },
        website_url: url,
        label
    } = article;

    if (!titulo) {
        throw new Error('Titulo de la nota es null o undefined');
    }

    const sitioId = get(article, 'configurations.arcSite', null);
    const authors = get(article, 'credits.by', null);
    const image = get(article, 'promo_items.basic', null);
    const bajada = get(article, 'subheadlines.basic', null);
    const volanta = get(label, 'volanta.text', null);
    const chapita = get(label, 'chapita.text', null);
    const seccionPadre = get(article, 'seccionPadre', null);

    const resp = {
        id,
        templateId,
        sitioId,
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
    if (seccionPadre && seccionPadre > 0) {
        resp.seccionPadre = seccionPadre;
    }
    return removeEmptyItems(resp);
};

export default articleItem;
