import React, { useEffect } from 'react';
import { ToastContainer as CommonToastContainer } from '@ln/ds-common-toasts';
import renderToasts from './renderToast';

const VARIANT_TO_COLOR = {
    danger: 'error',
    success: 'success',
    warning: 'warning',
    info: 'info'
};

/**
 * ToastContainer pre-configurado para La Nación.
 * Incluye el Portal y wrapper con estilos de z-index apropiados.
 *
 * @returns {React.ReactElement}
 */
function ToastsContainer() {
    // Puente bus global -> toast del DS, para uso desde scripts estáticos.
    // TODO: quitar la traducción de shape (variant->color, message->description)
    // cuando todos los callers usen el shape nativo del DS.
    useEffect(() => {
        const handleAddToast = ({
            variant,
            title,
            message,
            buttonProps,
            duration
        }) => {
            renderToasts({
                color: VARIANT_TO_COLOR[variant] || 'info',
                title,
                description: message,
                duration,
                buttonProps
            });
        };

        window?.LN?.observable?.subscribe('addToast', handleAddToast);
        return () =>
            window?.LN?.observable?.unsubscribe('addToast', handleAddToast);
    }, []);

    return (
        <CommonToastContainer.Portal>
            <div data-tw>
                <CommonToastContainer className="z-105 max-md:mb-61" />
            </div>
        </CommonToastContainer.Portal>
    );
}

export default ToastsContainer;
