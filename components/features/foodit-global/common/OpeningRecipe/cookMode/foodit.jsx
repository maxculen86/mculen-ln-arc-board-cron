import React, { useEffect, useState } from 'react';
import { drawerManager } from '@ln/ds-common-drawer';
import { Tooltip } from '@ln/ds-common-tooltip';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';
import Button from '../../../../ui/foodit/button/foodit';
import { DRAWERS_ID } from '../../DrawerSections/helpers';
import { DrawerMode } from './components/drawerMode';
import { DialogFoodit } from '../../DialogFoodit/foodit';
import useGetUserConfig from '../../../hooks/useGetUserConfig';
import { AudioProvider } from '../../AudioFoodit/AudioContext';
import Icon from '../../../../ui/foodit/icon/default';

function DataTwWrapper({ children, show, onExitComplete }) {
    useEffect(() => {
        if (!show) onExitComplete?.();
    }, [show, onExitComplete]);
    return <div data-tw>{children}</div>;
}

export function CookMode({ title, article }) {
    const { isSubscribed, userType } = useGetUserConfig();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);

    const handleClick = () => {
        addEventToDataLayerV2({
            event: 'e_linkclick',
            category: 'interaction',
            label: 'start',
            action: 'cook_mode'
        });
        if (isSubscribed) {
            setIsAudioEnabled(true);
            drawerManager.show(DRAWERS_ID.COOK_MODE);
        } else {
            setIsDialogOpen(true);
        }
    };

    return (
        <>
            <div data-tw>
                <Tooltip
                    autoClose={7000}
                    placement="bottom"
                    open={isTooltipOpen}
                    onOpenChange={setIsTooltipOpen}
                >
                    <Tooltip.Trigger>
                        <Button
                            onClick={handleClick}
                            rounded="custom"
                            size="custom"
                            color="custom"
                            variant="outline"
                            className="text-12 px-16 py-8 xl:py-12 rounded-4 text-accent-default hover:opacity-80"
                        >
                            <Icon size={16} name="play" />
                            ESCUCHAR PREPARACIÓN
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                        style={{ zIndex: 14 }}
                        customWidth
                        color="accent"
                        className="w-152"
                        customWrapper={DataTwWrapper}
                    >
                        Seguí el paso a paso con el Modo Cocina
                    </Tooltip.Content>
                </Tooltip>
            </div>
            {!isSubscribed && (
                <DialogFoodit
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    isSubscribed={isSubscribed}
                    userType={userType}
                />
            )}
            {isSubscribed && isAudioEnabled && (
                <AudioProvider article={article} autoStart>
                    <DrawerMode title={title} article={article} />
                </AudioProvider>
            )}
            {isSubscribed && !isAudioEnabled && (
                <DrawerMode title={title} article={article} />
            )}
        </>
    );
}
