import React from 'react';
import { useAppContext } from 'fusion:context';
import { AnimatedIcons } from '@ln/contenidos-ui-animatedicons';
import useTermica from '../../../../private/common/hooks/useTermica';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import getToken from '../../../../private/common/utils/getToken';
import { handleClickAudioNews } from '../../common/audioPlayer/helpers';
import { useAudioPlayerState } from '../../common/audioPlayer/hooks/useAudioPlayerState';

export function AudioButton({
    noteId,
    showVariantIa = false,
    openBarrier,
    subscription
}) {
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();
    const { isListenable } = globalContent;
    const showListenButton =
        !useTermica('hide_listening_articles') && isListenable;

    const { isOpen, isPlaying, hasError } = useAudioPlayerState();
    const token = getToken();

    const handleClickAudioButton = () => {
        handleClickAudioNews({
            noteId,
            globalContent,
            globalContentConfig,
            isSummary: false,
            showVariantIa,
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
            disabled={isOpen || hasError}
            textTransform="none"
            weight="bold"
            iconLeft={
                isOpen ? (
                    <AnimatedIcons
                        name="logo-listen"
                        height={20}
                        width={20}
                        fill="currentColor"
                        stopAnimation={!isPlaying}
                    />
                ) : (
                    <Icon name="headphone" />
                )
            }
        >
            <span className="max-md:hidden text-label-sm">
                {isOpen ? 'Escuchando' : 'Escuchar'}
            </span>
        </Button>
    );
}
