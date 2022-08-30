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
    showToast,
    showBarrier,
    isSuscription,
    scrollAddClass,
    scrollShare
} from '../../../private/LN/common/utils/shareHelper';
import BuildSecondButtonsGroup from './_children/BuildSecondButtonsGroup';
import BuildFirstButtonsGroup from './_children/BuildFirstButtonsGroup';
import '../../../../resources/dist/css/ln/modules/mod-share.css';
import Icon from '../../../private/common/icon';

const Share = () => {
    const { globalContent, requestUri } = useAppContext() || {};
    const {
        _id: id,
        headlines: { basic: title, mobile: mobileTitle } = {},
        subtype
    } = globalContent;

    const [bookmark, setBookmark] = useState(false);
    const [toast, setToast] = useState(false);
    const [barrier, setBarrier] = useState(false);
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
            <div
                className="mod-share"
                ref={shareContainer}
                onScroll={() => {
                    scrollShare(shareContainer.current, share.current);
                }}
            >
                <Icon name="arrow-left" />
                {showToast(termicaBookmark, toast, setToast)}
                {showBarrier(termicaBookmark, barrier, token, setBarrier)}
                <div id="v-share" className="share" ref={share}>
                    <BuildFirstButtonsGroup
                        bookmark={bookmark}
                        setBookmark={setBookmark}
                        termicaBookmark={termicaBookmark}
                        globalContent={globalContent}
                        token={token}
                        toast={toast}
                        setToast={setToast}
                        setBarrier={setBarrier}
                        suscription={suscription}
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
