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
    const tipo =
        get(article, 'additionalProperties.variant', 'regular') || 'regular';

    const Component = articleComponents[tipo];
    return {
        design: {
            ...getDesign(article),
            typeCard: tipo
        },
        ...Component(article)
    };
};
export default Article;
