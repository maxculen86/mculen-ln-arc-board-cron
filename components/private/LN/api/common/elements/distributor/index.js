import isGuestAuthor from '../../../../../common/utils/isGuestAuthor';
import formatDistributorName from '../../../../common/utils/formatDistributorName';

const DISTRIBUTOR_LN = 'LA NACION';
const getDistributor = (article, isHome = true) => {
    if (!article) {
        return undefined;
    }
    const { distributor } = article;

    if (!distributor) {
        return undefined;
    }

    const { name, category, subcategory = undefined } = distributor;
    if (name === DISTRIBUTOR_LN) {
        return {
            name,
            url: 'https://www.lanacion.com.ar/'
        };
    }

    const isGuest = isGuestAuthor(article);

    if ((isGuest || !isHome) && category === 'other') {
        return {
            name,
            url: `/distributor/${formatDistributorName(name)}/`,
            subcategory
        };
    }
    return undefined;
};

export default getDistributor;
