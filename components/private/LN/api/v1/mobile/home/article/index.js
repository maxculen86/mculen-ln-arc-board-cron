import get from '../../../../../../common/utils/get';
import { CardRegular } from './cardRegular';
import { CardLiveblog } from './cardLiveblog';
import { CardAuthor } from './cardAuthor';
import { CardOpinion } from './cardOpinion';

const articleComponents = {
    regular: CardRegular,
    liveblog: CardLiveblog,
    author: CardAuthor,
    opinion: CardOpinion,
    liveblogEnVivo: CardRegular
};

export const Article = article => {
    const tipo =
        get(article, 'additionalProperties.variant', 'regular') || 'regular';

    const Component = articleComponents[tipo];
    return {
        design: {
            ...get(article, 'additionalProperties.diseno', null),
            typeCard: tipo
        },
        ...Component(article)
    };
};
export default Article;
