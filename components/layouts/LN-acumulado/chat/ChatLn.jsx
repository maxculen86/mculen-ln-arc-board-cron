import React, { useCallback, useEffect, useState } from 'react';

import { Thread, useChatRuntime } from '@ln/ds-blocks-thread';
import { cx } from '@ln/ds-cva';
import Icon from '../../../features/ui/ln/icon/default';
import { InputChat } from './components/InputChat';
import Button from '../../../features/ui/ln/button/default';
import Divider from '../../../features/ui/ln/divider/default';
import useGetUserData from '../../../private/common/auth/hooks/useGetUserData';
import { SUBSCRIBED_HELPER } from '../../../private/common/auth/helper/loginHelper';
import {
    buildMockResponse,
    MOCK_DELAY_MS,
    SUGGESTED_QUESTIONS
} from './mockDataLN';
import { MessageContainer } from './components/MessageContainer';
import { EmptyState } from './components/EmptyState';
import { SkeletonChat } from './components/SkeletonChat';

// ---------------------------------------------------------------------------

// Componente principal

// ---------------------------------------------------------------------------

export function ChatLN() {
    const { isSubscribed } = useGetUserData(SUBSCRIBED_HELPER.LN);
    const [showSkeleton, setShowSkeleton] = useState(true);

    const onNewMessage = useCallback(async userQuestion => {
        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS));

        return buildMockResponse(userQuestion);
    }, []);

    const runtime = useChatRuntime({
        onNewMessage

        /* initialSuggestions: SUGGESTED_QUESTIONS */
    });

    const isGenerating = runtime.status === 'generating';

    const isBlocked = runtime.status === 'blocked';

    const isIdle = runtime.status === 'idle';

    const [isLastTypingDone, setIsLastTypingDone] = useState(true);

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

    if (showSkeleton) {
        return <SkeletonChat />;
    }

    return (
        <div data-tw>
            <div className="mb-16 pt-8 pb-16 xl:pt-6">
                <h2 className="font-secondary text-body-lg font-bold xl:pb-16">
                    LA NACION IA
                </h2>
                <div
                    className={cx(
                        'xl:hidden',
                        isSubscribed && 'flex pt-8 pb-16 xl:pt-0 xl:pb-0 gap-8'
                    )}
                >
                    <EmptyState isSubscribed={isSubscribed} />
                </div>

                <div className="relative flex flex-column xl:grid xl:grid-cols-16 gap-16">
                    <div
                        className={cx(
                            isSubscribed ? 'xl:col-span-12' : 'xl:col-span-11'
                        )}
                    >
                        <Thread runtime={runtime}>
                            <Thread.Composer className="flex flex-col gap-16">
                                <>
                                    <InputChat
                                        isGenerating={isGenerating}
                                        isBlocked={isBlocked}
                                        disabled={!isSubscribed}
                                    />

                                    {runtime.messages.length > 0 && (
                                        <Thread.Viewport className="overflow-y-hidden overflow-x-hidden">
                                            <MessageContainer
                                                messages={runtime.messages}
                                                isGenerating={isGenerating}
                                                onTypingDone={handleTypingDone}
                                            />
                                        </Thread.Viewport>
                                    )}

                                    {showSuggestions && (
                                        <div className="flex flex-column md:flex-row gap-responsive">
                                            {SUGGESTED_QUESTIONS.map(
                                                suggestion => (
                                                    <button
                                                        key={suggestion}
                                                        type="button"
                                                        onClick={() =>
                                                            runtime.onSubmit(
                                                                suggestion
                                                            )
                                                        }
                                                        disabled={!isSubscribed}
                                                        className="hover:opacity-80 h-[72px] text-start w-full px-16 py-8 bg-neutral-1 border border-all border-muted rounded-sm font-secondary text-small-lg text-base-default disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {isBlocked && isLastTypingDone && (
                                        <div className="flex justify-center xl:justify-start">
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

                                    <Thread.Error
                                        filter={(_, status) =>
                                            status === 'error'
                                        }
                                        className="pt-8"
                                    >
                                        <p className="roboto roboto-bold text-16 text-error">
                                            Ocurrió un error. Por favor, intentá
                                            de nuevo.
                                        </p>
                                    </Thread.Error>

                                    {isSubscribed && (
                                        <>
                                            <Divider color="muted" />
                                            <p className="font-secondary text-small-lg text-base-default -mt-8">
                                                Las respuestas se basan
                                                exclusivamente en el contenido
                                                periodístico publicado por LA
                                                NACION Recomendamos verificar
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

                    <div
                        className={cx(
                            `hidden xl:flex gap-8 ${isSubscribed ? 'xl:col-span-4 flex gap-8 pt-8 pb-16' : 'xl:col-span-5'}`
                        )}
                    >
                        <EmptyState isSubscribed={isSubscribed} />
                    </div>
                </div>
            </div>
        </div>
    );
}
