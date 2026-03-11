import React, { useState } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useDisclosure } from '@ln/hooks';

import useAuthManager from '../../../private/common/auth/hooks/useAuthManager';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../private/common/auth/helper/loginHelper';
import { useSignature } from '../DS-Signature/hooks/useSignature';
import { ToolbarProvider } from './context/ToolbarContext';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import { isCustomVoice } from '../../../../content/sources/utils/audioNews/helper';
import config from '../../../../properties/sites/la-nacion-ar';
import useBookmark from './hooks/useBookmark';
import useComments from './hooks/useComments';
import useIaSummary from './hooks/useIaSummary';
import BarrierRequiresSubscription from '../common/barrierRequiresSubscription/default';
import { AudioButton } from './components/audioButton';
import BookmarkButton from './components/bookmarkButton';
import SummaryButton from './components/summaryButton';
import CommentsButton from './components/commentsButton';
import ShareMobileTrigger from './components/shareMobileTrigger';
import ShareDesktopTrigger from './components/shareDesktopTrigger';
import WhatsappShareButton from './components/whatsappShareButton';
import Divider from '../../ui/ln/divider/default';
import BuildAudioPlayerRender from './components/buildAudioPlayerRender';
import useNativeShare from './hooks/useNaviteShare';
import useAudioPlayer from './hooks/useAudioPlayer';

function ToolBar({ customFields: { hideSummary = false } = {} }) {
    const { globalContent = {}, requestUri } = useAppContext();

    const {
        _id: noteId,
        headlines: { basic: title, mobile: mobileTitle } = {},
        comments: { display_comments: displayComments = true } = {},
        first_publish_date: firstPublishDate,
        content_elements: contentElements,
        credits: { by: creditsBy } = {},
        isListenable
    } = globalContent;

    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);

    const {
        isOpen: isBarrierOpen,
        onOpen: openBarrier,
        onClose: closeBarrier
    } = useDisclosure(false);

    const { token, accessToken } = useAuthManager();
    const suscription = isSubscribed(SUBSCRIBED_HELPER.LN);

    const { authors, dataAuthor } = useSignature({
        creditsBy,
        position: 'Top',
        contentElements
    });

    const { audioPlayerProps = {} } = useAudioPlayer({ isListenable });
    const {
        thermicalAudio,
        onCloseAudioPlayer,
        isOpenAudioPlayer,
        setDisableButton
    } = audioPlayerProps;

    const customVoice = isCustomVoice(dataAuthor);
    const showVariantIa = customVoice && thermicalAudio && authors.length <= 1;

    const { shareNativeTrigger } = useNativeShare({
        mobileTitle,
        basic: title,
        host: config.host,
        requestUri
    });

    const bookmarkData = useBookmark({
        noteId,
        suscription,
        token,
        accessToken,
        globalContent,
        openBarrier
    });

    const commentsData = useComments({
        noteId,
        firstPublishDate,
        displayComments
    });

    const iaSummary = useIaSummary({
        globalContent,
        suscription,
        openBarrier,
        hideSummary
    });

    const audioButtonData = {
        variant: showVariantIa ? 'ia' : 'default',
        audioPlayerProps,
        openBarrier,
        subscription: suscription
    };

    const audioPlayerData = {
        isOpenAudioPlayer,
        setDisableButton,
        noteId,
        playbackState: 'playing',
        onCloseAudioPlayer,
        showVariantIa
    };

    const shareDesktopTriggerData = {
        isShareOpen,
        setIsShareOpen,
        requestUri,
        title,
        mobileTitle
    };

    return (
        <ToolbarProvider
            value={{
                isAudioPlaying,
                setIsAudioPlaying
            }}
        >
            <BarrierRequiresSubscription
                isOpen={isBarrierOpen}
                isLogged={!!token}
                closeBarrier={closeBarrier}
            />
            <div className="flex items-center gap-16">
                <div className="flex items-center gap-8 md:gap-16">
                    <AudioButton {...audioButtonData} />
                    <BookmarkButton {...bookmarkData} />
                    <SummaryButton {...iaSummary} />
                    <CommentsButton {...commentsData} />
                </div>
                <Divider direction="vertical" />
                <div className="flex items-center max-lg:gap-8 md:ml-[-16px]">
                    <ShareMobileTrigger
                        shareNativeTrigger={shareNativeTrigger}
                        noteId={noteId}
                        title={title}
                    />
                    <ShareDesktopTrigger {...shareDesktopTriggerData} />
                    <WhatsappShareButton
                        requestUri={requestUri}
                        title={title}
                    />
                </div>
            </div>
            <BuildAudioPlayerRender audioPlayerData={audioPlayerData} />
        </ToolbarProvider>
    );
}

ToolBar.label = 'LN-DS-ToolBar';

ToolBar.propTypes = {
    customFields: PropTypes.shape({
        hideSummary: PropTypes.bool.tag({
            name: 'Ocultar Resumen',
            description: 'Definí la visibilidad del resumen',
            default: false,
            group: groupCustomFields
        })
    }).isRequired
};

export default ToolBar;
