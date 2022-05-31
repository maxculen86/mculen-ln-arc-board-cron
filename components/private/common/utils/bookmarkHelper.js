import { PERSONALIZACION_API } from 'fusion:environment';
import get from './get';
import { getAutorId, getTagId } from './getElementId';
import dateAndTimeUtil from './dateAndTimeUtil';

export default function toggleBookmark(
    token,
    _globalContent,
    isDelete,
    setBookmark,
    setToast
) {
    const getDataFromAPI = async () => {
        const fetchBookmarkPath = isDelete ? `/${isDelete}` : '';
        const { _id: noteId = '' } = _globalContent || {};
        const primarySectionName = get(
            _globalContent,
            'taxonomy.primary_section.name',
            ''
        );

        const bookmarkRequestBody = isDelete
            ? {}
            : {
                  bookmarkParent: noteId,
                  bookmarkType: 'story',
                  bookmarkTypeId: noteId,
                  bookmarkGroup: primarySectionName,
                  bookmarkContent: getBookmarkContent(_globalContent)
              };

        setToast({});

        const statusActions = {
            200: async response => {
                const datos = await response.json();
                const { bookmarkId: id } = datos;
                setBookmark && setBookmark(isDelete ? false : id);
                setToast(
                    isDelete
                        ? {
                              status: 'success',
                              description:
                                  'Se borró de <strong>Mis notas, Guardadas.</strong>',
                              timeout: 2750
                          }
                        : {
                              status: 'success',
                              description:
                                  'Se agregó a <strong>Mis notas, Guardadas.</strong>',
                              timeout: 2750
                          }
                );
            },
            409: () => {
                setToast({
                    status: 'warning',
                    description:
                        'No se pudo guardar la nota porque llegaste al límite permitido.',
                    buttonLabel: 'Ir a Mis Notas',
                    buttonAction: () => {
                        window.open('/mis-notas', '_self');
                    },
                    timeout: 2750
                });
            },
            default: () => {
                setToast({
                    status: 'danger',
                    description: 'Parece que hubo un problema',
                    buttonLabel: 'Reintentar',
                    buttonAction: getDataFromAPI,
                    timeout: 2750
                });
            }
        };

        try {
            const res = await fetch(
                `${PERSONALIZACION_API}bookmarks${fetchBookmarkPath}`,
                {
                    method: isDelete ? 'DELETE' : 'POST',
                    headers: {
                        Authorization: token
                    },
                    body: JSON.stringify(bookmarkRequestBody)
                }
            );
            statusActions[res.status]
                ? statusActions[res.status](res)
                : statusActions.default();
            return res.status;
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);

            statusActions.default();
        }
    };

    if (token && (isDelete || _globalContent)) {
        return getDataFromAPI();
    }
    return null;
}

export function getBookmarkContent(globalContent) {
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
        get(globalContent, 'label.enviar_a_apps.text', 'No') === 'Si';

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
