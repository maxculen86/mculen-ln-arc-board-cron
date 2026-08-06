import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppContext } from 'fusion:context';

import { SITE_FOODIT } from 'fusion:environment';

import { Thread, useChatRuntime } from '@ln/ds-blocks-thread';
import { useDisclosure } from '@ln/hooks';
import getQueryParamValue from '../../../private/common/utils/getQueryParamValue';
import {
    createSessionChat,
    RESPONSE_FORMAT,
    sendChatMessage
} from '../../../features/foodit-global/common/Header/_helpers';
import useGetUserConfig from '../../../features/foodit-global/hooks/useGetUserConfig';
import { SkeletonChatIa } from './skeletonChatIa';
import { SessionExpiredModal } from './SessionExpiredModal';
import { useInactivityTimer } from './hooks/helpers';
import { MessageContainer } from './MessageContainer/MessageContainer';
import { FormContainer } from './formContainer';
import { ButtonScroll } from './buttonScroll';
import { SessionEnd } from './SessionEnd';
import { getSearchTerm } from './getSearchTerm';
import { pushFooditEvent } from '../../../features/foodit-global/common/utils/pushFooditEvent';
import { cleanUrl } from '../../../features/foodit-global/common/dataLayer/_helpers';
import { getAuthTokens } from '../../../private/common/auth/helper/loginHelper';
import { EmptyStateChat } from './emptyStateChat';
import {
    isChatMockEnabled,
    MOCK_SESSION_ID,
    MOCK_USER,
    sendMockChatMessage
} from './chatMock';

function ChatIaFoodit({ onSearchTermChange }) {
    const [sessionId, setSessionId] = useState('');
    const [isHydrated, setIsHydrated] = useState(false);

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

    const [isMock] = useState(isChatMockEnabled);

    const realUser = useGetUserConfig();
    const user = isMock ? { ...realUser, ...MOCK_USER } : realUser;
    const { isSubscribed, id: userId, userType } = user;

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

            if (isMock) return sendMockChatMessage({ message: userContent });

            const resp = await sendChatMessage({
                sessionId,
                message: userContent,
                accessToken: accessTokenUser,
                userId
            });
            const pageLocation = cleanUrl(`${SITE_FOODIT}${requestUri}`);
            pushFooditEvent({
                rest: {
                    event: 'enviar_consulta',
                    page_location: pageLocation,
                    cta: resp.data?.chat_count
                }
            });

            return resp;
        },
        initialMessages
    });
    const lastSearchTerm = useMemo(
        () => getSearchTerm(runtime.messages),
        [runtime.messages]
    );

    useEffect(() => {
        if (lastSearchTerm && onSearchTermChange) {
            onSearchTermChange(lastSearchTerm);
        }
    }, [lastSearchTerm, onSearchTermChange]);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const showSkeleton = !isHydrated || userType === 'loading';

    useEffect(() => {
        async function fetchSession() {
            if (sessionId) return;

            // `session_id` falso en mock
            if (isMock) {
                setSessionId(MOCK_SESSION_ID);
                return;
            }

            try {
                const { accessToken } = await getAuthTokens();

                if (!accessToken) {
                    throw new Error(
                        'sin accessToken: window.UCL no expuso el JWT'
                    );
                }

                const { session_id: sessionIdResponse } =
                    await createSessionChat({ accessToken, userId });

                setAccessTokenUser(accessToken);
                setSessionId(sessionIdResponse);
            } catch (error) {
                console.error('ChatFoodit - error create session chat', error);
                runtime.setError({ code: 'internal_error', message: null });
                runtime.setStatus('error');
            }
        }
        if (!isSubscribed) {
            return;
        }
        fetchSession();
        if (sessionId) {
            runtime.setMessages([]);
            runtime.onSubmit(queryUrl);
        }
    }, [isSubscribed, sessionId, userId]);

    useEffect(() => {
        const pageLocation = cleanUrl(`${SITE_FOODIT}${requestUri}`);
        pushFooditEvent({
            rest: {
                event: 'chat_open',
                page_location: pageLocation
            }
        });
    }, []);

    const lastMessage = runtime.messages[runtime.messages.length - 1];
    // El tipeo corre con el runtime ya en `idle`: sin esto, escribir corta la animación
    const isTypingAnswer =
        lastMessage?.message_type === 'input' && !showAfterRenderAssistant;

    // `error` queda afuera a propósito: es transitorio y el reintento es la
    // única salida del chat (el CTA de `SessionEnd` espera un `onTypingComplete`
    // que en error nunca llega). Trabar acá dejaba input muerto + cartel de
    // error y sin forma de seguir salvo refrescar la página
    const disableInput =
        runtime.status === 'generating' ||
        runtime.status === 'blocked' ||
        isTypingAnswer ||
        isSessionExpired;

    const requestLimit = runtime.status === 'blocked';
    // Por status: `runtime.error` puede venir informado con el chat vivo
    const hasError = runtime.status === 'error';
    const isSessionCompleted =
        requestLimit && runtime.error?.code === 'session_completed';

    const hasAnswer = runtime.messages.some(
        message => message.message_type === 'input'
    );

    // Un solo gate para todo el arranque. Crear la sesión, enviar y generar son
    // pasos internos con huecos de `idle` en el medio: colgar el cartel de cada
    // uno lo hace parpadear en cada transición
    const showIsThinking =
        runtime.status === 'generating' ||
        (isSubscribed && !hasAnswer && !hasError && !requestLimit);

    useEffect(() => {
        if (runtime.status === 'sending' || runtime.status === 'generating') {
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
                                    responseOptions={{
                                        answerFormat: RESPONSE_FORMAT,
                                        onTypingComplete: () =>
                                            setShowAfterRenderAssistant(true)
                                    }}
                                >
                                    <Thread.Viewport className="overflow-y-hidden overflow-x-hidden ds-thread-viewport">
                                        <>
                                            <MessageContainer
                                                messages={runtime.messages}
                                                showAfterRenderAssistant={
                                                    showAfterRenderAssistant
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
                                                    isTypingAnswer={
                                                        isTypingAnswer
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
                                        <SessionEnd
                                            isSessionCompleted={
                                                isSessionCompleted
                                            }
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
