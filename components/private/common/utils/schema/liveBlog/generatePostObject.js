import getAuthorByline from '../../getAuthorByline';
import { differenceInMinutes, restMinutes } from '../../dateAndTimeUtil';
import get from '../../get';
import removeHtmlTags from '../../removeHtmlTags';
import createDateObject from '../../createDateObject';

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

export const generatePostObject = (globalContent, urlNota, PLACEHOLDER) => {
    const {
        content_elements: contentElements,
        credits: { by }
    } = globalContent || {};

    const { authors } = extracDataFromCredits(by);

    const headline = get(
        globalContent,
        'headlines.basic',
        'LA NACION - Noticia'
    );
    const postingStart = contentElements.findIndex(elem => {
        const { subtype = 'default', type = '' } = elem;
        return type === 'custom_embed' && subtype === 'custom-liveblog';
    });
    let post = {};
    let description = [];
    const postElements = contentElements
        .slice(postingStart)
        .reduce((acc, elem, i) => {
            const { subtype = 'default', type = '' } = elem;

            if (subtype === 'custom-liveblog') {
                post = {};
                description = [];

                if (elem?.embed?.config?.title?.trim()) {
                    description.push(elem.embed.config.title);
                }
            }

            if (type === 'list' && elem.items) {
                description.push(concatenateBullets(elem.items).join('; '));
            }

            if (type === 'text' && elem.content) {
                description.push(elem.content);
            }

            Object.assign(post, {
                ...(elem.embed &&
                    elem.embed.config && { config: elem.embed.config }),
                ...(elem.url && { url: elem.url })
            });

            if (
                (contentElements[i + 1] &&
                    contentElements[i + 1].type === 'custom_embed') ||
                i + 1 === contentElements.length
            ) {
                post = {
                    ...post,
                    content: description.join(' ')
                };
                acc.push(post);
            }

            return acc;
        }, []);

    return postElements.map((elem, i) => {
        const { config = {}, content = '', url = '' } = elem;
        const { date = '', time = '' } = config;
        const dateObject = createDateObject(date, time);

        return {
            '@type': 'BlogPosting',
            headline,
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
            datePublished: dateModified,
            dateModified,
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
