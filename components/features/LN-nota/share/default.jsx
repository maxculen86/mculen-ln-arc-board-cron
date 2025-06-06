import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useDisclosure } from '@ln/hooks';
import { Dialog } from '@ln/common-ui-dialog';
import { cx } from '@ln/cva';
import config from '../../../../properties/sites/la-nacion-ar';
import useTermica from '../../../private/common/hooks/useTermica';
import useCheckBookmark from '../../../private/common/hooks/bookmark/useCheckBookmark';
import { getClassCondition } from '../../../private/LN/common/utils/shareHelper';
import BuildSecondButtonsGroup from './_children/BuildSecondButtonsGroup';
import BuildFirstButtonsGroup from './_children/BuildFirstButtonsGroup';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../private/common/auth/helper/loginHelper';
import useAuthManager from '../../../private/common/auth/hooks/useAuthManager';
import BarrierRequiresSubscription from '../../LN-10-global/common/barrierRequiresSubscription/default';
import { a11yAttrsBarrierSub } from '../../../private/common/audioNews/helpers';

import '../../../../resources/dist/css/ln/modules/mod-share.css';
import {
    LIVEBLOG_EDITORIAL,
    VIDEO
} from '../../../private/common/utils/subtypes/subtypeHelper';

function Share() {
    const { globalContent, requestUri } = useAppContext() || {};
    const {
        _id: id,
        headlines: { basic: title, mobile: mobileTitle } = {},
        subtype
    } = globalContent;

    const [bookmark, setBookmark] = useState('');

    const { token, accessToken } = useAuthManager();
    const termicaBookmark = useTermica('bookmark_web');

    const subtypesWithCustomLayout = [VIDEO, LIVEBLOG_EDITORIAL];
    const isCustomLayout = subtypesWithCustomLayout.includes(subtype);
    const subtypeVideo = getClassCondition(subtype);
    const suscription = isSubscribed(SUBSCRIBED_HELPER.LN);

    const checkBookmarkId = useCheckBookmark(
        termicaBookmark,
        token,
        accessToken,
        id,
        suscription
    );

    const {
        isOpen: isBarrierOpen,
        onOpen: openBarrier,
        onClose: closeBarrier
    } = useDisclosure(false);

    useEffect(() => {
        if (termicaBookmark) setBookmark(checkBookmarkId);
    }, [termicaBookmark, checkBookmarkId]);

    const shareContainer = useRef();
    const share = useRef();

    const modShareContainerSubClasses = cx({
        'sticky float-l_l z-101 transition transition-all transition-duration-250 top-73_min1024':
            !isCustomLayout,
        '-order-1 ratio-auto order-initial_min1024': subtype === VIDEO
    });

    const modShareContainerClass = cx(
        'mod-share-container py-12 mb-16 mb-0_l border border-bottom border-thin border-neutral-light-100 border-0_l',
        '--no-app',
        subtypeVideo,
        modShareContainerSubClasses,
        {
            'border-transparent': subtype === LIVEBLOG_EDITORIAL
        }
    );

    const shareSubClasses = isCustomLayout
        ? 'mb-8_l'
        : 'flex-column_l bg-light-0 pb-16_l pt-8_l px-8_l';
    const shareClasses = cx('share', 'flex relative z-100', shareSubClasses);

    const hrVideoClasses = cx(
        isCustomLayout && 'vertical border border-neutral-dark-300'
    );

    return (
        <div className={modShareContainerClass}>
            <Dialog
                isOpen={isBarrierOpen}
                onClose={closeBarrier}
                position="center"
                id="audio-player-barrier"
                classnames={{
                    base: 'w-100 w-720_md bg-transparent px-16 w-shadow-up-md'
                }}
                overlay
                closeOnClickOutside
                {...a11yAttrsBarrierSub}
            >
                <BarrierRequiresSubscription
                    isLogged={!!token}
                    closeBarrier={closeBarrier}
                />
            </Dialog>
            <div className="mod-share flex mb-0 p-0_l" ref={shareContainer}>
                <div id="v-share" className={shareClasses} ref={share}>
                    <BuildFirstButtonsGroup
                        bookmark={bookmark}
                        setBookmark={setBookmark}
                        termicaBookmark={termicaBookmark}
                        globalContent={globalContent}
                        suscription={suscription}
                        subtypeVideo={subtypeVideo}
                        subtype={subtype}
                        openBarrier={openBarrier}
                    />

                    <hr className={hrVideoClasses} />

                    <BuildSecondButtonsGroup
                        requestUri={requestUri}
                        host={config.host}
                        title={title}
                        mobileTitle={mobileTitle}
                        subtypeVideo={subtypeVideo}
                        articleId={id}
                        subtype={subtype}
                    />
                </div>
            </div>
        </div>
    );
}

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
    }).isRequired
};

export default Share;
