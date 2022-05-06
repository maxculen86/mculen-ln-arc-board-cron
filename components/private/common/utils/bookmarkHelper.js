/* eslint-disable react-hooks/rules-of-hooks */
// import { useContent } from 'fusion:content';
import { API_ENV } from 'fusion:environment';
import get from './get';
import { getAutorId, getTagId } from './getElementId';
import dateAndTimeUtil from './dateAndTimeUtil';

export const baseUrl = () =>
    `https://${
        API_ENV === 'sandbox' ? 'qa-' : ''
    }api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion`;

export function toggleBookmark(token, _globalContent, isDelete, setBookmark) {
    const getDataFromAPI = async () => {
        const fetchBookmarkPath = isDelete ? `/${isDelete}` : '';
        const { _id: noteId = '' } = _globalContent || {};
        const primarySectionName = get(
            _globalContent,
            'taxonomy.primary_section.name',
            ''
        );

        const createBookmarkBody = {
            bookmarkParent: noteId,
            bookmarkType: 'story',
            bookmarkTypeId: noteId,
            bookmarkGroup: primarySectionName,
            bookmarkContent: getBookmarkContent(_globalContent)
        };
        console.log(
            '🚀 ~ file: bookmarkHelper.js ~ line 124 ~ getDataFromAPI ~ createBookmarkBody',
            createBookmarkBody
        );
        try {
            const res = await fetch(
                `${baseUrl()}/bookmarks${fetchBookmarkPath}`,
                {
                    method: `${isDelete ? 'DELETE' : 'POST'}`,
                    headers: {
                        Authorization: token
                    },
                    body: `${
                        isDelete ? '{}' : JSON.stringify(createBookmarkBody)
                    }`
                }
            );
            if (res.ok) {
                const datos = await res.json();
                const { bookmarkId: id } = datos;
                setBookmark(isDelete ? false : id);
            } else {
                // setToast('fail');
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (token && (isDelete || _globalContent)) {
        return getDataFromAPI();
    }
    return false;
}

function getBookmarkContent(globalContent) {
    const regexResizerUrl = new RegExp(
        /(https|http:\/\/)(.*)(.*\/resizer\/)([a-zA-Z0-9_\-=]+(?:\/[0-9x]+)?(?:\/smart)?(?:\/+(?:filters:.+?)?)?\/)(.*)/
    );

    const {
        _id: noteId,
        subtype: noteSubtype,
        canonical_url: canonicalUrl,
        headlines: { basic: basicHeadline, mobile: mobileHeadline } = {},
        subheadlines: { basic: basicSubheadline } = {},
        credits: { by: authors = [] } = {},
        display_date: displayDate,
        first_publish_date: firstPublishDate
    } = globalContent || {};

    const primarySectionName = get(
        globalContent,
        'taxonomy.primary_section.name',
        ''
    );
    const primarySectionSlug = get(
        globalContent,
        'taxonomy.primary_section._id',
        ''
    );
    const noteTags = get(globalContent, 'taxonomy.tags', []);
    const tags = noteTags.map(tag => ({
        id: getTagId(tag.slug),
        slug: tag.slug,
        valor: tag.text
    }));

    const enviarApps =
        get(globalContent, 'label.enviar_a_apps.text', 'No') === 'Si' || false;

    const imageApertura = get(globalContent, 'promo_items.basic', {});
    const {
        _id: imageId,
        type: promoItemType,
        url: imageUrl = '',
        resized_urls: resizedUrls = []
    } = imageApertura;

    const parametros = resizedUrls.map(size => ({
        media: size.option.width,
        ancho: size.option.width,
        firma: size.resizedUrl.replace(regexResizerUrl, '$4').slice(0, -1)
    }));

    const autores = authors.map(autor => {
        const image = get(autor, 'image.resized_urls[0].resizedUrl', null);

        return {
            id: getAutorId(autor.slug),
            slug: autor.slug,
            valor: autor.name,
            tipo: 1,
            ...(image && {
                imagen: image.replace(regexResizerUrl, '$3$4$5')
            })
        };
    });

    const absoluteUrl = imageUrl.replace(regexResizerUrl, '$1$2$3{{param}}/$5');
    const imageBaseUrl = imageUrl.replace(regexResizerUrl, '$3{{param}}/$5');

    return {
        id: noteId,
        templateId: noteSubtype,
        url: canonicalUrl,
        categoria: {
            slug: primarySectionSlug,
            valor: primarySectionName
        },
        ...(tags.length && { tags }),
        titulo: mobileHeadline || basicHeadline,
        ...(basicSubheadline && { bajada: basicSubheadline }),
        autores,
        enviarApps,
        fechaActualizacion: `${Object.values(dateAndTimeUtil(displayDate)).join(
            ' • '
        )}`,
        fecha: `${Object.values(dateAndTimeUtil(firstPublishDate)).join(
            ' • '
        )}`,
        ...(Object.keys(imageApertura).length && {
            imagen: {
                id: imageId,
                _t: `${promoItemType === 'image' ? 'img' : ''}`,
                baseUrl: imageBaseUrl,
                absoluteUrl,
                parametros
            }
        })
    };
}
