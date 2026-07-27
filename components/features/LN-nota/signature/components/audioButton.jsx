import React from 'react';
import { useAppContext } from 'fusion:context';
import { useDisclosure } from '@ln/hooks';
import { AnimatedIcons } from '@ln/contenidos-ui-animatedicons';
import '../../../../../resources/packages/css/@ln/contenidos-ui-animatedicons/index.css';
import { useAudioPlayerState } from '../../../LN/common/audioPlayer/hooks/useAudioPlayerState';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../private/common/auth/helper/loginHelper';
import getToken from '../../../../private/common/utils/getToken';
import { handleClickAudioNews } from '../../../LN/common/audioPlayer/helpers';
import BarrierRequiresSubscription from '../../../LN/common/barrierRequiresSubscription/default';
import { barrierMessages } from '../../../LN/common/barrierRequiresSubscription/helper';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';

export function AudioButton({
    noteId,
    withAudio,
    showVariantIa = false,
    showListenButton
}) {
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();

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
            subscription,
            token,
            openBarrier
        });
    };

    if (!showListenButton || !withAudio) return null;

    return (
        <>
            <BarrierRequiresSubscription
                isLogged={!!token}
                isOpen={isBarrierOpen}
                closeBarrier={closeBarrier}
                message={barrierMessages.AUDIO}
            />

            <div data-tw className="contents">
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
            </div>
        </>
    );
}
