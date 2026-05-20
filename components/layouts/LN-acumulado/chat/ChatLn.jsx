import React, { useCallback, useEffect, useState } from 'react';

import { Thread, useChatRuntime } from '@ln/ds-blocks-thread';
import { cx } from '@ln/ds-cva';
import Icon from '../../../features/ui/ln/icon/default';
import { InputChat } from './components/InputChat';
import Button from '../../../features/ui/ln/button/default';
import Divider from '../../../features/ui/ln/divider/default';
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
    sendMundialChatMessage
} from './_helper';
import useTermica from '../../../private/common/hooks/useTermica';
import useAuthManager from '../../../private/common/auth/hooks/useAuthManager';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import { EjesCard } from './components/EjesCard';

export function ChatLN() {
    const { isSubscribed, userId } = useGetUserData(SUBSCRIBED_HELPER.LN);
    const { accessToken } = useAuthManager();
    const [showSkeleton, setShowSkeleton] = useState(true);

    const hideChatIa = Boolean(useTermica('hide_chat_ia_mundial_ln'));

    const [sessionId, setSessionId] = useState('');
    const [suggestedQuestions, setSuggestedQuestions] = useState(
        FALLBACK_SUGGESTED_QUESTIONS
    );
    const [isLastTypingDone, setIsLastTypingDone] = useState(true);

    useEffect(() => {
        if (!isSubscribed || !userId) return;

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
    }, [isSubscribed, userId]);

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
            const errorMsg = resolveErrorMessage(err);
            return {
                message_type: 'input',
                content: errorMsg,
                response_chat: {
                    descripcion: errorMsg
                }
            };
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

    useEffect(() => {
        if (isGenerating) setIsLastTypingDone(false);
    }, [isGenerating]);

    const handleTypingDone = useCallback(() => setIsLastTypingDone(true), []);

    const showSuggestions = runtime.messages.length === 0 && isIdle;

    const handleReset = () => {
        runtime.setMessages([]);

        runtime.setStatus('idle');

        runtime.setError(null);
    };

    useEffect(() => {
        setShowSkeleton(false);
    }, []);

    if (hideChatIa) {
        return null;
    }

    if (showSkeleton) {
        return <SkeletonChat />;
    }

    return (
        <div data-tw>
            <div className="mb-[40px] md:mb-[64px] pt-8 xl:pt-6">
                <div className="pb-16">
                    <p className="text-body-lg font-secondary text-base-default">
                        Seguí las estadísticas y los resultados en vivo en{' '}
                        <a
                            href="https://canchallena.lanacion.com.ar/"
                            className="inline-flex items-center gap-4"
                        >
                            <span
                                className="inline-block w-[112px] h-[16px] bg-[url('/pf/resources/images/canchallena.svg')] bg-no-repeat bg-contain bg-left align-baseline"
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
                    <h2 className="prumo prumo-semibold text-base-default text-subheading-sm">
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
                        <Thread runtime={runtime}>
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
                                    {showSuggestions && isSubscribed && (
                                        <div className="flex flex-column md:flex-row gap-responsive">
                                            {suggestedQuestions.map(
                                                suggestion => (
                                                    <button
                                                        key={suggestion}
                                                        type="button"
                                                        onClick={() =>
                                                            runtime.onSubmit(
                                                                suggestion
                                                            )
                                                        }
                                                        className="hover:opacity-80 h-[72px] text-start w-full px-16 py-8 bg-neutral-1 border border-all border-neutral-300 rounded-md font-secondary text-small-lg text-base-default disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {isBlocked && isLastTypingDone && (
                                        <div className="flex justify-center py-8">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                color="black"
                                                rounded="custom"
                                                className="hover:opacity-80 rounded-4 text-secondary-default "
                                                onClick={handleReset}
                                                size={32}
                                            >
                                                <Icon
                                                    name="ia"
                                                    size={12}
                                                    className="text-[#27D2BE]"
                                                />
                                                Realizar una nueva pregunta
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
