import React from 'react';
import { Link } from '@ln/foodit-ui-link';
import renderToast from '../../../../private-global/common/utils/renderToast';

export const TOAST = {
    SUCCESS: {
        TITLE: '¡Listo!',
        VARIANT: 'success',
        MESSAGE: {
            DELETE_COLLECTION: 'Ya no forma parte de tus colecciones.',
            SAVE_COLLECTION: (
                <>
                    Podes ver la colección en{' '}
                    <Link
                        href="/recetario/"
                        className="inline-flex"
                        title="Ir al recetario"
                    >
                        <span className="text-light-1 underline">
                            &quot;Mis Recetas.&quot;
                        </span>
                    </Link>
                </>
            ),
            RENAME_COLLECTION:
                'Podes ver los cambios aplicados en la colección.',
            DELETE_ARTICLE: 'Se quito de tu colección.',
            SAVE_ARTICLE: (
                <>
                    Podes acceder desde la sección{' '}
                    <Link
                        href="/recetario/"
                        className="inline-flex"
                        title="Ir al recetario"
                    >
                        <span className="text-light-1 underline">
                            &quot;Mis Recetas.&quot;
                        </span>
                    </Link>
                </>
            ),
            SAVE_INGREDIENTS: (
                <>
                    Podes acceder desde la sección{' '}
                    <Link
                        href="/lista-de-compras/"
                        className="inline-flex"
                        title="Ir a la lista de compras"
                    >
                        <span className="text-light-1 underline">
                            &quot;Lista de compras.&quot;
                        </span>
                    </Link>
                </>
            ),
            COPY_INGREDIENTS: 'Podes enviar el listado que copiaste.',
            DELETE_INGREDIENTS: 'se quitó de tu listado de compras.'
        }
    },
    ERROR: {
        TITLE: '¡Uppps!',
        VARIANT: 'danger',
        MESSAGE: {
            GENERIC: 'Parece que hubo un problema',
            LIMIT_BOOKMARKS: 'Se alcanzó el limite de 150 recetas guardadas.'
        }
    }
};

export const addToast = ({ variant, title, message }) => {
    renderToast({
        variant,
        title,
        message
    });
};

export const addErrorToast = () => {
    renderToast({
        variant: TOAST.ERROR.VARIANT,
        title: TOAST.ERROR.TITLE,
        message: TOAST.ERROR.MESSAGE.GENERIC
    });
};
