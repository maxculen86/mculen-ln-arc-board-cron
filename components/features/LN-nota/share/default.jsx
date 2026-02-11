import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useDisclosure } from '@ln/hooks';
import { Dialog } from '@ln/common-ui-dialog';
import { cx } from '@ln/cva';
import config from '../../../../properties/sites/la-nacion-ar';
import useTermica from '../../../private/common/hooks/useTermica';
import useCheckBookmark from '../../../private/common/hooks/bookmark/useCheckBookmark';
import BuildSecondButtonsGroup from './_children/BuildSecondButtonsGroup';
import BuildFirstButtonsGroup from './_children/BuildFirstButtonsGroup';
import { Divider } from './_children/Divider';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../private/common/auth/helper/loginHelper';
import useAuthManager from '../../../private/common/auth/hooks/useAuthManager';
import BarrierRequiresSubscription from '../../LN-10-global/common/barrierRequiresSubscription/default';
import { a11yAttrsBarrierSub } from '../../../private/common/audioNews/helpers';

import '../../../../resources/dist/css/ln/modules/mod-share.css';
import {
    subtypesWithHorizontalShare,
    layoutBySubtype,
    shareContainerVariant,
    hasSticky,
    negativeSubtypes
} from './_children/helper';
import { NOTICIA } from '../../../private/common/utils/subtypes/subtypeHelper';

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

    const isHorizontal = subtypesWithHorizontalShare.includes(subtype);
    const layout = layoutBySubtype[subtype];

    const isNegative = negativeSubtypes.includes(subtype);
    const suscription = isSubscribed(SUBSCRIBED_HELPER.LN);

    const isNotaNoticia = subtype === NOTICIA;

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

    const modShareContainerSubClasses = shareContainerVariant({
        sticky: hasSticky(subtype),
        subtype: layout
    });

    const modShareContainerClass = cx(
        'mod-share-container',
        '--no-app',
        layout === 'videoVertical' ? 'pb-16 pb-0_m' : 'py-12 mb-16 mb-0_l',
        modShareContainerSubClasses
    );

    const shareSubClasses = isHorizontal
        ? 'mb-8_l'
        : 'flex-column_l bg-light-0 pb-16_l pt-8_l px-8_l';
    const shareClasses = cx('share', 'flex relative z-100', shareSubClasses);

    const firstGroupProps = {
        bookmark,
        setBookmark,
        termicaBookmark,
        globalContent,
        suscription,
        isNegative,
        subtype,
        openBarrier,
        isHorizontal
    };

    const secondGroupProps = {
        requestUri,
        host: config.host,
        title,
        mobileTitle,
        isNegative,
        articleId: id,
        isHorizontal,
        isNotaNoticia
    };
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
                    <BuildFirstButtonsGroup {...firstGroupProps} />

                    <Divider
                        variant={isHorizontal ? 'vertical' : 'horizontal'}
                    />

                    <BuildSecondButtonsGroup {...secondGroupProps} />
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
