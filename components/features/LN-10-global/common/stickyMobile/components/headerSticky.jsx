import React from 'react';
import { Dialog } from '@ln/common-ui-dialog';
import { Text } from '@ln/contenidos-ui-text';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

export function HeaderSticky({ handleClose }) {
    return (
        <Dialog.Header className="sticky-v2-header bg-blue-500 jc-between ai-center px-16">
            <Icon size={28}>
                <IconSprite name="productLn" fill="var(--neutral-light-1)" />
            </Icon>
            <Text
                as="h3"
                className="arial text-16 text-neutral-light-1 font-bold"
            >
                Lo más leído
            </Text>
            <Button
                onClick={handleClose}
                id="stickyMobileCloseTestId"
                iconOnly
                size="inherit"
                aria-hidden="true"
            >
                <Icon size={24}>
                    <IconSprite name="close" fill="var(--neutral-light-1)" />
                </Icon>
            </Button>
        </Dialog.Header>
    );
}

export default HeaderSticky;
