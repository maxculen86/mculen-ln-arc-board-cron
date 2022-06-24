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
    console.log(
        '🚀 ~ file: generatePostObject.js ~ line 27 ~ generatePostObject ~ contentElements',
        contentElements
    );

    const { authors } = extracDataFromCredits(by);
    const postingStart = contentElements.findIndex(elem => {
        const { subtype = 'default', type = '' } = elem;
        return type === 'custom_embed' && subtype === 'custom-liveblog';
    });
    console.log(
        '🚀 ~ file: generatePostObject.js ~ line 35 ~ generatePostObject ~ potingStart',
        postingStart
    );
    let post = {};
    const postElements = contentElements
        .slice(postingStart)
        .reduce((acc, elem, i) => {
            const { subtype = 'default' } = elem;

            if (subtype === 'custom-liveblog') {
                post = {};
            }

            Object.assign(post, {
                content: elem.content && elem.content,
                ...(elem.embed && elem.embed),
                ...(post.content && { content: post.content })
            });

            if (
                (contentElements[i + 1] &&
                    contentElements[i + 1].type === 'custom_embed') ||
                i + 1 === contentElements.length
            ) {
                acc.push(post);
            }

            return acc;
        }, []);
    console.log(
        '🚀 ~ file: generatePostObject.js ~ line 65 ~ generatePostObject ~ postElements',
        postElements
    );

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
            articleBody: content,
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
