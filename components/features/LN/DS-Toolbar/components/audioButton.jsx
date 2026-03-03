import React from 'react';
import { useAppContext } from 'fusion:context';
import { AnimatedIcons } from '@ln/contenidos-ui-animatedicons';
import useTermica from '../../../../private/common/hooks/useTermica';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import { useToolbarContext } from '../context/ToolbarContext';
import getToken from '../../../../private/common/utils/getToken';
import { handleClickAudioNews } from '../_helpers';

export function AudioButton({
    audioPlayerProps = {},
    openBarrier,
    subscription
}) {
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();
    const { isListenable } = globalContent;
    const showListenButton =
        !useTermica('hide_listening_articles') && isListenable;

    const { disableButton, onOpenAudioPlayer, isOpenAudioPlayer } =
        audioPlayerProps;

    const { isSummary, isAudioPlaying } = useToolbarContext();

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

    if (!showListenButton) return null;
    return (
        <Button
            id="btnAudioDesktop"
            title="Escuchar nota"
            variant="outline"
            color="black"
            dataEvent="LinkClick"
            dataSection="Escuchar Nota"
            className="h-40 w-40 md:w-fit rounded-4 px-8 py-12 md:px-12 --no-app"
            onClick={handleClickAudioButton}
            disabled={isOpenAudioPlayer || disableButton}
            textTransform="none"
            weight="bold"
            iconLeft={
                isOpenAudioPlayer ? (
                    <AnimatedIcons
                        name="logo-listen"
                        height={20}
                        width={20}
                        fill="currentColor"
                        stopAnimation={!isAudioPlaying}
                    />
                ) : (
                    <Icon name="headphone" />
                )
            }
        >
            <span className="max-md:hidden text-label-sm">
                {isOpenAudioPlayer ? 'Escuchando' : 'Escuchar'}
            </span>
        </Button>
    );
}
