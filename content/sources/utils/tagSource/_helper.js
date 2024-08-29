export const extractIdFromImageUrl = url => {
    if (!url) return null;

    const regex = /lanacionar\/([A-Z0-9]+)\./;
    const match = url.match(regex);

    return match ? match[1] : null;
};
