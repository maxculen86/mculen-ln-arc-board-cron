import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Portal } from '@ln/common-ui-portal';
import { Motion } from '@ln/common-ui-motion';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import { useHandleCloseScape } from '../hooks';

import '../../../../../resources/packages/css/@ln/common-ui-dialog/index.css';

function MediaScrollerExpandedWrapper({ children }) {
    const { isOpenMediaScrollerExpanded, onCloseMediaScrollerExpanded } =
        useCajaCarruselContext();

    useEffect(() => {
        const eventName = isOpenMediaScrollerExpanded
            ? 'clearTimeout'
            : 'retriggerTimeout';

        window?.LN?.observable?.publish?.(eventName);
    }, [isOpenMediaScrollerExpanded]);

    useHandleCloseScape({
        isOpenMediaScrollerExpanded,
        onCloseMediaScrollerExpanded
    });

    // TODO: Reemplazar por common-ui-dialog, se creo Modal custom por bug en boton back nativo de android hasta encontrar solucion en la lib.
    return (
        <Portal>
            <Motion
                show={isOpenMediaScrollerExpanded}
                animation={{
                    transitionIn: ['fade-in'],
                    transitionOut: ['fade-out'],
                    duration: 200
                }}
            >
                <div
                    className="fixed top-0 left-0 z-10 w-100 h-100dvh overflow-hidden"
                    style={{
                        zIndex: 15001,
                        background: 'var(--neutral-light-900)'
                    }}
                    role="dialog"
                >
                    <div className="flex w-100 h-100 jc-center ai-center overflow-hidden">
                        {children}
                    </div>
                </div>
            </Motion>
        </Portal>
    );
}

MediaScrollerExpandedWrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default MediaScrollerExpandedWrapper;
