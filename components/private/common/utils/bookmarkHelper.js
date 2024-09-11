import { PERSONALIZACION_APIV2, SITE_LANACION } from 'fusion:environment';
import get from './get';
import { getAutorId, getTagId } from './getElementId';
import dateAndTimeUtil from './dateAndTimeUtil';
import { getAuthTokens } from '../../../../auth/helper/loginHelper';

export default function toggleBookmark({
    isDelete,
    setBookmark,
    dispatch = () => {},
    _globalContent = {}
} = {}) {
    const getDataFromAPI = async () => {
        const { token, accessToken } = await getAuthTokens();

        const fetchBookmarkPath = isDelete ? `/${isDelete}` : '';
        const { _id: noteId = '' } = _globalContent;
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

        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                typeModal: 'toast',
                open: false,
                data: {}
            }
        });

        try {
            if (accessToken && token) {
                const res = await fetch(
                    `${PERSONALIZACION_APIV2}bookmarks${fetchBookmarkPath}`,
                    {
                        method: isDelete ? 'DELETE' : 'POST',
                        headers: {
                            Authorization: accessToken,
                            'X-Token': token
                        },
                        body: JSON.stringify(bookmarkRequestBody)
                    }
                );

                statusActions[res.status]
                    ? statusActions[res.status]({
                          response: res,
                          dispatch,
                          setBookmark
                      })
                    : statusActions.default({
                          dispatch
                      });

                return res.status;
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);

            return statusActions.default({
                dispatch
            });
        }
    };

    const shouldCallApi = isDelete || Object.keys(_globalContent).length;

    return shouldCallApi ? getDataFromAPI() : null;
}

const statusActions = {
    200: async ({ response, dispatch, setBookmark }) => {
        const { bookmarkId: id, bookmarkContent } = await response.json();
        setBookmark && setBookmark(bookmarkContent ? id : '');
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                typeModal: 'toast',
                open: true,
                data: !bookmarkContent
                    ? {
                          title: '¡Listo!',
                          status: 'success',
                          description: 'Se borró de "Mis notas"',
                          timeout: 2750,
                          buttonLabel: 'Mis Notas',
                          href: `${SITE_LANACION}/mis-notas/`,
                          closable: true,
                          pauseOnHover: true
                      }
                    : {
                          title: '¡Listo!',
                          status: 'success',
                          description: 'Podés acceder desde "Menú de usuario"',
                          timeout: 2750,
                          buttonLabel: 'Mis Notas',
                          href: `${SITE_LANACION}/mis-notas/`,
                          closable: true,
                          pauseOnHover: true
                      }
            }
        });
    },
    409: ({ dispatch }) => {
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                typeModal: 'toast',
                open: true,
                data: {
                    title: '¡Atención!',
                    status: 'warning',
                    description:
                        'No se pudo guardar porque llegaste al límite permitido.',
                    timeout: 2750,
                    buttonLabel: 'Mis Notas',
                    href: `${SITE_LANACION}/mis-notas/`,
                    closable: true,
                    pauseOnHover: true
                }
            }
        });
    },
    default: ({ dispatch }) => {
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                typeModal: 'toast',
                open: true,
                data: {
                    title: '¡Ups!',
                    status: 'danger',
                    description:
                        'Hubo un problema de conexión. Reintenta más tarde.',
                    timeout: 2750,
                    closable: true,
                    pauseOnHover: true
                }
            }
        });
    }
};

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
        url: imageUrl = '',
        resized_urls: resizedUrls = []
    } = imageApertura;

    const parametros = resizedUrls.map(size => ({
        alto: size.option.height,
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
                absoluteUrl,
                parametros
            }
        })
    };
}
