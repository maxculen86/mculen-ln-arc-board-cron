/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';
import {
    validateComments,
    getMessageProps,
    CLOSED_BY_TERMIC
} from '../../../private/common/utils/commentsHelper';
import Message from '../../../private/common/message';
import getScrollPercent from '../../../private/LN/common/utils/getScrollPercent';
import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import handleCookie from '../../../private/LN/common/utils/handleCookie';
import LoadingIcon from '../../../private/LN/common/loadingIcon';
import { isSubscribed } from '../../../private/LN/common/utils/contextHelper';
import HeaderComments from '../../../private/LN/nota/comments/header';

const CommentsViafouraFeature = props => {
    const { outputType } = props;
    const subscription = isSubscribed();
    const { messageType, shouldLoad } = validateComments(props, subscription);
    const messageProps = getMessageProps(props, messageType);
    const { getCookie } = handleCookie();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const handleScrollForComments = () => {
            const scrollPercentRounded = getScrollPercent();
            // TODO: investigar si se puede usar con pixeles en vez de % para mayor exactitud
            if (scrollPercentRounded > 90) {
                dynamicallyLoadScript(
                    'https://cdn.viafoura.net/vf-v2.js',
                    'body'
                )
                    .then(() => {
                        const token = getCookie('token');
                        window.vfQ = window.vfQ || [];
                        window.vfQ.push(() => {
                            setIsReady(true);
                            window.vf.$prepublish((channel, event, ...args) => {
                                const { specialUrl = SITE_LANACION } =
                                    messageProps || {};
                                if (
                                    channel === 'authentication' &&
                                    event === 'required'
                                ) {
                                    window.location.href = specialUrl;
                                    return false;
                                }
                                return { channel, event, args };
                            });
                            subscription &&
                                token &&
                                window.vf &&
                                window.vf.session &&
                                window.vf.session.login
                                    .cookie(token)
                                    .then(successMessage => {
                                        console.log(
                                            'Viafoura Login correcto ',
                                            successMessage
                                        );
                                    })
                                    .catch(error => {
                                        console.log(
                                            'Viafoura Login incorrecto ',
                                            error
                                        );
                                    });
                        });
                    })
                    .catch(error => {});
            }
        };

        shouldLoad &&
            window.addEventListener('scroll', e => handleScrollForComments());
        return () =>
            shouldLoad &&
            window.removeEventListener('scroll', handleScrollForComments);
    });

    if (!shouldLoad && messageType === CLOSED_BY_TERMIC)
        return <Message {...messageProps} />;

    if (!shouldLoad || outputType !== 'default') return <></>;

    return (
        <>
            {messageProps ? <Message {...messageProps} /> : <HeaderComments />}

            {!isReady && <LoadingIcon />}

            <div className={`viafoura${messageProps ? ' not-comment' : ''}`}>
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
};

CommentsViafouraFeature.propTypes = {
    id: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        first_publish_date: PropTypes.string
    }).isRequired,
    outputType: PropTypes.string.isRequired
};

CommentsViafouraFeature.outputType = 'default';
CommentsViafouraFeature.label = 'LN-Nota-Comments-Viafoura';
CommentsViafouraFeature.lazy = ['default', 'widgets'];

export default Consumer(CommentsViafouraFeature);
