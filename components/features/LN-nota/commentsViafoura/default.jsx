/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { cx } from '@ln/ds-cva';
import {
    CLOSED_BY_TERMIC,
    useValidateComments
} from '../../../private/common/utils/commentsHelper';
import Message from '../../../private/common/message';
import getScrollPercent from '../../../private/LN/common/utils/getScrollPercent';
import handleCookie from '../../../private/LN/common/utils/handleCookie';
import LoadingIcon from '../../../private/LN/common/loadingIcon';
import HeaderComments from '../../../private/LN/nota/comments/header';
import useTermica from '../../../private/common/hooks/useTermica';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../private/common/auth/helper/loginHelper';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import { VIDEO_COMENTARIOS } from '../../../private/common/utils/subtypes/subtypeHelper';
import { loadViafoura } from './helper';
import '../../../../resources/dist/css/ln/modules/comments.css';

const COMMENTS_SECTION_POSITION = '11';
const COMMENTS_PAGE_POSITION = '00';
const COMMENTS_DEFAULT_VALUE = '00';

function CommentsViafouraFeature(props) {
    const { outputType, globalContent } = props;

    const { subtype } = globalContent || {};

    const subscription = isSubscribed(SUBSCRIBED_HELPER.LN);
    const { messageType, shouldLoad, messageProps, setMessage } =
        useValidateComments(props, subscription);
    const termicaLivefyre = useTermica('livefyre');
    const { getCookie } = handleCookie();
    const [isReady, setIsReady] = useState(false);
    const [hasTrackedImpression, setHasTrackedImpression] = useState(false);
    const showComponent = shouldLoad && termicaLivefyre;
    const articleId = globalContent?.id;

    useEffect(() => {
        if (isReady && !hasTrackedImpression) {
            const position = `${COMMENTS_SECTION_POSITION}${COMMENTS_PAGE_POSITION}${COMMENTS_DEFAULT_VALUE}`;
            addEventToDataLayerV2({
                event: 'impressioncomentario',
                ctr_brand: 'cajaComentarios',
                ctr_position: position,
                articleId
            });
            setHasTrackedImpression(true);
        }
    }, [isReady, hasTrackedImpression, articleId]);

    useEffect(() => {
        const runLoadViafoura = () =>
            loadViafoura({
                outputType,
                getCookie,
                subscription,
                setIsReady,
                setMessage
            });

        if (subtype === VIDEO_COMENTARIOS) {
            runLoadViafoura();
            return () => {};
        }

        const handleScrollForComments = () => {
            const scrollPercentRounded = getScrollPercent();
            // TODO: investigar si se puede usar con pixeles en vez de % para mayor exactitud
            if (scrollPercentRounded > 90) {
                runLoadViafoura();
            }
        };

        if (showComponent) {
            window.addEventListener('scroll', handleScrollForComments);
        }
        return () => {
            if (showComponent) {
                window.removeEventListener('scroll', handleScrollForComments);
            }
        };
    });

    if (shouldLoad && !termicaLivefyre && messageType === CLOSED_BY_TERMIC) {
        return <Message {...messageProps} />;
    }

    if (!showComponent || outputType !== 'default') {
        return null;
    }

    const viafouraClassName = cx('viafoura w-100 --no-app', {
        'not-comment': messageProps
    });

    return (
        <>
            {messageProps ? (
                <Message {...messageProps} />
            ) : (
                <HeaderComments className="--no-app" />
            )}

            {!isReady && <LoadingIcon className="--no-app" />}

            <div className={viafouraClassName} data-testid="comments-viafoura">
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

CommentsViafouraFeature.propTypes = {
    id: PropTypes.string,
    globalContent: PropTypes.shape({
        first_publish_date: PropTypes.string,
        id: PropTypes.string
    }),
    outputType: PropTypes.string
};

CommentsViafouraFeature.outputType = 'default';
CommentsViafouraFeature.label = 'LN-Nota-Comments-Viafoura';

export default Consumer(CommentsViafouraFeature);
