import React, { useState } from 'react';
import { ThreadMessageTyping } from '@ln/ds-blocks-thread';
import Link from '../../../../features/ui/ln/link/default';
import Icon from '../../../../features/ui/ln/icon/default';
import { MessageFeedbackLN } from '../components/MessagaFeedback';

export function MessageAssistantLN({ message, isLastOutput, onTypingDone }) {
    const descripcion = message?.response_chat?.descripcion ?? '';
    const fuentes = message?.response_chat?.fuentes ?? [];
    const [typingDone, setTypingDone] = useState(!isLastOutput);

    const handleTypingComplete = () => {
        setTypingDone(true);
        if (isLastOutput) onTypingDone?.();
    };

    return (
        <div className="flex flex-col gap-16 w-full">
            <div className="font-secondary text-base-default text-body-md">
                {isLastOutput ? (
                    <ThreadMessageTyping
                        speed={15}
                        onComplete={handleTypingComplete}
                    >
                        {descripcion}
                    </ThreadMessageTyping>
                ) : (
                    <p>{descripcion}</p>
                )}
            </div>

            {typingDone && fuentes.length > 0 && (
                <ul className="flex flex-col gap-8">
                    <p className="text-base-default font-secondary text-body-md font-bold">
                        Fuentes:
                    </p>
                    {fuentes.map(({ titulo, url }) => {
                        if (!url) return null;
                        return (
                            <li
                                key={url}
                                className="flex gap-4 items-center text-[var(--ia-tools)]"
                            >
                                <div>
                                    <Icon size={12} name="bullet-filled" />
                                </div>
                                <Link
                                    href={url}
                                    target="_blank"
                                    color="custom"
                                    size="custom"
                                    className="text-label-sm font-bold font-secondary uppercase"
                                >
                                    {titulo}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}

            {typingDone && <MessageFeedbackLN />}
        </div>
    );
}
