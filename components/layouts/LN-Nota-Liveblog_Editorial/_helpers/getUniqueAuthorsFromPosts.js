import get from '../../../private/common/utils/get';
import { replaceResizerBaseUrl } from '../../../private/common/utils/image/resizer/v2/resizerHelper';
import isCustomLiveblog from '../../../private/common/utils/isCustomLiveblog';

const normalizePhoto = photo =>
    photo ? replaceResizerBaseUrl({ url: photo }) : '';

export const getUniqueAuthorsFromPosts = (posts = []) => {
    if (!posts.length) return [];

    const authorsMap = new Map();

    const filteredPosts = posts.filter(post => isCustomLiveblog(post));

    filteredPosts.forEach(post => {
        const rawAuthors = get(post, 'embed.config.authors', []);
        if (!Array.isArray(rawAuthors)) return;

        rawAuthors.forEach(author => {
            if (!author) return;

            const name = author.name || '';
            const id = author.id || name;
            if (!id || authorsMap.has(id)) return;
            const photo = normalizePhoto(author.photo);

            authorsMap.set(id, {
                id,
                name,
                firstName: author.firstName,
                lastName: author.lastName,
                image: {
                    ...(photo && { src: photo }),
                    alt: name
                }
            });
        });
    });

    return [...authorsMap.values()];
};

export const scrollToFirstPostOf = authorName => {
    const firstPost = document.querySelector(
        `a.link.ln-link[title*="${authorName}"]`
    );

    if (firstPost) {
        firstPost.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};
