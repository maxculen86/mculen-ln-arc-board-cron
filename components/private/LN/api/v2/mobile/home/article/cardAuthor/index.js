import { cardRegular as Article } from '../../../../../common/article/cardRegular/index';

export const CardAuthor = article => {
    return {
        ...Article(article)
    };
};

export default CardAuthor;
