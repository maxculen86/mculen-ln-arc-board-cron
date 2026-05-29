import React, { useState } from 'react';
import { ThreadMessageTyping } from '@ln/ds-blocks-thread';
import { cx } from '@ln/ds-cva';
import Icon from '../../../ui/ln/icon/default';
import Link from '../../../ui/ln/link/default';
import { MessageFeedbackLN } from './MessageFeedback';

export function MessageAssistantLN({ message, isLastOutput, onTypingDone }) {
    const descripcion = message?.response_chat?.descripcion ?? '';
    const fuentes = message?.response_chat?.fuentes ?? [];
    const [typingDone, setTypingDone] = useState(!isLastOutput);

    return (
        <div className="flex flex-col gap-16 w-full max-w-720">
            <div
                className={cx(
                    'font-secondary text-base-default text-body-md',
                    isLastOutput && 'min-h-38'
                )}
            >
                {isLastOutput ? (
                    <ThreadMessageTyping
                        speed={15}
                        onComplete={() => {
                            setTypingDone(true);
                            if (isLastOutput) onTypingDone?.();
                        }}
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
                                className="flex gap-4 items-center text-primary-default hover:text-base-light"
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
