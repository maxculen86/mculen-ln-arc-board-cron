import { CardBasic } from '../../../../../common/article/cardBasic/index';
import { CardRegular } from '../cardRegular';

const CardAuthor = article => {
    const { autores } = CardBasic(article);
    if (autores.length > 2) {
        return CardRegular(article);
    }
    return CardBasic(article);
};

export default CardAuthor;
