import React, { useEffect } from 'react';

import { Dialog } from '@ln/common-ui-dialog';
import { useCajaCarruselContext } from '../cajaCarruselContext';

import '../../../../../resources/packages/css/@ln/common-ui-dialog/index.css';

function MediaScrollerExpandedWrapper({ children }) {
    const { isOpenMediaScrollerExpanded, onCloseMediaScrollerExpanded } =
        useCajaCarruselContext();

    useEffect(() => {
        const eventName = isOpenMediaScrollerExpanded
            ? 'pauseTimeout'
            : 'resumeTimeout';

        window?.LN?.observable?.publish?.(eventName);
    }, [isOpenMediaScrollerExpanded]);

    // TODO: quitar cuando se implemente la mejora de desmontar el dialog cuando se clickea en boton nativo BACK de ANDROID
    if (!isOpenMediaScrollerExpanded) {
        return null;
    }

    return (
        <Dialog
            isOpen={isOpenMediaScrollerExpanded}
            onClose={onCloseMediaScrollerExpanded}
            position="full"
            classnames={{
                base: 'w-100 h-100dvh bg-light-900',
                wrapper: 'flex w-100 h-100'
            }}
            overlay
            closeOnClickOutside
        >
            {children}
        </Dialog>
    );
}

export default MediaScrollerExpandedWrapper;
