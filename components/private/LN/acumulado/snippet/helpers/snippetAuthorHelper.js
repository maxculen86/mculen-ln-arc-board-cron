import { SITE_LANACION } from 'fusion:environment';

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
    const arrayFormated = objectArray.map(obj => (obj && obj.name) || '');
    return arrayFormated[0] === '' ? undefined : arrayFormated;
};

export const extractAffilations = (affilations = '') => {
    if (affilations === '') return undefined;
    const affis = affilations.split(',');

    const affilationsMapped = affis.map(elem => ({
        '@type': 'NewsMediaOrganization',
        name: elem.trim()
    }));
    affilationsMapped.push({
        '@type': 'NewsMediaOrganization',
        name: 'La Nación',
        url: SITE_LANACION
    });

    return formatForOneElementArray(affilationsMapped);
};

export const getBooksAndPodcasts = (books = [], podcasts = []) => {
    const arraysMerged = [];

    if (books.length > 0) {
        books.forEach((book = {}) => {
            const { title = '', publisher = '' } = book;
            if (title) {
                arraysMerged.push({
                    '@type': 'Book',
                    name: title,
                    ...(publisher && { author: publisher }),
                    bookFormat: 'https://schema.org/Paperback'
                });
            }
        });
    }

    if (podcasts.length > 0) {
        podcasts.forEach((podcast = {}) => {
            const {
                download_url: donwloadUrl = '',
                name = '',
                url = ''
            } = podcast;
            if (name) {
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
            }
        });
    }

    return arraysMerged.length === 0 ? undefined : arraysMerged;
};

export const authorBasicInfo = (
    byline,
    location,
    bioPage,
    url,
    longBio,
    bio
) => ({
    ...(byline && { name: byline }),
    ...(location && { birthPlace: location }),
    ...(bioPage && { url: `${SITE_LANACION}${bioPage}` }),
    ...(url && { image: url }),
    ...(longBio && { description: longBio }),
    ...(bio && { disambiguatingDescription: bio })
});
