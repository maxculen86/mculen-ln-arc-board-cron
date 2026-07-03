import React, { useEffect, useState, useRef } from 'react';
import { SITE_LANACION } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import { useDisclosure } from '@ln/hooks';
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

import '../../../../resources/dist/css/ln/modules/mod-share.css';
import {
    subtypesWithHorizontalShare,
    layoutBySubtype,
    shareContainerVariant,
    hasSticky,
    negativeSubtypes
} from './_children/helper';
import { NOTICIA } from '../../../private/common/utils/subtypes/subtypeHelper';
import GoogleButton from '../../LN-10-global/common/googleButton/default';
import BarrierRequiresSubscription from '../../LN/common/barrierRequiresSubscription/default';
import useWrapDetect from './hooks/useWrapDetect';

function Share() {
    const { globalContent, requestUri } = useAppContext() || {};
    const {
        _id: id,
        headlines: { basic: title, mobile: mobileTitle } = {},
        subtype
    } = globalContent;

    const [bookmark, setBookmark] = useState('');
    const [barrierMessage, setBarrierMessage] = useState('');
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
        onOpen,
        onClose: closeBarrier
    } = useDisclosure(false);

    const openBarrier = message => {
        setBarrierMessage(message);
        onOpen();
    };

    useEffect(() => {
        if (termicaBookmark) setBookmark(checkBookmarkId);
    }, [termicaBookmark, checkBookmarkId]);

    const shareContainer = useRef();
    const share = useRef();
    const googleBtnRef = useRef();

    const isGoogleWrapped = useWrapDetect(share, googleBtnRef);

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
        host: SITE_LANACION || config.host,
        title,
        mobileTitle,
        isNegative,
        articleId: id,
        isHorizontal,
        isNotaNoticia
    };
    return (
        <div className={modShareContainerClass}>
            <BarrierRequiresSubscription
                isLogged={!!token}
                isOpen={isBarrierOpen}
                closeBarrier={closeBarrier}
                message={barrierMessage}
            />
            <div
                className="mod-share flex flex-column mb-0 p-0_l gap-24"
                ref={shareContainer}
            >
                <div
                    id="v-share"
                    className={cx(shareClasses, 'flex-wrap gap-16')}
                    ref={share}
                >
                    <BuildFirstButtonsGroup {...firstGroupProps} />
                    <Divider
                        variant={isHorizontal ? 'vertical' : 'horizontal'}
                    />
                    <BuildSecondButtonsGroup {...secondGroupProps} />

                    <GoogleButton
                        ref={googleBtnRef}
                        tooltipPlacement={isGoogleWrapped ? 'right' : 'top'}
                        className={cx('inline-flex lg:hidden max-w-fit')}
                        btnText="Agregar en"
                    />
                </div>
            </div>
        </div>
    );
}

Share.label = 'LN-Nota-Share';

export default Share;
