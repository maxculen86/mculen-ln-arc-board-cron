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
            RENAME_COLLECTION: 'Podes ver la colección en mis recetas.',
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
            SAVE_INGREDIENTS:
                'Los ingredientes han sido añadidos a la lista de compras.',
            COPY_INGREDIENTS: 'Podes enviar el listado que copiaste.',
            DELETE_INGREDIENTS: 'Ya no forma parte de tu listado de compras.',
            SAVE_MENU: (
                <>
                    Podes acceder desde la sección{' '}
                    <Link
                        href="/menu-semanal/"
                        className="inline-flex"
                        title="Ir a Menú semanal"
                    >
                        <span className="text-light-1 underline">
                            &quot;Menú semanal.&quot;
                        </span>
                    </Link>
                </>
            ),
            EDIT_MENU: 'Podes ver los cambios aplicados en el menú semanal.',
            DELETE_MENU: 'Se quito del menú semanal'
        }
    },
    ERROR: {
        TITLE: '¡Uppps!',
        VARIANT: 'danger',
        MESSAGE: {
            GENERIC: 'Parece que hubo un problema',
            LIMIT_BOOKMARKS: 'Se alcanzó el limite de 150 recetas guardadas.',
            LIMIT_MENU: 'Se alcanzó el limite de 3 recetas por comida y día.'
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
