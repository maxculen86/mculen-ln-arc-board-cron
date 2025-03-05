import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

function MarqueeHighlight() {
    return (
        <span className="flex ai-center gap-2 text-neutral-light-600">
            Escuchar con la voz del autor
            <Icon size={16}>
                <IconSprite name="ai" fill="var(--primary-ia)" />
            </Icon>
        </span>
    );
}

export default MarqueeHighlight;
