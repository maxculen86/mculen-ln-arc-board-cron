import React from 'react';
import { Thread } from '@ln/ds-blocks-thread';
import Icon from '../../../../features/ui/foodit/icon/default';
import { MessageFeedback } from './MessageFeedback';

export function MessageAssistant({
    message,
    isLastOutput,
    showAfterRender: showAfterRenderProp
}) {
    const showAfterRender = !isLastOutput || showAfterRenderProp;

    return (
        <div className="flex flex-col md:flex-row pr-[32px] max-w-[500px] xl:max-w-[700px] min-w-0">
            <div className="flex gap-4 shrink-0 pt-4">
                <Icon
                    size={20}
                    className="pt-4"
                    fill="var(--proxy-accent-default)"
                    name="sprak"
                />
                <p className="roboto roboto-bold text-16">Foodit IA:</p>
            </div>
            <div className="roboto text-16 flex flex-col gap-8 min-w-0">
                <Thread.Message message={message} isLastOutput={isLastOutput} />

                {showAfterRender && <MessageFeedback />}
            </div>
        </div>
    );
}
