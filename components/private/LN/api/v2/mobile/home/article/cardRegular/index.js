import get from '../../../../../../../common/utils/get';
import { getPrincipalCategory } from '../../../../../common/elements/category';
import { cardRegular as Article } from '../../../../../common/article/cardRegular/index';
import { getArticleTitleVivo } from '../elements/title/index';

export const CardRegular = article => {
    const primarySection = get(article, 'taxonomy.primary_section');
    return {
        liveTitle: getArticleTitleVivo(article),
        categoria: primarySection && getPrincipalCategory(primarySection),
        ...Article(article)
    };
};

export default CardRegular;
