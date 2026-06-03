import { SITE_LANACION } from 'fusion:environment';
import get from '../get';

const BASE_BOOKMARK_SIZE = { width: 150, height: 100 };
const LANACION_BASE_URL = SITE_LANACION || 'https://www.lanacion.com.ar';

export const buildBookmarkResizedImageUrl = (rawUrl = '') => {
    if (!rawUrl || typeof rawUrl !== 'string') return '';

    const normalizedUrl = rawUrl.replace('/resizer/{{param}}/', '/resizer/v2/');

    const parsedUrl = new URL(normalizedUrl);

    parsedUrl.searchParams.set('width', String(BASE_BOOKMARK_SIZE.width));
    parsedUrl.searchParams.set('height', String(BASE_BOOKMARK_SIZE.height));

    return parsedUrl.toString();
};

const getImages = objectImage => {
    if (!objectImage) return {};

    const rawUrl =
        get(objectImage, 'url', '') || get(objectImage, 'absoluteUrl', '');
    if (!rawUrl) return {};

    const url = buildBookmarkResizedImageUrl(rawUrl);

    return {
        height: BASE_BOOKMARK_SIZE.height,
        resized_urls: [],
        type: 'image',
        url,
        width: BASE_BOOKMARK_SIZE.width
    };
};

const trasformBookmarkContent = (data = []) =>
    (Array.isArray(data) &&
        data.length > 0 &&
        data.map(article => {
            const { bookmarkContent, bookmarkId } = article || {};
            const autores = get(bookmarkContent, 'autores', []).map(
                ({ imagen, valor }) => ({
                    additional_properties: {
                        original: { author_type: '' }
                    },
                    image: imagen && `${LANACION_BASE_URL}${imagen}`,
                    name: valor,
                    type: 'author'
                })
            );

            return {
                _id: get(article, 'bookmarkTypeId', ''),
                credits: { by: autores },
                headlines: { basic: get(bookmarkContent, 'titulo', '') },
                label: {
                    recomendar: { text: '' },
                    volanta: { display: false, text: '' }
                },
                promo_items: {
                    basic: getImages(get(bookmarkContent, 'imagen'))
                },
                category: get(bookmarkContent, 'categoria.valor', ''),
                website_url: get(bookmarkContent, 'url', ''),
                bookmarkId
            };
        })) ||
    [];

export default trasformBookmarkContent;
