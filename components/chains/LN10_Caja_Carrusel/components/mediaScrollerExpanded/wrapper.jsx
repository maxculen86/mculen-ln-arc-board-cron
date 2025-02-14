import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@ln/common-ui-dialog';
import { useCajaCarruselContext } from '../cajaCarruselContext';

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

MediaScrollerExpandedWrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default MediaScrollerExpandedWrapper;
