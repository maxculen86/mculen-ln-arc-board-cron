import React from 'react';
import { Link } from '@ln/foodit-ui-link';

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
            DELETE_INGREDIENTS: 'Ya no forma parte de tu listado de compras.'
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
    window?.LN?.observable?.publish('addToast', {
        variant,
        title,
        message
    });
};

export const addErrorToast = () => {
    addToast({
        variant: TOAST.ERROR.VARIANT,
        title: TOAST.ERROR.TITLE,
        message: TOAST.ERROR.MESSAGE.GENERIC
    });
};
