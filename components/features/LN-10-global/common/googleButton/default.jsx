import React, { useCallback } from 'react';
import { useAppContext } from 'fusion:context';
import { Text } from '@ln/common-ui-text';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { openGoogleDiscoverFollow } from '../../../../private/LN/common/utils/shareHelper';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import { NOTICIA } from '../../../../private/common/utils/subtypes/subtypeHelper';
import useGoogleTooltip from './hooks/useGoogleTooltip';
import Icon from '../../../ui/ln/icon/default';
import Button from '../../../ui/ln/button/default';
import Tooltip from '../../../ui/ln/tooltip/default';

const GoogleButton = React.forwardRef(
    (
        {
            className,
            tooltipPlacement = 'top',
            btnText = 'Agregar LA NACION en'
        },
        forwardedRef
    ) => {
        const { isVisible, handleClose, handleCTAClick, targetRef } =
            useGoogleTooltip();
        const { globalContent: { subtype } = {} } = useAppContext();
        const isNotaNoticia = subtype === NOTICIA;

        const setContainerRef = useCallback(
            node => {
                [targetRef, forwardedRef].forEach(ref => {
                    if (!ref) return;
                    if (typeof ref === 'function') ref(node);
                    else {
                        const mutable = ref;
                        mutable.current = node;
                    }
                });
            },
            [targetRef, forwardedRef]
        );

        if (!isNotaNoticia) return null;

        return (
            <div data-tw className="contents">
                <Tooltip open={isVisible} placement={tooltipPlacement}>
                    <Tooltip.Trigger asChild>
                        <div ref={setContainerRef} className={className}>
                            <Button
                                variant="solid"
                                color="white"
                                title="Agregar LA NACION en Google"
                                dataEvent="LinkClick"
                                dataSection="CompartirNotaLN"
                                onClick={() => {
                                    openGoogleDiscoverFollow();
                                    handleCTAClick();
                                    addEventToDataLayerV2({
                                        event: 'e_linkclick',
                                        action: 'toolbard',
                                        category: 'nota_ln9',
                                        label: 'seguir_google'
                                    });
                                }}
                                className="px-12 border-1 border-neutral-100"
                                size={40}
                                textTransform="none"
                                weight="regular"
                            >
                                <Text className="text-label-sm font-secondary ">
                                    {btnText}
                                </Text>

                                <Icon color="inherit" size={20}>
                                    <IconSprite name="googleColor" color />
                                </Icon>
                            </Button>
                        </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content color="accent" arrow>
                        <div className="max-w-170 flex gap-4">
                            <span className="font-secondary font-w-normal text-small-lg text-center">
                                Agregar LA NACION como medio preferido en Google
                            </span>
                            <Button
                                isIconOnly
                                size="custom"
                                className="w-16 h-16 p-8 rounded-full bg-muted"
                                onClick={e => {
                                    e.stopPropagation();
                                    handleClose();
                                }}
                                aria-label="Cerrar"
                                title="Cerrar"
                                variant="solid"
                                color="custom"
                                rounded="custom"
                            >
                                <Icon
                                    name="close"
                                    size={14}
                                    fill="bg-base-default"
                                />
                            </Button>
                        </div>
                    </Tooltip.Content>
                </Tooltip>
            </div>
        );
    }
);

GoogleButton.displayName = 'GoogleButton';

export default GoogleButton;
