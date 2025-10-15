import get from '../../../private/common/utils/get';
import isCustomLiveblog from '../../../private/common/utils/isCustomLiveblog';

export const getUniqueAuthorsFromPosts = (posts = []) => {
    if (!posts.length) return [];

    const authorsMap = new Map();

    const filteredPosts = posts.filter(post => isCustomLiveblog(post));

    filteredPosts.forEach(post => {
        const rawAuthors = get(post, 'embed.config.authors', []);

        rawAuthors.forEach(author => {
            if (!author) return;

            const id = author.id || author.name;
            if (!id || authorsMap.has(id)) return;

            authorsMap.set(id, {
                id,
                name: author.name,
                firstName: author.firstName,
                lastName: author.lastName,
                image: {
                    src: author.photo,
                    alt: author.name
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
