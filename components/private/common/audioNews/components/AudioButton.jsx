import { Button } from '@ln/contenidos-ui-button';
import PropTypes from 'fusion:prop-types';
import React from 'react';
import { useAppContext } from 'fusion:context';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { AnimatedIcons } from '@ln/contenidos-ui-animatedicons';
import { Tooltip } from '@ln/common-ui-tooltip';
import { useDisclosure } from '@ln/hooks';
import { Dialog } from '@ln/common-ui-dialog';
import { getTextAndIconColor, handleClickAudioNews } from '../helpers';
import getToken from '../../utils/getToken';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../auth/helper/loginHelper';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import useTermica from '../../hooks/useTermica';
import { useSignatureContext } from '../hooks/SignatureContext';
import BarrierRequiresSubscription from '../../../../features/LN-10-global/common/barrierRequiresSubscription/default';

export function AudioButton({
    audioPlayerProps = {},
    withAudio,
    authorNames = [],
    showTooltipVariantIA,
    variant
}) {
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();
    const { isListenable } = globalContent;
    const showListenButton =
        !useTermica('hide_listening_articles') && isListenable;

    const { isOpen: showTooltipIAAuthor, onClose: closeTooltipIAAuthor } =
        useDisclosure(showTooltipVariantIA && authorNames?.length);

    const { enableButton, onOpenAudioPlayer, isOpenAudioPlayer } =
        audioPlayerProps;

    const { contentVariant, isAudioPlaying } = useSignatureContext();

    const subscription = isSubscribed(SUBSCRIBED_HELPER.LN);
    const token = getToken();
    const typeOfWindow =
        typeof window !== 'undefined' ? window.btoa(window.location.href) : '';

    const {
        isOpen: isBarrierOpen,
        onOpen: openBarrier,
        onClose: closeBarrier
    } = useDisclosure(false);

    const handleClickAudioButton = () => {
        handleClickAudioNews(
            onOpenAudioPlayer,
            globalContent,
            globalContentConfig,
            contentVariant,
            closeTooltipIAAuthor,
            subscription,
            token,
            openBarrier
        );
    };

    const { text, iconColor } = getTextAndIconColor(contentVariant, variant);

    if (!showListenButton || !withAudio) return null;

    return (
        <>
            <Dialog
                isOpen={isBarrierOpen}
                onClose={closeBarrier}
                position="bottom"
                id="audio-player-barrier"
                classnames={{
                    base: 'w-100 p-16 w-640_md shadow-up-md center-x',
                    wrapper: 'flex flex-column gap-12'
                }}
                style={{ zIndex: 15000 }}
            >
                <Dialog.Header
                    className="flex-column"
                    closeButtonProps={{
                        className: 'as-flex-end',
                        title: 'Cerrar'
                    }}
                />
                <BarrierRequiresSubscription
                    redirectCallback={typeOfWindow}
                    isLogged={!!token}
                />
            </Dialog>
            {isOpenAudioPlayer ? (
                <div className="flex py-12 px-16 jc-center ai-center gap-8">
                    <AnimatedIcons
                        name="logo-listen"
                        height={20}
                        width={20}
                        fill={iconColor}
                        stopAnimation={!isAudioPlaying}
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
                    content={
                        <>
                            <Text className="text-12_130 block">
                                Con la voz de
                            </Text>
                            <Text className="text-12_130 block">
                                {authorNames}
                            </Text>
                        </>
                    }
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
                        disabled={enableButton}
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

AudioButton.propTypes = {
    audioPlayerProps: PropTypes.shape({
        enableButton: PropTypes.bool.isRequired,
        onOpenAudioPlayer: PropTypes.func.isRequired,
        isOpenAudioPlayer: PropTypes.bool.isRequired
    }).isRequired,
    withAudio: PropTypes.bool.isRequired,
    authorNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    showTooltipVariantIA: PropTypes.bool.isRequired,
    variant: PropTypes.oneOf(['ia', 'default']).isRequired
};
