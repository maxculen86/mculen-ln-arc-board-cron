import React, { useState } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useDisclosure } from '@ln/hooks';

import useAuthManager from '../../../private/common/auth/hooks/useAuthManager';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../private/common/auth/helper/loginHelper';
import { useAudioPlayer } from '../../../private/common/audioNews/hooks/useAudioPlayer';
import { SignatureContextProvider } from '../../../private/common/audioNews/hooks/SignatureContext';
import { useSignature } from '../../LN-nota/signature/hook/useSignature';
import useShare from '../../LN-nota/share/hooks/useShare';
import isSSR from '../../../private/LN/common/utils/isSSR';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import { isCustomVoice } from '../../../../content/sources/utils/audioNews/helper';
import config from '../../../../properties/sites/la-nacion-ar';

import useBookmark from './hooks/useBookmark';
import useComments from './hooks/useComments';
import useIaSummary from './hooks/useIaSummary';

import BarrierRequiresSubscription from '../common/barrierRequiresSubscription/default';
import { AudioButton } from './components/audioButton';
import BuildAudioPlayer from './components/buildAudioPlayer';
import BookmarkButton from './components/bookmarkButton';
import SummaryButton from './components/summaryButton';
import CommentsButton from './components/commentsButton';
import ShareButton from './components/shareButton';
import ShareMenu from './components/shareMenu';
import WhatsappShareButton from './components/whatsappShareButton';

import handleShareClick from './_helpers';

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
        setEnableButton
    } = audioPlayerProps;

    const customVoice = isCustomVoice(dataAuthor);
    const showVariantIa = customVoice && thermicalAudio && authors.length <= 1;

    const { copy, setCopy, shareButton } = useShare({
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
        isOpen: isOpenAudioPlayer,
        setEnableButton,
        noteId,
        playbackState: 'playing',
        onCloseAudioPlayer,
        showVariantIa
    };

    const shareMenuData = {
        isOpen: isShareOpen,
        requestUri,
        title,
        mobileTitle,
        setCopied: setCopy,
        onClose: () => setIsShareOpen(false)
    };

    const handleShare = () =>
        handleShareClick({
            shareButton,
            toggleShareMenu: () => setIsShareOpen(prev => !prev),
            noteId,
            title
        });

    if (isSSR()) return null;

    return (
        <SignatureContextProvider>
            {isBarrierOpen && (
                <BarrierRequiresSubscription
                    isLogged={!!token}
                    closeBarrier={closeBarrier}
                />
            )}
            <div className="flex items-center gap-2">
                <AudioButton {...audioButtonData} />
                <BuildAudioPlayer {...audioPlayerData} />
                <BookmarkButton {...bookmarkData} />
                <SummaryButton {...iaSummary} />
                <CommentsButton {...commentsData} />
                <ShareButton onClick={handleShare} />
                <WhatsappShareButton requestUri={requestUri} title={title} />
                <ShareMenu {...shareMenuData} />
                {copy && (
                    <span className="absolute top-full mt-2 text-12">
                        Link copiado
                    </span>
                )}
            </div>
        </SignatureContextProvider>
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
    })
};

ToolBar.defaultProps = {
    customFields: {
        hideSummary: false
    }
};

export default ToolBar;
