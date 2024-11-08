import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Dialog as DialogLib } from '@ln/common-ui-dialog';
import { useDialog } from '../hooks/useDialog';
import { Header } from './header';
import { Disclaimer } from './disclaimer';

import '../../../../../resources/packages/css/@ln/common-ui-dialog/index.css';

// eslint-disable-next-line react/prop-types
export function Dialog({ glossaryData = [] }) {
    const { key, value, isOpen, onClose } = useDialog(glossaryData);

    return (
        <DialogLib
            position="bottom"
            isOpen={isOpen}
            onClose={onClose}
            id="drawer-glossary"
            classnames={{
                base: 'w-100 rounded-4 p-16 gap-8',
                wrapper: 'grid gap-8'
            }}
            overlay
            disabeBodyScroll
        >
            <DialogLib.Header
                className="flex-column gap-16"
                closeButtonProps={{
                    className: 'as-flex-end',
                    title: 'Cerrar'
                }}
            >
                <Header keyGlossary={key} isDialog />
            </DialogLib.Header>
            <DialogLib.Body>
                <Text as="p" className="text-16">
                    {value}
                </Text>
            </DialogLib.Body>
            <DialogLib.Footer>
                <Disclaimer />
            </DialogLib.Footer>
        </DialogLib>
    );
}

export default Dialog;
