import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { useAppContext } from 'fusion:context';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { AnimatedIcons } from '@ln/contenidos-ui-animatedicons';
import { Tooltip } from '@ln/common-ui-tooltip';
import { useDisclosure } from '@ln/hooks';
import {
    getTextAndIconColor,
    handleClickAudioNews
} from '../../../../features/LN/common/audioPlayer/helpers';
import getToken from '../../utils/getToken';
import { isSubscribed, SUBSCRIBED_HELPER } from '../../auth/helper/loginHelper';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import BarrierRequiresSubscription from '../../../../features/LN/common/barrierRequiresSubscription/default';
import { barrierMessages } from '../../../../features/LN/common/barrierRequiresSubscription/helper';
import { useAudioPlayerState } from '../../../../features/LN/common/audioPlayer/hooks/useAudioPlayerState';
import '../../../../../resources/packages/css/@ln/contenidos-ui-animatedicons/index.css';

export function AudioButton({
    noteId,
    withAudio,
    authorNames = [],
    showTooltipVariantIA,
    showVariantIa = false,
    variant,
    showListenButton
}) {
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();

    const { isOpen: showTooltipIAAuthor, onClose: closeTooltipIAAuthor } =
        useDisclosure(showTooltipVariantIA && authorNames?.length);

    const { isOpen, isPlaying, isSummary, hasError } = useAudioPlayerState();

    const subscription = isSubscribed(SUBSCRIBED_HELPER.LN);
    const token = getToken();

    const {
        isOpen: isBarrierOpen,
        onOpen: openBarrier,
        onClose: closeBarrier
    } = useDisclosure(false);

    const handleClickAudioButton = () => {
        handleClickAudioNews({
            noteId,
            globalContent,
            globalContentConfig,
            isSummary,
            showVariantIa,
            closeTooltipIAAuthor,
            subscription,
            token,
            openBarrier
        });
    };

    const { text, iconColor } = getTextAndIconColor(isSummary, variant);

    const TooltipContent = (
        <>
            <Text className="text-12_130 block">Con la voz de</Text>
            <Text className="text-12_130 block">{authorNames}</Text>
        </>
    );

    if (!showListenButton || !withAudio) return null;

    return (
        <>
            <BarrierRequiresSubscription
                isLogged={!!token}
                isOpen={isBarrierOpen}
                closeBarrier={closeBarrier}
                message={barrierMessages.AUDIO}
            />
            {isOpen ? (
                <div className="flex py-12 px-16 ai-center gap-8 h-40">
                    <AnimatedIcons
                        name="logo-listen"
                        height={20}
                        width={20}
                        fill={iconColor}
                        stopAnimation={!isPlaying}
                    />
                    <Text className="text-12 text-neutral-light-600">
                        <strong>{text}</strong>
                    </Text>
                </div>
            ) : (
                <Tooltip
                    className="border border-all border-thin border-primary-ia shadow-xs rounded-4 bg-light-50"
                    position="right-center"
                    visible={showTooltipIAAuthor}
                    disableTrigger
                    content={TooltipContent}
                    style={{ maxWidth: '165px' }}
                >
                    <Button
                        id="btnAudioDesktop"
                        title="Escuchar nota"
                        variant="primary"
                        dataEvent="LinkClick"
                        dataSection="Escuchar Nota"
                        className="mr-16 ai-start_l --no-app"
                        onClick={handleClickAudioButton}
                        disabled={hasError}
                    >
                        <Icon size={16} color="#FEFEFE">
                            <IconSprite name="mediaPlay" />
                        </Icon>
                        <Text>Escuchar Nota</Text>
                    </Button>
                </Tooltip>
            )}
        </>
    );
}
