import get from '../../../../../../common/utils/get';
import { CardRegular } from '../../../../v1/mobile/home/article/cardRegular';
import { CardLiveblog } from '../../../../v1/mobile/home/article/cardLiveblog';
import { CardAuthor } from '../../../../v1/mobile/home/article/cardAuthor';
import { CardOpinion } from '../../../../v1/mobile/home/article/cardOpinion';
import { getDesign } from '../../../../v1/mobile/home/article/elements/design/index';

const articleComponents = {
    regular: CardRegular,
    liveblog: CardLiveblog,
    author: CardAuthor,
    opinion: CardOpinion,
    liveblogEnVivo: CardRegular
};

export const Article = article => {
    const newArticle = article;
    const tipo =
        get(newArticle, 'additionalProperties.variant', 'regular') || 'regular';
    const outputType = get(newArticle, 'additionalProperties.outputType', null);
    const Component = articleComponents[tipo];

    newArticle.additionalProperties = {
        ...(get(newArticle, 'additionalProperties', {}) || {}),
        diseno: getDesign(article)
    };
    const result = {
        design: {
            ...get(newArticle, 'additionalProperties.diseno', null),
            typeCard: tipo
        },
        outputType,
        ...Component(newArticle)
    };

    delete result.chapita;
    return result;
};
export default Article;
