import React from 'react';
import { useAppContext } from 'fusion:context';
import { AnimatedIcons } from '@ln/contenidos-ui-animatedicons';
import useTermica from '../../../../private/common/hooks/useTermica';
import { useSignatureContext } from '../../../../private/common/audioNews/hooks/SignatureContext';
import getToken from '../../../../private/common/utils/getToken';
import { getTextAndIconColor } from '../../../../private/common/audioNews/helpers';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import { handleClickAudioNews } from '../_helpers';

export function AudioButton({
    audioPlayerProps = {},
    variant,
    openBarrier,
    subscription
}) {
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();
    const { isListenable } = globalContent;
    const showListenButton =
        !useTermica('hide_listening_articles') && isListenable;

    const { enableButton, onOpenAudioPlayer, isOpenAudioPlayer } =
        audioPlayerProps;

    const { isSummary, isAudioPlaying } = useSignatureContext();

    const token = getToken();

    const handleClickAudioButton = () => {
        handleClickAudioNews({
            onOpenAudioPlayer,
            globalContent,
            globalContentConfig,
            isSummary,
            subscription,
            token,
            openBarrier
        });
    };

    const { text, iconColor } = getTextAndIconColor(isSummary, variant);

    if (!showListenButton) return null;

    return isOpenAudioPlayer ? (
        <div className="flex py-12 px-16 ai-center gap-8 h-40">
            {/* CREAR COMPONENTE FRONT */}
            <AnimatedIcons
                name="logo-listen"
                height={20}
                width={20}
                fill={iconColor}
                stopAnimation={!isAudioPlaying}
            />
            <span className="text-12 text-neutral-light-600">
                <strong>{text}</strong>
            </span>
        </div>
    ) : (
        <Button
            isIconOnly
            id="btnAudioDesktop"
            title="Escuchar nota"
            variant="primary"
            dataEvent="LinkClick"
            dataSection="Escuchar Nota"
            className="mr-16 ai-start_l --no-app"
            onClick={handleClickAudioButton}
            disabled={enableButton}
        >
            <Icon name="mediaPlay" />
            <span>Escuchar Nota</span>
        </Button>
    );
}
