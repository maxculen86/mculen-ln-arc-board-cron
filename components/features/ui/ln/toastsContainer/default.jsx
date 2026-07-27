import React, { useEffect } from 'react';
import { ToastContainer as CommonToastContainer } from '@ln/ds-common-toasts';
import renderToasts from './renderToast';

/**
 * ToastContainer pre-configurado para La Nación.
 * Incluye el Portal y wrapper con estilos de z-index apropiados.
 *
 * @returns {React.ReactElement}
 */
function ToastsContainer() {
    useEffect(() => {
        window?.LN?.observable?.subscribe('addToast', renderToasts);
        return () =>
            window?.LN?.observable?.unsubscribe('addToast', renderToasts);
    }, []);

    return (
        <CommonToastContainer.Portal>
            <div data-tw className="contents">
                <CommonToastContainer className="z-1550 max-md:mb-61" />
            </div>
        </CommonToastContainer.Portal>
    );
}

export default ToastsContainer;
