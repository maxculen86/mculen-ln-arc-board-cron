import { DOMParser } from '@xmldom/xmldom';

export const transformPodcastData = data => {
    const doc = new DOMParser().parseFromString(data, 'application/xml');

    const items = Array.from(doc.getElementsByTagName('item'));

    return items.map(item => {
        const get = tagName => {
            const el = item.getElementsByTagName(tagName)[0];
            if (!el) return null;

            if (tagName === 'itunes:image') {
                return el.getAttribute('href');
            }

            return el.textContent;
        };

        const enclosure = item.getElementsByTagName('enclosure')[0];

        return {
            id: get('guid'),
            title: get('title'),
            description: get('description'),
            duration: get('itunes:duration'),
            image: get('itunes:image'),
            summary: get('itunes:summary'),
            mp3: enclosure?.getAttribute('url') ?? null
        };
    });
};
