import React from 'react';
import { ToastContainer as CommonToastContainer } from '@ln/ds-common-toasts';

function ToastsContainer() {
    return (
        <CommonToastContainer.Portal>
            <div data-tw>
                <CommonToastContainer style={{ zIndex: 20 }} />
            </div>
        </CommonToastContainer.Portal>
    );
}

export default ToastsContainer;
