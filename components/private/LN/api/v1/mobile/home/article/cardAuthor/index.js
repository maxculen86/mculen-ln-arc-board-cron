import { CardBasic } from '../../../../../common/article/cardBasic/index';

export const CardAuthor = article => {
    const cardBasic = CardBasic(article);

    return { ...cardBasic, opinion: true };
};

export default CardAuthor;
