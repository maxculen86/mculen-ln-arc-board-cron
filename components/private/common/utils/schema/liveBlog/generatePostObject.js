import getAuthorByline from '../../getAuthorByline';
import { differenceInMinutes, restMinutes } from '../../dateAndTimeUtil';
import get from '../../get';

const extracDataFromCredits = by => {
    let authors = [];

    if (by) {
        authors = by
            .filter(v => v.type === 'author')
            .map(author => getAuthorByline(author));
    }
    return { authors: authors.length ? authors : ['Redacción LA NACION'] };
};

const createISODate = (date, time) => {
    const dateAndTime =
        date !== '' && time !== '' ? new Date(`${date} ${time}`) : '';
    return dateAndTime !== '' ? dateAndTime.toISOString() : '';
};

const concatenateBullets = bullets => {
    return bullets.map(bullet => {
        return bullet.content.replace('\n', '') || '';
    });
};

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
            }
            if (type === 'text' || type === 'list') {
                type === 'list'
                    ? elem.items &&
                      description.push(
                          concatenateBullets(elem.items).join('; ')
                      )
                    : elem.content && description.push(elem.content);
            }

            Object.assign(post, {
                ...(elem.embed && elem.embed),
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
        const { title = '', date = '', time = '' } = config;
        const isoDate = createISODate(date, time);

        return {
            '@type': 'BlogPosting',
            headline: title,
            url: `${urlNota.slice(0, -1)}#parrafo_${i + 1}`,
            '@id': `#parrafo_${i + 1}`,
            mainEntityOfPage: { '@type': 'WebPage' },
            datePublished: isoDate,
            dateModified: isoDate,
            articleBody: content.replace(/<[^>]*>/gm, ''),
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
            articleBody: elem.content,
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
