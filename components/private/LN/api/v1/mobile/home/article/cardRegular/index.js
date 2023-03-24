import get from '../../../../../../../common/utils/get';
import { getPrincipalCategory } from '../../../../../common/elements/category';
import { getArticleChapitaStyle } from '../elements/chapita/index';
import { cardRegular as Article } from '../../../../../common/article/cardRegular/index';

export const CardRegular = article => {
    const primarySection = get(article, 'taxonomy.primary_section');
    return {
        badgeStyle: getArticleChapitaStyle(article),
        categoria: primarySection && getPrincipalCategory(primarySection),
        ...Article(article)
    };
};

export default CardRegular;
