import React from 'react';
import { Thread } from '@ln/ds-blocks-thread';
import { MessageUserLN } from './MessageUser';
import { MessageAssistantLN } from './MessageAssistant';

export function MessageContainer({ messages, isGenerating, onTypingDone }) {
    return (
        <>
            <Thread.Messages className="flex flex-col gap-16">
                {messages.map((message, index) => {
                    const isLastOutput =
                        index === messages.length - 1 &&
                        message.message_type !== 'output';

                    if (message.message_type === 'output') {
                        return (
                            <MessageUserLN
                                key={`user-${index}`}
                                message={message}
                            />
                        );
                    }

                    if (message.message_type === 'input') {
                        return (
                            <MessageAssistantLN
                                key={`assistant-${index}`}
                                message={message}
                                isLastOutput={isLastOutput}
                                isGenerating={isGenerating}
                                onTypingDone={onTypingDone}
                            />
                        );
                    }

                    return null;
                })}
            </Thread.Messages>

            <Thread.Generating className="font-secondary text-body-md pt-16 text-base-default">
                Pensando...
            </Thread.Generating>
        </>
    );
}
