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
    const arrayFormated = objectArray.map(obj => {
        return (obj && obj.name) || '';
    });
    return arrayFormated[0] === '' ? undefined : arrayFormated;
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
            title &&
                arraysMerged.push({
                    '@type': 'Book',
                    name: title,
                    ...(publisher && { author: publisher }),
                    bookFormat: 'https://schema.org/Paperback'
                });
        });
    podcasts.length > 0 &&
        podcasts.forEach((podcast = {}) => {
            const {
                download_url: donwloadUrl = '',
                name = '',
                url = ''
            } = podcast;
            name &&
                arraysMerged.push({
                    '@type': 'PodcastSeries',
                    name,
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
