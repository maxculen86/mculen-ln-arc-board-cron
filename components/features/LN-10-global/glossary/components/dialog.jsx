import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Dialog as DialogLib } from '@ln/common-ui-dialog';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/common-ui-button';
import { useDialog } from '../hooks/useDialog';
import Header from './header';
import DisclaimerIA from '../../common/disclaimerIa/default';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { a11yAttrsDialogGlossary } from '../helpers';
import '../../../../../resources/packages/css/@ln/common-ui-dialog/index.css';

// eslint-disable-next-line react/prop-types
function Dialog({ glossaryData = [] }) {
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
            {...a11yAttrsDialogGlossary}
        >
            <DialogLib.Header className="flex-column gap-16">
                <Header keyGlossary={key} isDialog />
                <Button
                    onClick={onClose}
                    className="as-flex-end"
                    aria-label="Cerrar"
                    title="Cerrar"
                >
                    <Icon>
                        <IconSprite name="close" />
                    </Icon>
                </Button>
            </DialogLib.Header>
            <DialogLib.Body>
                <Text
                    as="p"
                    className="text-16"
                    id={a11yAttrsDialogGlossary['aria-describedby']}
                >
                    {value}
                </Text>
            </DialogLib.Body>
            <DialogLib.Footer>
                <DisclaimerIA text="Realizado con IA" />
            </DialogLib.Footer>
        </DialogLib>
    );
}

export default Dialog;
