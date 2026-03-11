import React from 'react';
import { Thread } from '@ln/ds-blocks-thread';
import { MessageAssistant } from './MessageAssistant';
import { MessageUser } from './MessageUser';

export function MessageContainer({
    messages,
    isGenerating,
    requestLimit,
    errorCode,
    onAssistantRendered,
    showAfterRenderAssistant
}) {
    function errorMessages() {
        if (errorCode === 'session_limit_reached') {
            return (
                <p className="roboto roboto-bold text-16 pl-4 pt-16">
                    Espero haberte ayudado. Si querés podés comenzar una nueva
                    búsqueda.
                </p>
            );
        }

        return (
            <p className="roboto roboto-bold text-16 pl-4 pt-16">
                ¡Upssss! Hubo un error
            </p>
        );
    }
    return (
        <>
            <Thread.Messages className="flex flex-column gap-16">
                <>
                    {messages.map((message, index) => {
                        const key =
                            message.message_type === 'input'
                                ? `in:${message.session_id}:${message.chat_count}`
                                : `out:${message.content}`;

                        const isLastOutput =
                            index === messages.length - 1 &&
                            message.message_type !== 'output';

                        if (message.message_type === 'output') {
                            return (
                                <div
                                    key={key}
                                    className="flex justify-end pr-2"
                                >
                                    <MessageUser>{message.content}</MessageUser>
                                </div>
                            );
                        }

                        if (message.message_type === 'input') {
                            return (
                                <div key={key} className="flex gap-4">
                                    <MessageAssistant
                                        message={message}
                                        isLastOutput={isLastOutput}
                                        isGenerating={isGenerating}
                                        requestLimit={requestLimit}
                                        errorCode={errorCode}
                                        onAssistantRendered={
                                            onAssistantRendered
                                        }
                                    />
                                </div>
                            );
                        }
                        return null;
                    })}
                </>
            </Thread.Messages>
            {showAfterRenderAssistant && errorCode !== 'session_terminated' && (
                <Thread.Error className="md:pl-[94px]">
                    {errorMessages()}
                </Thread.Error>
            )}
        </>
    );
}
