import isSSR from '../../LN/common/utils/isSSR';

function stripHtml({ html = '' }) {
    if (!html || typeof html !== 'string') {
        return '';
    }

    if (!isSSR()) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            return doc.body.textContent || doc.body.innerText || '';
        } catch (error) {
            console.warn('DOMParser failed, falling back to regex:', error);
        }
    }

    return html
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .trim();
}

export default stripHtml;
