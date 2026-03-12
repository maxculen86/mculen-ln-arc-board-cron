import React from 'react';
import { Dialog } from '@ln/common-ui-dialog';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import EmptyState from '../emptyState/foodit';
import { getVariantBarrier } from '../emptyState/helpers';

export function DialogBarrier({ isOpen, onClose, userType }) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            position="center"
            classnames={{
                base: 'p-16 p-24_md p-32_lg max-w-328 min-w-720_md min-w-944_lg bg-positive rounded-4',
                wrapper: 'flex flex-column gap-12'
            }}
            overlay
            closeOnClickOutside
        >
            <Dialog.Header className="flex flex-column ai-end">
                <Button
                    onClick={onClose}
                    variant="link"
                    title="Cerrar"
                    aria-label="Cerrar"
                >
                    <Icon>
                        <IconSprite name="close" />
                    </Icon>
                </Button>
            </Dialog.Header>
            <Dialog.Body>
                <EmptyState
                    variant={getVariantBarrier(userType)}
                    className="pt-4 pt-12_md pt-20_lg"
                    direction="column"
                />
            </Dialog.Body>
        </Dialog>
    );
}
