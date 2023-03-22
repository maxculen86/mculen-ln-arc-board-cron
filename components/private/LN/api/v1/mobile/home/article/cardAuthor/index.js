import { CardBasic } from '../../../../../common/article/cardBasic/index';
import { CardRegular } from '../cardRegular';

export const CardAuthor = article => {
    const cardBasic = CardBasic(article);
    if (cardBasic && cardBasic.autores && cardBasic.autores.length > 2) {
        return CardRegular(article);
    }
    return cardBasic;
};

export default CardAuthor;
