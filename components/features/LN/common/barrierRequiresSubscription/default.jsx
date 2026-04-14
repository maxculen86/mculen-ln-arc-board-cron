import React from 'react';
import { Modal } from '@ln/ds-common-modal';
import isSSR from '../../../../private/LN/common/utils/isSSR';
import { getConfigBarrierData } from '../../../LN-10-global/common/barrierRequiresSubscription/helpers';
import CONFIG_BARRIER from '../../../LN-10-global/common/barrierRequiresSubscription/_config';
import Badge from './components/Badge';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import Link from '../../../ui/ln/link/default';

function BarrierRequiresSubscription({
    isOpen = false,
    isLogged = '',
    closeBarrier = () => null
}) {
    const { button, title, message } = getConfigBarrierData(
        isLogged,
        CONFIG_BARRIER
    );

    const redirectCallback = !isSSR() ? window.btoa(window.location.href) : '';

    if (!isOpen) return null;

    // TODO: ajustar modal cuando diseño use componentes core del DS.
    return (
        <Modal
            open={isOpen}
            onOpenChange={closeBarrier}
            size="lg"
            variant="custom"
        >
            <Modal.Portal>
                <div data-tw>
                    <Modal.Overlay className="z-110" />
                    <Modal.Content className="data-[open=true]:z-111 bg-base-default text-base-foreground rounded-4">
                        <Modal.Body>
                            <Modal.CloseButton
                                containerClassName="ml-auto"
                                aria-label="Cerrar modal"
                                color="white"
                                title="Cerrar modal"
                            >
                                <Icon name="close" />
                            </Modal.CloseButton>
                            <div className="flex flex-col justify-center items-center gap-24 py-16 px-20 w-full pt-56">
                                <Badge />
                                <div className="flex flex-col justify-center items-center gap-16">
                                    <div className="text-center">
                                        {title && (
                                            <p
                                                className="font-primary font-w-medium text-20"
                                                // eslint-disable-next-line react/no-danger
                                                dangerouslySetInnerHTML={{
                                                    __html: title
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="w-full text-center flex flex-col justify-center items-center gap-16">
                                        <Button
                                            variant="solid"
                                            color="white"
                                            title="Suscribirme"
                                            asChild
                                            id="btnsuscribirme"
                                        >
                                            <a
                                                href={`${button.href}${redirectCallback}`}
                                                target="_self"
                                            >
                                                {button.label}
                                            </a>
                                        </Button>
                                        <div className="flex flex-col justify-center items-center gap-4">
                                            <span className="font-bold">
                                                {message.text}
                                            </span>
                                            <Link
                                                href={`${message.href}${redirectCallback}`}
                                                title="Iniciar sesión"
                                                color="custom"
                                                className="text-primary-lighten hover:opacity-80"
                                                weight="bold"
                                            >
                                                {message.textLink}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal.Content>
                </div>
            </Modal.Portal>
        </Modal>
    );
}

export default BarrierRequiresSubscription;
