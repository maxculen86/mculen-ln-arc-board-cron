import React from 'react';
import { Thread, partitionSourcesByMatch } from '@ln/ds-blocks-thread';
import { Link } from '@ln/ds-common-link';
import Icon from '../../../../features/ui/foodit/icon/default';
import { MessageFeedback } from './MessageFeedback';

export function MessageAssistant({
    message,
    isLastOutput,
    showAfterRender: showAfterRenderProp
}) {
    const descripcion =
        message?.response_chat?.descripcion ?? message?.content ?? '';
    const fuentes = message?.response_chat?.fuentes ?? [];

    const showAfterRender = !isLastOutput || showAfterRenderProp;

    const { unmatched } = partitionSourcesByMatch(descripcion, fuentes);
    const unmatchedFuentes = unmatched.filter(
        ({ titulo, url }) => url && titulo
    );

    return (
        <div className="flex flex-col md:flex-row pr-[32px] max-w-[500px] xl:max-w-[700px]">
            <div className="flex gap-4 shrink-0 pt-4">
                <Icon
                    size={20}
                    className="pt-4 text-accent-default"
                    name="sprak"
                />
                <p className="roboto roboto-bold text-16">Foodit IA:</p>
            </div>
            <div
                className="roboto text-16 flex flex-col gap-8 [&_.italic]:not-italic [&_.italic]:text-base-default"
                style={{ '--text-10': '16px' }}
            >
                <Thread.Message
                    className="roboto text-16"
                    message={{ ...message, content: descripcion }}
                    isLastOutput={isLastOutput}
                />

                {!!unmatchedFuentes.length && showAfterRender && (
                    <ul className="flex flex-col pl-4 gap-8">
                        {unmatchedFuentes.map(({ titulo, url }) => (
                            <li key={url} className="flex gap-4 items-center">
                                <Icon
                                    size={12}
                                    name="bullet-chat"
                                    className="text-accent-default"
                                />
                                <Link
                                    target="_blank"
                                    color="custom"
                                    size="custom"
                                    className="text-accent-default roboto roboto-bold uppercase text-12"
                                    href={url}
                                >
                                    {titulo}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                {showAfterRender && <MessageFeedback />}
            </div>
        </div>
    );
}
