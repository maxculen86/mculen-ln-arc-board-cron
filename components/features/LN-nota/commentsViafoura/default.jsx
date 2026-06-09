import React, { useState, useRef } from 'react';
import Consumer from 'fusion:consumer';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/ds-cva';
import {
    CLOSED_BY_TERMIC,
    useValidateComments
} from '../../../private/common/utils/commentsHelper';
import config from '../../../../properties/sites/la-nacion-ar';
import handleCookie from '../../../private/LN/common/utils/handleCookie';
import LoadingIcon from '../../../private/LN/common/loadingIcon';
import HeaderComments from '../../../private/LN/nota/comments/header';
import useTermica from '../../../private/common/hooks/useTermica';
import BannerMessage from '../../LN/common/bannerMessage/default';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../private/common/auth/helper/loginHelper';
import useLoadViafouraComments from './hooks/useLoadViafouraComments';
import '../../../../resources/dist/css/ln/modules/comments.css';
import ScrollToTopButton from '../../LN/common/scrollToTopButton/ScrollToTopButton';
import { scrollToElementWithOffset } from '../../../private/LN/common/utils/scrollToElementWithOffset';

function CommentsViafouraFeature(props) {
    const { layout } = useAppContext();
    const { layoutsName = {} } = config || {};
    const hiddenButton = [layoutsName.Cards].includes(layout);
    const { outputType, globalContent } = props || {};

    const { subtype, _id: articleId } = globalContent || {};

    const subscription = isSubscribed(SUBSCRIBED_HELPER.LN);
    const { messageType, shouldLoad, messageProps, setMessage } =
        useValidateComments(props, subscription);
    const termicaLivefyre = useTermica('livefyre');
    const { getCookie } = handleCookie();
    const [isReady, setIsReady] = useState(false);
    const showComponent = shouldLoad && termicaLivefyre;
    const containerRef = useRef(null);

    const onClickBtnUp = () => {
        const titleArticle = document.querySelector('h1.com-title, h1');
        if (titleArticle) {
            scrollToElementWithOffset(titleArticle);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useLoadViafouraComments({
        outputType,
        getCookie,
        subscription,
        setIsReady,
        setMessage,
        showComponent,
        shouldLoad,
        termicaLivefyre,
        containerRef,
        subtype,
        articleId
    });

    if (shouldLoad && !termicaLivefyre && messageType === CLOSED_BY_TERMIC) {
        return <BannerMessage {...messageProps} />;
    }

    if (!showComponent || outputType !== 'default') {
        return null;
    }

    const viafouraClassName = cx('viafoura w-100 --no-app', {
        'not-comment': messageProps
    });

    return (
        <>
            {!hiddenButton && (
                <ScrollToTopButton template="others" onClick={onClickBtnUp} />
            )}
            {messageProps ? (
                <BannerMessage {...messageProps} />
            ) : (
                <HeaderComments className="--no-app" />
            )}

            {!isReady && <LoadingIcon className="--no-app" />}

            <div
                className={viafouraClassName}
                data-testid="comments-viafoura"
                ref={containerRef}
            >
                <vf-tray />
                <vf-conversations
                    limit="15"
                    pagination-limit="30"
                    reply-limit="3"
                    pagination-reply-limit="15"
                    sort="newest"
                    featured-tab-active-threshold="3"
                />
            </div>
        </>
    );
}

CommentsViafouraFeature.outputType = 'default';
CommentsViafouraFeature.label = 'LN-Nota-Comments-Viafoura';

export default Consumer(CommentsViafouraFeature);
