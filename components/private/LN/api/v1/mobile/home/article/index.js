import get from '../../../../../../common/utils/get';
import { CardRegular } from './cardRegular';
import { CardLiveblog } from './cardLiveblog';
import { CardAuthor } from './cardAuthor';
import { CardOpinion } from './cardOpinion';
import { getDesign } from './elements/design/index';

const articleComponents = {
    regular: CardRegular,
    liveblog: CardLiveblog,
    author: CardAuthor,
    opinion: CardOpinion,
    liveblogEnVivo: CardRegular
};

// TODO: Analizar si en este paso es mejor colocar las propiedades del design segun el archivo de configuracion: /layouts/config/api-diagramations/LN10-Home_Main.json
export const Article = article => {
    const newArticle = article;
    const tipo =
        get(newArticle, 'additionalProperties.variant', 'regular') || 'regular';

    const Component = articleComponents[tipo];

    newArticle.additionalProperties = {
        ...(get(newArticle, 'additionalProperties', {}) || {}),
        diseno: getDesign(article)
    };
    return {
        design: {
            ...get(newArticle, 'additionalProperties.diseno', null),
            typeCard: tipo
        },
        ...Component(newArticle)
    };
};
export default Article;
