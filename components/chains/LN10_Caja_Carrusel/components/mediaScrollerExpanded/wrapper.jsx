import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@ln/common-ui-dialog';
import { useCajaCarruselContext } from '../cajaCarruselContext';

import '../../../../../resources/packages/css/@ln/common-ui-dialog/index.css';

function MediaScrollerExpandedWrapper({ children }) {
    const { isOpenMediaScrollerExpanded, onCloseMediaScrollerExpanded } =
        useCajaCarruselContext();

    return (
        <Dialog
            isOpen={isOpenMediaScrollerExpanded}
            onClose={onCloseMediaScrollerExpanded}
            overlay
            position="center"
            classnames={{
                base: 'w-100 h-100vh bg-black-40',
                wrapper: 'flex w-100 h-100 jc-center ai-center scroll-y-none'
            }}
            style={{ '--_background-dialog': 'var(--neutral-light-900)' }}
        >
            {children}
        </Dialog>
    );
}

MediaScrollerExpandedWrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default MediaScrollerExpandedWrapper;
