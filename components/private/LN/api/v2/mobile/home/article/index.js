import get from '../../../../../../common/utils/get';
import { CardRegular } from './cardRegular';
import { CardLiveblog } from './cardLiveblog';
import { CardAuthor } from './cardAuthor';

const articleComponents = {
    regular: CardRegular,
    liveblog: CardLiveblog,
    author: CardAuthor
};

export const Article = article => {
    const tipo = get(article, 'additionalProperties.variant', 'regular');
    const Component = articleComponents[tipo];
    return {
        diseno: {
            ...get(article, 'additionalProperties.diseno', null),
            tipo: get(article, 'additionalProperties.variant', null)
        },
        ...Component(article)
    };
};
export default Article;
