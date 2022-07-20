/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import {
    validateComments,
    getMessageProps,
    getLoginAndRegistrationURLS,
    CLOSED_BY_TERMIC,
    CALLBACKS_BY_CHANNEL_AND_EVENT
} from '../../../private/common/utils/commentsHelper';
import Message from '../../../private/common/message';
import getScrollPercent from '../../../private/LN/common/utils/getScrollPercent';
import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import handleCookie from '../../../private/LN/common/utils/handleCookie';
import LoadingIcon from '../../../private/LN/common/loadingIcon';
import { isSubscribed } from '../../../private/LN/common/utils/contextHelper';
import HeaderComments from '../../../private/LN/nota/comments/header';
import findTermica from '../../../private/common/utils/findTermica';
import get from '../../../private/common/utils/get';
import '../../../../resources/dist/css/ln/modules/comments.css';

const CommentsViafouraFeature = props => {
    const { outputType } = props;
    const subscription = isSubscribed();
    const { messageType, shouldLoad } = validateComments(props, subscription);
    const termicaLivefyre = findTermica('livefyre');
    const { getCookie } = handleCookie();
    const [isReady, setIsReady] = useState(false);
    const [messageProps, setMessage] = useState(
        getMessageProps(props, messageType)
    );
    const showComponent = shouldLoad && termicaLivefyre;

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
                        const {
                            loginUrl,
                            registracionUrl
                        } = getLoginAndRegistrationURLS();
                        const token = getCookie('token');
                        window.vfQ = window.vfQ || [];
                        window.vfQ.push(() => {
                            window.vf.$prepublish((channel, event, ...args) => {
                                const _callback = get(
                                    CALLBACKS_BY_CHANNEL_AND_EVENT,
                                    `${channel}.${event}`,
                                    () => ({
                                        channel,
                                        event,
                                        args
                                    })
                                );
                                return _callback({
                                    channel,
                                    event,
                                    args,
                                    window,
                                    outputType,
                                    registracionUrl,
                                    setIsReady
                                });
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
                                        console.error(
                                            'Viafoura Login incorrecto ',
                                            {
                                                error,
                                                outputType
                                            }
                                        );
                                        setMessage({
                                            title:
                                                'Ahora para comentar debés tener Acceso Digital.',
                                            subtitle: 'Ingresá o suscribite',
                                            secondaryUrl: loginUrl,
                                            specialUrl: registracionUrl,
                                            dark: true,
                                            isExclusive: true
                                        });
                                    });
                        });
                    })
                    .catch(error => {});
            }
        };

        showComponent &&
            window.addEventListener('scroll', e => handleScrollForComments());
        return () =>
            showComponent &&
            window.removeEventListener('scroll', handleScrollForComments);
    });

    if (shouldLoad && !termicaLivefyre && messageType === CLOSED_BY_TERMIC)
        return <Message {...messageProps} />;

    if (!showComponent || outputType !== 'default') return <></>;

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
    id: PropTypes.string,
    globalContent: PropTypes.shape({
        first_publish_date: PropTypes.string
    }),
    outputType: PropTypes.string
};

CommentsViafouraFeature.outputType = 'default';
CommentsViafouraFeature.label = 'LN-Nota-Comments-Viafoura';

export default Consumer(CommentsViafouraFeature);
