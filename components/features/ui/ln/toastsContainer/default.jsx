import React from 'react';
import { ToastContainer as CommonToastContainer } from '@ln/ds-common-toasts';

/**
 * ToastContainer pre-configurado para La Nación.
 * Incluye el Portal y wrapper con estilos de z-index apropiados.
 *
 * @returns {React.ReactElement}
 */
function ToastsContainer() {
    return (
        <CommonToastContainer.Portal>
            <div data-tw>
                <CommonToastContainer className="z-55" />
            </div>
        </CommonToastContainer.Portal>
    );
}

export default ToastsContainer;
