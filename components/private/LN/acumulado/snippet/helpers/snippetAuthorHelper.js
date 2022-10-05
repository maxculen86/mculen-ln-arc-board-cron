export const stringToArray = (string = '') => {
    if (string === '') return undefined;
    const array = string.split(',');

    return array.map(elem => elem.trim());
};

export const formatForOneElementArray = (array = []) => {
    if (array.length === 0) return undefined;
    return array.length === 1 ? array.pop() : array;
};

export const formatForObjectArray = (objectArray = []) => {
    if (objectArray.length === 0) return undefined;
    return objectArray.map(obj => {
        return (obj && obj.name) || '';
    });
};

export const extractAffilations = (affilations = '') => {
    if (affilations === '') return undefined;
    const affis = affilations.split(',');

    const affilationsMapped = affis.map(elem => {
        return {
            '@type': 'NewsMediaOrganization',
            name: elem.trim()
        };
    });
    affilationsMapped.push({
        '@type': 'NewsMediaOrganization',
        name: 'La Nación',
        url: 'https: //www.lanacion.com.ar'
    });

    return formatForOneElementArray(affilationsMapped);
};

export const getBooksAndPodcasts = (books = [], podcasts = []) => {
    const arraysMerged = [];

    books.length > 0 &&
        books.forEach((book = {}) => {
            const { title = '', publisher = '' } = book;
            arraysMerged.push({
                '@type': 'Book',
                ...(title && { name: title }),
                ...(publisher && { author: publisher }),
                format: 'https://schema.org/Paperback'
            });
        });
    podcasts.length > 0 &&
        podcasts.forEach((podcast = {}) => {
            const {
                download_url: donwloadUrl = '',
                name = '',
                url = ''
            } = podcast;
            arraysMerged.push({
                '@type': 'PodcastSeries',
                ...(name && { name }),
                ...(url && { url }),
                ...(donwloadUrl && {
                    associatedMedia: {
                        '@type': 'MediaObject',
                        contentUrl: donwloadUrl
                    }
                })
            });
        });

    return arraysMerged.length === 0 ? undefined : arraysMerged;
};
