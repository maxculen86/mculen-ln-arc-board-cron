/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import config from '../../../../properties/sites/la-nacion-ar';
import useTermica from '../../../private/common/hooks/useTermica';
import useCheckBookmark from '../../../private/common/hooks/bookmark/useCheckBookmark';
import { getClassCondition } from '../../../private/LN/common/utils/shareHelper';
import BuildSecondButtonsGroup from './_children/BuildSecondButtonsGroup';
import BuildFirstButtonsGroup from './_children/BuildFirstButtonsGroup';
import ShowBarrier from '../../../private/common/barrier/showBarrier';
import BuildAudioPlayer from '../../../private/common/audioNews/BuildAudioPlayer';
import ShowToast from '../../../private/common/toast/showToast';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../auth/helper/loginHelper';
import useAuthManager from '../../../../auth/hooks/useAuthManager';
import '../../../../resources/dist/css/ln/modules/mod-share.css';
import classNames from 'classnames';

const Share = () => {
    const { globalContent, requestUri } = useAppContext() || {};
    const {
        _id: id,
        headlines: { basic: title, mobile: mobileTitle } = {},
        subtype,
        last_updated_date: date
    } = globalContent;

    const [bookmark, setBookmark] = useState('');
    const [openPlayer, setOpenPlayer] = useState(false);
    const [enableButton, setEnableButton] = useState(false);

    const { token, accessToken, isValidSectionForMVP2Auth0 } = useAuthManager();
    const termicaBookmark = useTermica('bookmark_web');
    const subtypeVideo = getClassCondition(subtype);
    const suscription = isSubscribed(SUBSCRIBED_HELPER.LN);

    const checkBookmarkId = useCheckBookmark(
        termicaBookmark,
        token,
        accessToken,
        id,
        suscription
    );

    useEffect(() => {
        termicaBookmark && setBookmark(checkBookmarkId);
    }, [termicaBookmark, checkBookmarkId]);

    const shareContainer = useRef();
    const share = useRef();

    const modShareContainerSubClasses = !subtypeVideo
        ? 'sticky float-l_l z-101 transition transition-all transition-duration-250 top-73_min1024'
        : '-order-1 ratio-auto order-initial_min1024';

    const modShareContainerClass = classNames(
        'mod-share-container py-12 mb-16 mb-0_l border border-bottom border-top border-thin border-neutral-light-100 border-0_l',
        '--no-app',
        subtypeVideo,
        modShareContainerSubClasses
    );

    const shareSubClasses = !subtypeVideo
        ? 'flex-column_l bg-light-0 pb-16_l pt-8_l px-8_l'
        : 'mb-8_l';
    const shareClasses = classNames(
        'share',
        'flex relative z-100',
        shareSubClasses
    );

    const hrVideoClasses = subtypeVideo ? 'border border-neutral-dark-300' : '';

    return (
        <div className={modShareContainerClass}>
            <ShowToast />
            <ShowBarrier token={token} />
            <div className="mod-share flex mb-0 p-0_l" ref={shareContainer}>
                <div id="v-share" className={shareClasses} ref={share}>
                    <BuildFirstButtonsGroup
                        bookmark={bookmark}
                        setBookmark={setBookmark}
                        termicaBookmark={termicaBookmark}
                        globalContent={globalContent}
                        token={token}
                        suscription={suscription}
                        openPlayer={openPlayer}
                        enableButton={enableButton}
                        setOpenPlayer={setOpenPlayer}
                        subtypeVideo={subtypeVideo}
                        isValidSectionForMVP2Auth0={isValidSectionForMVP2Auth0}
                    />

                    <hr className={hrVideoClasses} />

                    <BuildSecondButtonsGroup
                        requestUri={requestUri}
                        host={config.host}
                        title={title}
                        mobileTitle={mobileTitle}
                        subtypeVideo={subtypeVideo}
                    />
                </div>
            </div>
            {openPlayer && (
                <BuildAudioPlayer
                    setEnableButton={setEnableButton}
                    setOpenPlayer={setOpenPlayer}
                    publishDate={date}
                    noteId={id}
                />
            )}
        </div>
    );
};

Share.label = 'LN-Nota-Share';

Share.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        subtype: PropTypes.string,
        first_publish_date: PropTypes.string,
        headlines: PropTypes.shape({
            basic: PropTypes.string,
            mobile: PropTypes.string
        }),
        comments: PropTypes.shape({
            display_comments: PropTypes.bool
        })
    })
};

export default Share;
