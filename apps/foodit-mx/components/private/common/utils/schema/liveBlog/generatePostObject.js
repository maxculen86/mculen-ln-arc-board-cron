import getAuthorByline from '../../getAuthorByline';
import {
    differenceInMinutes,
    restMinutes,
    convertArgentinaTimeToGMT
} from '../../dateAndTimeUtil';
import get from '../../get';
import removeHtmlTags from '../../removeHtmlTags';
import isCustomLiveblog from '../../isCustomLiveblog';

const socialMediaNames = {
    twitter: 'X',
    instagram: 'Instagram',
    'facebook-video': 'Facebook'
};

const extracDataFromCredits = by => {
    let authors = [];

    if (by) {
        authors = by
            .filter(v => v.type === 'author')
            .map(author => getAuthorByline(author));
    }
    return { authors: authors.length ? authors : ['Redacción LA NACION'] };
};
export const createISODate = (date, time = '') => {
    const dateTime = time !== '' ? new Date(`${date} ${time}`) : new Date(date);

    if (Number.isNaN(dateTime.getTime())) {
        return '';
    }

    return dateTime.toISOString();
};

export const getPublishDate = (firstPublishedDate, displayDate) => {
    if (!firstPublishedDate) return displayDate;
    return new Date(displayDate) <= new Date(firstPublishedDate)
        ? displayDate
        : firstPublishedDate;
};

export const getModifiedDate = (lastUpdatedDate, displayDate) => {
    if (!lastUpdatedDate) return displayDate;
    return new Date(displayDate) >= new Date(lastUpdatedDate)
        ? displayDate
        : lastUpdatedDate;
};

const concatenateBullets = (bullets = []) =>
    bullets.map((bullet = {}) => {
        const { content = '' } = bullet;
        return content.replace('\n', '');
    });

const calculateDateModified = (
    lastUpdatedDate,
    minutes,
    totalElements,
    index
) => {
    if (index === 1) return new Date(lastUpdatedDate);

    const minutesToAdd = (minutes / totalElements) * index;

    return restMinutes(new Date(lastUpdatedDate), minutesToAdd);
};

const getSocialMediaDescription = socialMediaName =>
    `Publicación de ${socialMediaName} incluida como parte de la cobertura en vivo.`;

export const buildPostAuthor = post => {
    const rawAuthors = get(post, 'embed.config.authors', []);

    if (!Array.isArray(rawAuthors) || rawAuthors.length === 0) {
        return [
            {
                '@type': 'Person',
                name: 'Redacción LA NACION'
            }
        ];
    }

    return rawAuthors
        .filter(author => author && author.name)
        .map(author => ({
            '@type': 'Person',
            name: author.name
        }));
};

export const generatePostObject = (globalContent, urlNota, PLACEHOLDER) => {
    const {
        content_elements: contentElements,
        credits: { by }
    } = globalContent || {};

    const { authors } = extracDataFromCredits(by);

    const authorsDefault = {
        '@type': 'PERSON',
        name: authors.join(',')
    };

    const postingStart = contentElements.findIndex(elem =>
        isCustomLiveblog(elem)
    );

    let authorsName = authorsDefault;
    let post = {};
    let description = [];
    let postTitle = '';
    let currentPostHasBodyText = false;
    let currentPostSocialName = null;

    const updateCurrentPostFromElement = elem => {
        const { type = '', subtype = '' } = elem;

        if (isCustomLiveblog(elem)) {
            post = {};
            description = [];
            postTitle = get(elem, 'embed.config.title', '').trim();
            currentPostHasBodyText = false;
            currentPostSocialName = null;
            authorsName = buildPostAuthor(elem);
        }

        if (type === 'oembed_response' && socialMediaNames[subtype]) {
            currentPostSocialName = socialMediaNames[subtype];
        }

        if (type === 'list' && elem.items) {
            description.push(concatenateBullets(elem.items).join('; '));
            currentPostHasBodyText = true;
        }

        if (type === 'text' && elem.content) {
            description.push(elem.content);
            currentPostHasBodyText = true;
        }
    };

    const buildFinalPost = () => {
        const finalContent =
            !currentPostHasBodyText && currentPostSocialName
                ? getSocialMediaDescription(currentPostSocialName)
                : description.join(' ');

        return {
            ...post,
            content: finalContent,
            title: postTitle,
            author: authorsName
        };
    };

    const postElements = contentElements
        .slice(postingStart)
        .reduce((acc, elem, i, slicedArray) => {
            updateCurrentPostFromElement(elem);

            Object.assign(post, {
                ...(isCustomLiveblog(elem) &&
                    elem.embed &&
                    elem.embed.config && { config: elem.embed.config }),
                ...(elem.url && { url: elem.url })
            });

            if (
                (slicedArray[i + 1] && isCustomLiveblog(slicedArray[i + 1])) ||
                i + 1 === slicedArray.length
            ) {
                post = buildFinalPost();
                acc.push(post);
            }

            return acc;
        }, []);

    return postElements.map((elem, i) => {
        const {
            config = {},
            content = '',
            url = '',
            title = '',
            author
        } = elem;
        const { date = '', time = '' } = config;
        const dateObject = convertArgentinaTimeToGMT(date, time);
        const embedAuthors = Array.isArray(config.authors)
            ? config.authors
            : [];
        const singleAuthor = embedAuthors.length === 1 ? embedAuthors[0] : null;
        const rawSingleAuthorName = get(singleAuthor, 'name', '');
        const singleAuthorName =
            typeof rawSingleAuthorName === 'string'
                ? rawSingleAuthorName.trim()
                : '';
        const defaultHeadline = get(
            globalContent,
            'headlines.basic',
            'LA NACION - Noticia'
        );
        const postHeadline =
            title ||
            (singleAuthorName
                ? `Opinión en vivo de ${singleAuthorName}`
                : defaultHeadline);

        return {
            '@type': 'BlogPosting',
            headline: postHeadline,
            url: `${urlNota.slice(0, -1)}#parrafo_${i + 1}`,
            '@id': `#parrafo_${i + 1}`,
            mainEntityOfPage: { '@type': 'WebPage' },
            datePublished: dateObject,
            dateModified: dateObject,
            articleBody: removeHtmlTags(content),
            image: {
                '@type': 'ImageObject',
                url: url || PLACEHOLDER
            },
            author,
            publisher: {
                name: 'LA NACION',
                '@type': 'Organization'
            }
        };
    });
};

/**
 * Sanitiza dateCreated evitando que supere a datePublished.
 * Notas migradas tienen created_date posterior a first_publish_date.
 *
 * @param {string} createdDate      - Fecha raw de globalContent.created_date (puede ser '')
 * @param {string} datePublishedISO - ISO string ya calculado para datePublished
 * @returns {string} ISO string sanitizado, o '' si createdDate es vacío/inválido
 */
export const getSanitizedDateCreated = (createdDate, datePublishedISO) => {
    if (!createdDate) return '';
    const createdDateISO = createISODate(createdDate);
    if (!createdDateISO) return '';
    if (createdDateISO > datePublishedISO) return datePublishedISO;
    return createdDateISO;
};

export const generatePostObjectWithoutPowerUp = (
    globalContent,
    url,
    PLACEHOLDER
) => {
    const {
        content_elements: contentElements,
        credits: { by },
        first_publish_date: firstPublishDate,
        last_updated_date: lastUpdatedDate
    } = globalContent || {};

    const { authors } = extracDataFromCredits(by);

    const headline = get(
        globalContent,
        'headlines.basic',
        'LA NACION - Noticia'
    );

    const minutes = differenceInMinutes(firstPublishDate, lastUpdatedDate);

    const textElements = contentElements.filter(elem => elem.type === 'text');

    return textElements.map((elem, i) => {
        const dateModified = calculateDateModified(
            lastUpdatedDate,
            minutes,
            textElements.length,
            i + 1
        );

        return {
            '@type': 'BlogPosting',
            headline,
            url: `${url.slice(0, -1)}#parrafo_${i + 1}`,
            '@id': `#parrafo_${i + 1}`,
            mainEntityOfPage: { '@type': 'WebPage' },
            datePublished: createISODate(dateModified),
            dateModified: createISODate(dateModified),
            articleBody: removeHtmlTags(elem.content),
            image: {
                '@type': 'ImageObject',
                url: PLACEHOLDER
            },
            author: {
                '@type': 'PERSON',
                name: authors.join(',')
            },
            publisher: {
                name: 'LA NACION',
                '@type': 'Organization'
            }
        };
    });
};
