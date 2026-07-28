import React from 'react';
import { Dialog } from '@ln/common-ui-dialog';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { cx } from '@ln/cva';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { getVariantBarrier } from '../emptyState/helpers';
import { EmptyStateDS } from '../../../ui/foodit/emptyState/default';

export function DialogFoodit({
    isOpen,
    onClose,
    userType,
    isSubscribed,
    children = null
}) {
    const classContainer = cx(
        'mx-auto',
        isSubscribed
            ? 'pt-16 pb-16 pb-24_md pb-32_lg px-16 px-24_md px-32_lg w-100 w-520_md shadow-up-md'
            : 'p-16 p-24_md p-32_lg max-w-328 min-w-720_md min-w-944_lg bg-positive rounded-4 overflow-hidden'
    );

    const position = isSubscribed ? 'bottom' : 'center';

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            position={position}
            classnames={{
                base: classContainer,
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
                {isSubscribed ? (
                    children
                ) : (
                    <EmptyStateDS
                        variant={getVariantBarrier(userType)}
                        className="pt-4 pt-12_md pt-20_lg"
                        comesFrom="DialogFoodit"
                    />
                )}
            </Dialog.Body>
        </Dialog>
    );
}
