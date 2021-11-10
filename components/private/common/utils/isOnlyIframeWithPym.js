import { parse } from 'node-html-parser';
export const isOnlyIframe = (_content = '') => {
    const contentHtml = parse(_content);
    return (
        contentHtml &&
        contentHtml.firstChild &&
        contentHtml.firstChild.tagName === 'iframe'
    );
};
export const hasPym = (_content = '') => {
    const contentHtml = parse(_content);
    return (
        contentHtml &&
        contentHtml.firstChild &&
        contentHtml.firstChild.classNames.includes('pym')
    );
};
const isOnlyIframeWithPym = (_content = '') => {
    return isOnlyIframe(_content) && hasPym(_content);
};
export default isOnlyIframeWithPym;
