import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import { Button } from '@ln/contenidos-ui-button';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export function FalsePlaceHolderAudioPlayer({ isListenable = false }) {
    return (
        isListenable && (
            <div className="btn-container l-only w-100 mb-32 ai-start transition transition-all transition-ease-in transition-duration-1000 min-h-56 py-16 grid border border-bottom border-thin border-neutral-light-100">
                <Button
                    title="Escuchar nota"
                    variant="primary"
                    type="button"
                    disabled
                >
                    <Icon size={24} color="inherit">
                        <IconSprite name="listen" />
                    </Icon>
                    <Text>Escuchar</Text>
                </Button>
            </div>
        )
    );
}
