import { CardBasic } from '../../../../../common/article/cardBasic/index';
import { CardRegular } from '../cardRegular';

export const CardAuthor = article => {
    if (CardBasic(article).autores.length > 2) {
        return CardRegular(article);
    }
    return CardBasic(article);
};

export default CardAuthor;
