import { CardBasic } from '../../../../../common/article/cardBasic/index';

export const CardOpinion = article => {
    return { ...CardBasic(article), opinion: false };
};

export default CardOpinion;
