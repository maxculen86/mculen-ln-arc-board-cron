import { RESIZER_URL_PUBLIC } from 'fusion:environment';
import get from '../get';
import { getShortestImage } from '../../../LN/common/utils/mediaHelper';

export const getHeightOfUrl = (url = '') => {
    const [measures] = url.match(/\/[0-9]*x[0-9]*\//g) || '';
    return measures ? Number(measures.split('x')[1].replace('/', '')) : '';
};

const getImages = objectImage => {
    if (objectImage && objectImage.absoluteUrl) {
        const arrayImageResized = get(objectImage, 'parametros', []);
        const urlAbsolute = get(objectImage, 'absoluteUrl', '');
        const resizedUrls = arrayImageResized.map(({ ancho, firma }) => {
            return {
                option: {
                    width: ancho
                },
                resizedUrl: firma ? urlAbsolute.replace('{{param}}', firma) : ''
            };
        });

        const { resizedUrl, _width: width } = getShortestImage(resizedUrls);

        return {
            height: getHeightOfUrl(resizedUrl),
            resized_urls: resizedUrls,
            type: 'image',
            url: resizedUrl,
            width
        };
    }
    return {};
};

const trasformBookmarkContent = (data = []) => {
    return (
        (Array.isArray(data) &&
            data.length > 0 &&
            data.map(article => {
                const { bookmarkContent, bookmarkId } = article || {};
                const autores = get(bookmarkContent, 'autores', []).map(
                    ({ imagen, valor }) => {
                        return {
                            additional_properties: {
                                original: {
                                    author_type: ''
                                }
                            },
                            image: imagen && `${RESIZER_URL_PUBLIC}${imagen}`,
                            name: valor,
                            type: 'author'
                        };
                    }
                );

                return {
                    _id: get(article, 'bookmarkTypeId', ''),
                    credits: {
                        by: autores
                    },
                    headlines: {
                        basic: get(bookmarkContent, 'titulo', '')
                    },
                    label: {
                        recomendar: { text: '' },
                        volanta: { display: false, text: '' }
                    },
                    promo_items: {
                        basic: getImages(
                            get(bookmarkContent, 'imagen', undefined)
                        )
                    },
                    category: get(bookmarkContent, 'categoria.valor', ''),
                    website_url: get(bookmarkContent, 'url', ''),
                    bookmarkId
                };
            })) ||
        []
    );
};

export default trasformBookmarkContent;
