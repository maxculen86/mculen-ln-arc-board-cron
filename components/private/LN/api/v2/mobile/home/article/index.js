import get from '../../../../../../common/utils/get';
import { CardRegular } from './cardRegular';
import { CardLiveblog } from './cardLiveblog';
import { CardAuthor } from './cardAuthor';

const articleComponents = {
    regular: CardRegular,
    liveblog: CardLiveblog,
    author: CardAuthor,
    liveblogEnVivo: CardRegular
};

export const Article = (article, informationBox) => {
    const tipo = get(article, 'additionalProperties.variant', 'regular');
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
