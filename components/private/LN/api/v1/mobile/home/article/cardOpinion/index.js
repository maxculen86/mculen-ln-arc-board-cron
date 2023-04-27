import { CardBasic } from '../../../../../common/article/cardBasic/index';
import { getArticleImage } from '../../../../../common/article/elements/image/index';

export const CardOpinion = article => {
    const opinion = { ...CardBasic(article), opinion: false };

    opinion.imagen = getArticleImage(article);

    return opinion;
};

export default CardOpinion;
