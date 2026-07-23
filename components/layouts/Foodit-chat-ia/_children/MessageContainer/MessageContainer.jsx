import React from 'react';
import { Thread } from '@ln/ds-blocks-thread';
import { MessageAssistant } from './MessageAssistant';
import { MessageUser } from './MessageUser';

// Los cierres de sesión no son errores: los renderiza `SessionEnd`. Ver docs/chat-ia/
const isBlockingError = (error, status) =>
    error.code !== 'session_terminated' &&
    error.code !== 'session_completed' &&
    (status === 'error' || status === 'blocked');

export function MessageContainer({ messages, showAfterRenderAssistant }) {
    return (
        <>
            <Thread.Messages className="flex flex-column gap-16">
                <>
                    {messages.map((message, index) => {
                        const key = `${message.message_type}:${index}`;

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
                                        showAfterRender={
                                            showAfterRenderAssistant
                                        }
                                    />
                                </div>
                            );
                        }
                        return null;
                    })}
                </>
            </Thread.Messages>
            <Thread.Error className="md:pl-[94px]" filter={isBlockingError}>
                <p className="roboto roboto-bold text-16 pl-4 pt-16">
                    ¡Upssss! Hubo un error
                </p>
            </Thread.Error>
        </>
    );
}
