export const trim = string => string.replace(/\s{2,}/g, ' ');

export const getModifier = subtype => {
    switch (subtype) {
        case 'facebook-post':
        case 'facebook-video':
            return '--facebook';
        default:
            return `--${subtype}`;
    }
};

export const addPropertyLoading = ({ subtype, tagHtml = '' }) => {
    const embeds = ['youtube', 'dailymotion', 'vimeo'];
    const element =
        tagHtml.includes('iframe') && embeds.includes(subtype)
            ? tagHtml.replace(' ', ' loading="lazy" ')
            : tagHtml;

    return { __html: element };
};
