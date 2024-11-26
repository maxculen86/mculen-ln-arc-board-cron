export const getAuthorData = (author, authors, key) => {
    if (author) return author[key];
    return authors.map(a => a[key]);
};
