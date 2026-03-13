import React from 'react';
import { Dialog } from '@ln/common-ui-dialog';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { cx } from '@ln/cva';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';

export function SessionExpiredModal({ isOpen, onClose }) {
    const classContainer = cx(
        'mx-auto rounded-4 pt-16 pb-16 pb-24_md pb-32_lg px-16 px-24_md px-32_lg w-100 max-w-328 shadow-up-md'
    );

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            position="center"
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
            <Dialog.Body className="flex flex-column gap-16 gap-24_md text-center">
                <div className="flex flex-column gap-8">
                    <p className="prumo prumo-semibold text-24 text-28_md text-32_lg">
                        Sesión Expirada
                    </p>
                    <p className="roboto text-16">
                        Volvé al inicio para continuar usando Foodit.
                    </p>
                </div>
                <hr className="w-100" />
                <Button
                    fullWidth
                    variant="primary"
                    title="Volver al inicio"
                    href="/"
                >
                    Volver al inicio
                </Button>
            </Dialog.Body>
        </Dialog>
    );
}
