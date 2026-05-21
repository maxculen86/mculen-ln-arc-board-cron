import React from 'react';
import { useAppContext } from 'fusion:context';
import { Modal } from '@ln/ds-common-modal';
import Divider from '../../../ui/ln/divider/default';
import Image from '../../../ui/ln/image/default';
import Button from '../../../ui/ln/button/default';
import Link from '../../../ui/ln/link/default';
import BadgeBanner from '../bannerMessage/components/badgeBanner';
import { configBadgeSuscriptor } from '../bannerMessage/bannerHelper';
import getAssetsPath from '../../../../private/common/utils/getAssetsPath';
import { buttonData, loggedData, unLoggedData } from './helper';

function BarrierRequiresSubscription({
    isOpen = false,
    isLogged = false,
    closeBarrier = () => null,
    message = 'Para realizar esta acción adquirí una suscripción'
}) {
    if (!isOpen) return null;

    const { contextPath, deployment } = useAppContext();
    const imagePath = getAssetsPath(contextPath)(deployment)(
        'modal-suscriptores.webp'
    );
    const footerData = isLogged ? loggedData : unLoggedData;

    const { text, textLink, href } = footerData;

    return (
        <Modal
            open={isOpen}
            onOpenChange={closeBarrier}
            size="sm"
            variant="custom"
        >
            <Modal.Portal>
                <div data-tw>
                    <Modal.Overlay className="z-110" />
                    <Modal.Content className="data-[open=true]:z-111 rounded-8 w-328 max-w-328 xl:w-720 xl:max-w-720 overflow-hidden bg-neutral-1 border-1 border-muted">
                        <Modal.Body>
                            <section className="flex flex-col xl:flex-row gap-32">
                                <div className="hidden xl:flex justify-center w-full max-w-225">
                                    <Image
                                        renderImgOnly
                                        objectFit="cover"
                                        className="xl:aspect-9/16"
                                        src={imagePath}
                                    />
                                </div>
                                <div className="flex flex-col gap-16 px-16 py-32 items-center justify-center xl:pl-0 xl:pr-32">
                                    <BadgeBanner
                                        {...configBadgeSuscriptor}
                                        size={32}
                                    />
                                    <Divider className="max-w-100" />
                                    <h3 className="font-secondary text-heading-sm font-bold text-center">
                                        {message}
                                    </h3>
                                    <Button
                                        asChild
                                        color="subscription"
                                        textTransform="uppercase"
                                        aria-label={buttonData.text}
                                    >
                                        <Link href={buttonData.href}>
                                            {buttonData.text}
                                        </Link>
                                    </Button>
                                    <p className="flex flex-wrap justify-center gap-8 text-body-md text-center">
                                        {text}
                                        <Link
                                            className="leading-none"
                                            size={16}
                                            href={href}
                                        >
                                            {textLink}
                                        </Link>
                                    </p>
                                </div>
                            </section>
                        </Modal.Body>
                    </Modal.Content>
                </div>
            </Modal.Portal>
        </Modal>
    );
}

export default BarrierRequiresSubscription;
