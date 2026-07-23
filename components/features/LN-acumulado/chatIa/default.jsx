import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import { Thread, useChatRuntime } from '@ln/ds-blocks-thread';
import { cx } from '@ln/ds-cva';
import Icon from '../../ui/ln/icon/default';
import { InputChat } from './components/InputChat';
import Button from '../../ui/ln/button/default';
import Divider from '../../ui/ln/divider/default';
import useGetUserData from '../../../private/common/auth/hooks/useGetUserData';
import { SUBSCRIBED_HELPER } from '../../../private/common/auth/helper/loginHelper';
import { MessageContainer } from './components/MessageContainer';
import { EmptyState } from './components/EmptyState';
import { SkeletonChat } from './components/SkeletonChat';
import {
    createMundialSession,
    FALLBACK_SUGGESTED_QUESTIONS,
    getSuggestedQuestions,
    resolveErrorMessage,
    RESPONSE_FORMAT,
    sendMundialChatMessage
} from './helpers/api';
import useTermica from '../../../private/common/hooks/useTermica';
import useAuthManager from '../../../private/common/auth/hooks/useAuthManager';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import { EjesCard } from './components/EjesCard';

export function ChatLN({ customFields: { hideChat = false } = {} }) {
    const { isSubscribed, userId } = useGetUserData(SUBSCRIBED_HELPER.LN);
    const { accessToken } = useAuthManager();
    const [showSkeleton, setShowSkeleton] = useState(true);

    const hideChatIa = useTermica('hide_chat_ia_mundial_ln');

    const [sessionId, setSessionId] = useState('');
    const [isCreatingSession, setIsCreatingSession] = useState(false);
    const [suggestedQuestions, setSuggestedQuestions] = useState(
        FALLBACK_SUGGESTED_QUESTIONS
    );
    const [isLastTypingDone, setIsLastTypingDone] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!isSubscribed || !userId || !accessToken) return;

        async function initSession() {
            try {
                const { session_id: sessionIdObtain } =
                    await createMundialSession({ userId, accessToken });
                setSessionId(sessionIdObtain);
            } catch (err) {
                console.error('ChatLN: error creando sesión', err);
            }
        }

        async function loadQuestions() {
            try {
                const questions = await getSuggestedQuestions({
                    userId,
                    accessToken
                });
                setSuggestedQuestions(questions);
            } catch (err) {
                console.error(
                    'ChatLN: error cargando preguntas sugeridas',
                    err
                );
            }
        }

        initSession();
        loadQuestions();
    }, [isSubscribed, userId, accessToken]);

    const onNewMessage = async userQuestion => {
        setIsLastTypingDone(false);

        addEventToDataLayerV2({
            rest: {
                event: 'enviar_consulta',
                label: 'chat_ia_mundial_2026',
                action: 'pregunta_enviada'
            }
        });

        try {
            return await sendMundialChatMessage({
                userId,
                sessionId,
                message: userQuestion,
                accessToken
            });
        } catch (err) {
            // El runtime no ve el status HTTP: el copy se resuelve acá y el error se propaga
            setErrorMessage(resolveErrorMessage(err));
            throw err;
        }
    };

    useEffect(() => {
        addEventToDataLayerV2({
            rest: {
                event: 'chat_open',
                label: 'chat_ia_mundial_2026'
            }
        });
    }, []);

    const runtime = useChatRuntime({
        onNewMessage
    });

    const isGenerating = runtime.status === 'generating';

    const isBlocked =
        runtime.status === 'blocked' || runtime.status === 'error';

    const isIdle = runtime.status === 'idle';

    // En `error` no hay respuesta que tipear: esperarla dejaría el chat sin salida
    const canReset =
        runtime.status === 'error' ||
        (runtime.status === 'blocked' && isLastTypingDone);

    useEffect(() => {
        if (isGenerating) setIsLastTypingDone(false);
    }, [isGenerating]);

    const handleTypingDone = useCallback(() => setIsLastTypingDone(true), []);

    const showSuggestions = runtime.messages.length === 0 && isIdle;

    const handleReset = async () => {
        setIsCreatingSession(true);
        try {
            const { session_id: newSessionId } = await createMundialSession({
                userId,
                accessToken
            });
            setSessionId(newSessionId);
            runtime.setMessages([]);
            runtime.setStatus('idle');
            runtime.setError(null);
            setErrorMessage('');
            setIsLastTypingDone(true);
            try {
                const questions = await getSuggestedQuestions({
                    userId,
                    accessToken
                });
                setSuggestedQuestions(questions);
            } catch (err) {
                console.error(
                    'ChatLN: error refrescando preguntas sugeridas',
                    err
                );
            }
        } catch (err) {
            console.error('ChatLN: error creando nueva sesión', err);
        } finally {
            setIsCreatingSession(false);
        }
    };

    useEffect(() => {
        setShowSkeleton(false);
    }, []);

    if (hideChatIa || hideChat) {
        return null;
    }

    if (showSkeleton) {
        return <SkeletonChat />;
    }

    return (
        <div data-tw>
            <div className="mb-40 md:mb-64 pt-8 xl:pt-6">
                <div className="pb-16">
                    <p className="text-body-lg font-secondary text-base-default">
                        Seguí las estadísticas y los resultados en vivo en{' '}
                        <a
                            href="https://canchallena.lanacion.com.ar/"
                            className="inline-flex items-center gap-4"
                        >
                            <span
                                className="inline-block w-112 h-16 bg-[url('/pf/resources/images/canchallena.svg')] bg-no-repeat bg-contain bg-left align-baseline"
                                aria-label="canchallena"
                            />
                            <Icon name="arrow-right" size={24} />
                        </a>
                    </p>
                </div>
                <div className="md:grid md:grid-cols-12 xl:grid-cols-16 gap-responsive">
                    <EjesCard />
                </div>
                <div
                    className={cx(
                        'flex flex-column pb-8',
                        isSubscribed &&
                            'xl:flex-row xl:items-center gap-8 xl:gap-16'
                    )}
                >
                    <h2 className="font-primary font-w-semibold text-base-default text-subheading-sm">
                        LA NACION IA
                    </h2>
                    <div
                        className={cx(
                            'flex gap-8 items-center',
                            !isSubscribed &&
                                'xl:grid xl:grid-cols-16 gap-responsive pt-8'
                        )}
                    >
                        <EmptyState isSubscribed={isSubscribed} />
                    </div>
                </div>

                <div className="relative flex flex-column xl:grid xl:grid-cols-16 gap-responsive">
                    <div className="xl:col-span-10">
                        <Thread
                            runtime={runtime}
                            responseOptions={{ answerFormat: RESPONSE_FORMAT }}
                        >
                            <Thread.Composer className="flex flex-col gap-16">
                                <>
                                    <InputChat
                                        isSubscribed={isSubscribed}
                                        isGenerating={isGenerating}
                                        isBlocked={isBlocked}
                                        disabled={!isSubscribed}
                                    />

                                    <Thread.Viewport
                                        className={cx(
                                            'overflow-y-hidden overflow-x-hidden',
                                            runtime.messages.length === 0 &&
                                                'hidden'
                                        )}
                                    >
                                        <MessageContainer
                                            messages={runtime.messages}
                                            isGenerating={isGenerating}
                                            onTypingDone={handleTypingDone}
                                        />
                                    </Thread.Viewport>

                                    <Thread.Error
                                        className="font-secondary text-small-lg text-base-default"
                                        filter={(error, status) =>
                                            status === 'error'
                                        }
                                    >
                                        {errorMessage}
                                    </Thread.Error>
                                    {showSuggestions && isSubscribed && (
                                        <div className="flex flex-column md:flex-row gap-responsive">
                                            {suggestedQuestions.map(
                                                suggestion => (
                                                    <button
                                                        key={suggestion}
                                                        type="button"
                                                        disabled={!sessionId}
                                                        onClick={() =>
                                                            runtime.onSubmit(
                                                                suggestion
                                                            )
                                                        }
                                                        className="hover:opacity-80 h-72 text-start w-full px-16 py-8 bg-neutral-1 border border-all border-neutral-300 rounded-md font-secondary text-small-lg text-base-default disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <span className="line-clamp-3">
                                                            {suggestion}
                                                        </span>
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {canReset && (
                                        <div className="flex justify-center py-8">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                color="black"
                                                rounded="custom"
                                                className="hover:opacity-80 rounded-4 text-secondary-default"
                                                onClick={handleReset}
                                                size={32}
                                                disabled={isCreatingSession}
                                            >
                                                <Icon
                                                    type="color"
                                                    name="ia-star"
                                                    size={12}
                                                    className="text-[var(--primary-ia)]"
                                                />
                                                {isCreatingSession
                                                    ? 'Creando nueva sesión...'
                                                    : 'Realizar una nueva pregunta'}
                                            </Button>
                                        </div>
                                    )}

                                    {isSubscribed && (
                                        <>
                                            <Divider color="muted" />
                                            <p className="font-secondary text-small-lg text-base-default -mt-8">
                                                Las respuestas se basan
                                                exclusivamente en el contenido
                                                periodístico publicado por LA
                                                NACION. Recomendamos verificar
                                                siempre la información con las
                                                notas originales que respaldan
                                                cada respuesta.
                                            </p>
                                        </>
                                    )}
                                </>
                            </Thread.Composer>
                        </Thread>
                    </div>
                </div>
            </div>
        </div>
    );
}

ChatLN.propTypes = {
    customFields: PropTypes.shape({
        hideChat: PropTypes.bool.tag({
            name: 'Ocultar Chat',
            description: 'Oculta completamente el chat en esta página',
            default: false
        })
    }).isRequired
};

export default ChatLN;
