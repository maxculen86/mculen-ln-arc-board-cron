import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppContext } from 'fusion:context';

import { SITE_FOODIT } from 'fusion:environment';

import { Thread, useChatRuntime } from '@ln/ds-blocks-thread';
import { useDisclosure } from '@ln/hooks';
import getQueryParamValue from '../../../private/common/utils/getQueryParamValue';
import {
    createSessionChat,
    sendChatMessage
} from '../../../features/foodit-global/common/Header/_helpers';
import useGetUserConfig from '../../../features/foodit-global/hooks/useGetUserConfig';
import { SkeletonChatIa } from './skeletonChatIa';
import { SessionExpiredModal } from './SessionExpiredModal';
import { useInactivityTimer } from './hooks/helpers';
import { MessageContainer } from './MessageContainer/MessageContainer';
import { FormContainer } from './formContainer';
import { ButtonScroll } from './buttonScroll';
import { ButtonNavigation } from './buttonNavigation';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import { cleanUrl } from '../../../features/foodit-global/common/dataLayer/_helpers';
import { getAuthTokens } from '../../../private/common/auth/helper/loginHelper';
import { EmptyStateChat } from './emptyStateChat';

function ChatIaFoodit({ onSearchTermChange }) {
    const [sessionId, setSessionId] = useState('');
    const [showSkeleton, setShowSkeleton] = useState(true);

    const [accessTokenUser, setAccessTokenUser] = useState('');
    const { requestUri } = useAppContext();
    const { isOpen, onOpen, onClose } = useDisclosure(false);
    const [isSessionExpired, setIsSessionExpired] = useState(false);
    const [showAfterRenderAssistant, setShowAfterRenderAssistant] =
        useState(false);
    const composerSentinelRef = useRef(null);
    const INACTIVITY_MS = 30 * 60 * 1000;

    const query = getQueryParamValue('query', `${SITE_FOODIT}/${requestUri}`);
    const queryUrl = decodeURIComponent(query) || '¿Qué es Foodit?';

    const user = useGetUserConfig();
    const { isSubscribed } = user;

    const initialMessages = [];
    if (!isSubscribed) {
        initialMessages.push({
            content: queryUrl,
            message_type: 'output'
        });
    }

    const { reset: resetInactivity } = useInactivityTimer({
        timeoutMs: INACTIVITY_MS,
        enabled: isSubscribed,
        onTimeout: () => {
            setIsSessionExpired(true);
            onOpen();
        }
    });

    const runtime = useChatRuntime({
        onNewMessage: async userContent => {
            resetInactivity();
            const resp = await sendChatMessage({
                sessionId,
                message: userContent,
                accessToken: accessTokenUser
            });
            const pageLocation = cleanUrl(`${SITE_FOODIT}${requestUri}`);
            addEventToDataLayerV2({
                rest: {
                    event: 'enviar_consulta',
                    page_location: pageLocation,
                    cta: resp.chat_count
                }
            });

            return resp;
        },
        initialMessages
    });
    const hasKeywords = msg =>
        msg.message_type === 'input' && msg.response_chat?.keywords?.length > 0;
    const lastInputWithKeywords = useMemo(
        () => runtime.messages?.findLast(hasKeywords) ?? null,
        [runtime.messages]
    );
    const lastKeywords = useMemo(
        () => lastInputWithKeywords?.response_chat?.keywords?.slice(0, 2) ?? [],
        [lastInputWithKeywords]
    );

    useEffect(() => {
        if (lastKeywords.length > 0 && onSearchTermChange) {
            onSearchTermChange(lastKeywords.join(' / '));
        }
    }, [lastKeywords, onSearchTermChange]);

    useEffect(() => {
        setShowSkeleton(false);
    }, []);

    useEffect(() => {
        async function fetchSession() {
            if (sessionId) return;

            const { accessToken } = await getAuthTokens();

            const { session_id: sessionIdResponse } = await createSessionChat({
                accessToken
            });

            if (!sessionIdResponse) {
                console.error('ChatFoodit - error create session chat');
                return;
            }
            setAccessTokenUser(accessToken);
            setSessionId(sessionIdResponse);
        }
        if (!isSubscribed) {
            return;
        }
        fetchSession();
        if (sessionId) {
            runtime.setMessages([]);
            runtime.onSubmit(queryUrl);
        }
    }, [isSubscribed, sessionId]);

    useEffect(() => {
        const pageLocation = cleanUrl(`${SITE_FOODIT}${requestUri}`);
        addEventToDataLayerV2({
            rest: {
                event: 'chat_open',
                page_location: pageLocation
            }
        });
    }, []);

    const disableInput =
        runtime.status === 'generating' ||
        runtime.status === 'blocked' ||
        runtime.status === 'error' ||
        isSessionExpired;

    const errorCode = runtime.error?.code;
    const requestLimit = runtime.status === 'blocked';

    const showIsThinking =
        runtime.status === 'generating' ||
        (runtime.messages.length === 1 && isSubscribed);

    useEffect(() => {
        if (runtime.status === 'generating') {
            setShowAfterRenderAssistant(false);
        }
    }, [runtime.status]);
    return (
        <>
            <div data-tw>
                <div className="-mb-8 border-2 border-muted px-16 md:px-24 xl:px-32 py-16 md:py-24 xl:py-32">
                    <h1 className="prumo prumo-semibold text-24 md:text-28 pb-16">
                        Foodit IA
                    </h1>
                    <div className="relative flex flex-column xl:grid xl:grid-cols-16 gap-16 xl:-mx-[32px]">
                        <div className="xl:col-span-10 xl:col-start-4">
                            {showSkeleton ? (
                                <SkeletonChatIa />
                            ) : (
                                <Thread
                                    className="gap-16 max-w-[802px] mx-auto"
                                    runtime={runtime}
                                >
                                    <Thread.Viewport className="overflow-y-hidden overflow-x-hidden">
                                        <>
                                            <MessageContainer
                                                messages={runtime.messages}
                                                requestLimit={requestLimit}
                                                isGenerating={
                                                    runtime.status ===
                                                    'generating'
                                                }
                                                errorCode={errorCode}
                                                showAfterRenderAssistant={
                                                    showAfterRenderAssistant
                                                }
                                                onAssistantRendered={
                                                    setShowAfterRenderAssistant
                                                }
                                            />

                                            {showIsThinking && (
                                                <div className="pt-16 roboto roboto-regular">
                                                    Foodit está pensando ...
                                                </div>
                                            )}
                                        </>
                                    </Thread.Viewport>
                                    <Thread.Composer>
                                        {isSubscribed ? (
                                            <>
                                                <FormContainer
                                                    isSessionExpired={
                                                        isSessionExpired
                                                    }
                                                    disableInput={disableInput}
                                                    requestLimit={requestLimit}
                                                    errorCode={errorCode}
                                                    onAssistantRendered={
                                                        setShowAfterRenderAssistant
                                                    }
                                                />
                                                <div
                                                    ref={composerSentinelRef}
                                                />
                                            </>
                                        ) : (
                                            <EmptyStateChat />
                                        )}
                                    </Thread.Composer>
                                    {showAfterRenderAssistant && (
                                        <ButtonNavigation
                                            requestLimit={requestLimit}
                                        />
                                    )}
                                </Thread>
                            )}
                        </div>
                    </div>
                    <ButtonScroll composerSentinelRef={composerSentinelRef} />
                </div>
            </div>
            <SessionExpiredModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}

export default ChatIaFoodit;
