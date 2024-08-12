import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import { Button } from '@ln/contenidos-ui-button';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export const FalsePlaceHolderAudioPlayer = ({ isListenable }) =>
    isListenable && (
        <Button title="Escuchar nota" variant="primary" type="button" disabled>
            <Icon size={24} color="inherit">
                <IconSprite name="listen" />
            </Icon>
            <Text>Escuchar</Text>
        </Button>
    );
