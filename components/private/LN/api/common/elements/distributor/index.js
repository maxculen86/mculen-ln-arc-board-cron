import formatDistributorName from '../../../../common/utils/formatDistributorName';

export const DISTRIBUTOR_LN = 'LA NACION';

const getDistributor = (article) => {
    if (!article) {
        return undefined;
    }
    const { distributor, authors } = article;
    if (!distributor) {
        return undefined;
    }
    const { name, category } = distributor;
    if (name === DISTRIBUTOR_LN) {
        return {
            name,
            url: 'https://www.lanacion.com.ar/'
        };
    }
    const authorType = authors?.[0]?.additional_properties?.original?.author_type;
    const isGuestAuthor = authorType !== 'Estándar';
    if (isGuestAuthor && category === 'other') {
        return {
            name,
            url: `/distributor/${formatDistributorName(name)}/`,
        };
    }
    return undefined;
};

export default getDistributor;
