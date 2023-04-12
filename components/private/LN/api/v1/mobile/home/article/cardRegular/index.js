import get from '../../../../../../../common/utils/get';
import { getPrincipalCategory } from '../../../../../common/elements/category';
import { getBadgebyConfig } from '../elements/chapita/index';
import { cardRegular as Article } from '../../../../../common/article/cardRegular/index';

export const CardRegular = article => {
    const primarySection = get(article, 'taxonomy.primary_section');
    return {
        categoria: primarySection && getPrincipalCategory(primarySection),
        ...Article(article),
        ...getBadgebyConfig(article),
        opinion: false
    };
};

export default CardRegular;
