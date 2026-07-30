import { PERSONALIZACION_APIV2 } from 'fusion:environment';
import get from './get';
import { getAutorId, getTagId } from './getElementId';
import dateAndTimeUtil from './dateAndTimeUtil';
import { getAuthTokens } from '../auth/helper/loginHelper';
import { TOAST_CONFIG } from '../../../features/ui/ln/toastsContainer/helpers';
import { replaceResizerBaseUrl } from './image/resizer/v2/resizerHelper';

export function getBookmarkContent(globalContent) {
    const regexResizerUrl =
        /(https|http:\/\/)(.*)(.*\/resizer\/)([a-zA-Z0-9_\-=]+(?:\/[0-9x]+)?(?:\/smart)?(?:\/+(?:filters:.+?)?)?\/)(.*)/;
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
        get(globalContent, 'label.enviar_a_apps.text', 'No') === 'Si';

    const imageApertura = get(globalContent, 'promo_items.basic', {});
    const { url: imageUrl = '' } = imageApertura;

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

    const absoluteUrl = replaceResizerBaseUrl({
        url: imageUrl.replace(regexResizerUrl, '$1$2$3v2/$5')
    });

    return {
        origen: 'web',
        id: noteId,
        templateId: Number(noteSubtype),
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
                absoluteUrl
            }
        })
    };
}

const fetchBookmarks = async (
    path,
    accessToken,
    token,
    bookmarkRequestBody,
    setBookmark,
    isDelete
) => {
    const handleResponse = async res => {
        if (res.status !== 200)
            return { status: res.status, bookmarkContent: null };

        const data = await res.json();
        const { bookmarkContent, bookmarkId } = data;

        if (setBookmark) {
            setBookmark(bookmarkContent ? bookmarkId : '');
        }

        return {
            status: res.status,
            bookmarkContent: bookmarkContent || null
        };
    };

    try {
        const res = await fetch(`${PERSONALIZACION_APIV2}bookmarks${path}`, {
            method: isDelete ? 'DELETE' : 'POST',
            headers: { Authorization: accessToken, 'X-Token': token },
            body: JSON.stringify(bookmarkRequestBody)
        });

        return await handleResponse(res);
    } catch (err) {
        return { status: 500, bookmarkContent: null };
    }
};

export default function toggleBookmark({
    isDelete,
    setBookmark,
    _globalContent = {}
} = {}) {
    const getDataFromAPI = async () => {
        const { token, accessToken } = await getAuthTokens();
        if (!accessToken || !token)
            return { status: 401, bookmarkContent: null };

        const { _id: noteId = '', taxonomy } = _globalContent;
        const primarySectionName = taxonomy?.primary_section?.name || '';

        const fetchBookmarkPath = (isDelete && `/${isDelete}`) || '';

        const bookmarkRequestBody = (isDelete && {}) || {
            bookmarkParent: noteId,
            bookmarkType: 'story',
            bookmarkTypeId: noteId,
            bookmarkGroup: primarySectionName,
            bookmarkContent: getBookmarkContent(_globalContent)
        };

        return fetchBookmarks(
            fetchBookmarkPath,
            accessToken,
            token,
            bookmarkRequestBody,
            setBookmark,
            isDelete
        );
    };

    return isDelete || Object.keys(_globalContent).length
        ? getDataFromAPI()
        : null;
}

export const getStatusMessage = (status, bookmarkContent) => {
    const statusConfig = {
        200: {
            title: TOAST_CONFIG.SUCCESS.TITLE,
            color: TOAST_CONFIG.SUCCESS.COLOR,
            description: !bookmarkContent
                ? TOAST_CONFIG.SUCCESS.DESCRIPTION.DELETE_BOOKMARK
                : TOAST_CONFIG.SUCCESS.DESCRIPTION.ADD_BOOKMARK
        },
        409: {
            title: TOAST_CONFIG.WARNING.TITLE,
            color: TOAST_CONFIG.WARNING.COLOR,
            description: TOAST_CONFIG.WARNING.DESCRIPTION.LIMIT_REACHED
        }
    };

    return {
        buttonProps: TOAST_CONFIG.BUTTON_PROPS.BOOKMARK,
        ...(statusConfig[status] || {
            title: '¡Ups!',
            color: TOAST_CONFIG.ERROR.COLOR,
            description: TOAST_CONFIG.ERROR.DESCRIPTION.CONNECTION
        })
    };
};
