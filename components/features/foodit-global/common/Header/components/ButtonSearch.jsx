import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { pushFooditEvent } from '../../utils/pushFooditEvent';

export function ButtonSearch({
    isListening,
    startListening,
    inputValue,
    startSearch,
    loading
}) {
    const handleVoiceSearchClick = () => {
        startListening();
        pushFooditEvent({
            action: 'Busqueda',
            category: 'interaction',
            label: 'Busqueda_por_voz',
            event: 'e_linkclick'
        });
    };

    return (
        <div className="flex h-100 ai-center">
            {inputValue ? (
                <Button
                    data-test-id="button-header-search"
                    title="Buscar"
                    iconOnly
                    variant="primary"
                    style={{ padding: '8px' }}
                    className="p-8 mr-16"
                    onClick={startSearch}
                    loading={loading}
                >
                    <Icon size={16}>
                        <IconSprite fill="#ffffff" name="search" />
                    </Icon>
                </Button>
            ) : (
                <Button
                    data-test-id="button-header-search"
                    title="audio"
                    iconOnly
                    variant="link"
                    className="px-12 py-8"
                    onClick={handleVoiceSearchClick}
                >
                    <Icon size={24}>
                        <IconSprite
                            name={isListening ? 'audio-fill' : 'audio'}
                            fill={isListening ? '#E3313B' : ''}
                        />
                    </Icon>
                </Button>
            )}
        </div>
    );
}
