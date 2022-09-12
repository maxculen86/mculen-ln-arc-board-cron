/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import config from '../../../../properties/sites/la-nacion-ar';
import useTermica from '../../../private/common/hooks/useTermica';
import getToken from '../../../private/common/utils/getToken';
import useCheckBookmark from '../../../private/common/hooks/bookmark/useCheckBookmark';
import ComLine from '../../../private/common/com-line';
import {
    getClassCondition,
    isSuscription,
    scrollAddClass,
    scrollShare
} from '../../../private/LN/common/utils/shareHelper';
import BuildSecondButtonsGroup from './_children/BuildSecondButtonsGroup';
import BuildFirstButtonsGroup from './_children/BuildFirstButtonsGroup';
import Icon from '../../../private/common/icon';
import ShowBarrier from '../../../private/LN/common/utils/showBarrier';
import BuildAudioPlayer from '../../../private/common/audioNews/BuildAudioPlayer';
import ShowToast from '../../../private/LN/common/utils/showToast';
import '../../../../resources/dist/css/ln/modules/mod-share.css';

const Share = () => {
    const { globalContent, requestUri } = useAppContext() || {};
    const {
        _id: id,
        headlines: { basic: title, mobile: mobileTitle } = {},
        subtype,
        last_updated_date: date
    } = globalContent;

    const [bookmark, setBookmark] = useState(false);
    const [openPlayer, setOpenPlayer] = useState(false);

    const token = getToken();
    const termicaBookmark = useTermica('bookmark_web');

    const classCondition = getClassCondition(subtype);

    const suscription = isSuscription(token);
    const checkBookmarkId = useCheckBookmark(
        termicaBookmark,
        token,
        id,
        suscription
    );

    useEffect(() => {
        termicaBookmark && setBookmark(checkBookmarkId);
    }, [termicaBookmark, checkBookmarkId]);

    const shareContainer = useRef();
    const share = useRef();

    useEffect(() => {
        scrollAddClass(shareContainer.current, share.current);
    }, []);

    return (
        <div className={`mod-share-container${classCondition}`}>
            <ShowToast />
            <ShowBarrier token={token} />
            <div
                className="mod-share"
                ref={shareContainer}
                onScroll={() => {
                    scrollShare(shareContainer.current, share.current);
                }}
            >
                <Icon name="arrow-left" />
                <div id="v-share" className="share" ref={share}>
                    <BuildFirstButtonsGroup
                        bookmark={bookmark}
                        setBookmark={setBookmark}
                        termicaBookmark={termicaBookmark}
                        globalContent={globalContent}
                        token={token}
                        suscription={suscription}
                        openPlayer={openPlayer}
                        setOpenPlayer={setOpenPlayer}
                    />

                    <ComLine />

                    <BuildSecondButtonsGroup
                        requestUri={requestUri}
                        host={config.host}
                        title={title}
                        mobileTitle={mobileTitle}
                    />
                </div>
                <Icon name="arrow-right" />
            </div>
            {openPlayer && (
                <BuildAudioPlayer
                    openPlayer={openPlayer}
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
