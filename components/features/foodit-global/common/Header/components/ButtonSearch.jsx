import React, { useEffect } from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Tooltip } from '@ln/common-ui-tooltip';
import { useDisclosure } from '@ln/hooks';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';

export function ButtonSearch({
    isListening,
    startListening,
    inputValue,
    startSearch,
    loading
}) {
    const { isOpen, onOpen, onClose } = useDisclosure(false);

    useEffect(() => {
        onOpen();
        const timer = setTimeout(onClose, 7000);
        return () => clearTimeout(timer);
    }, [onOpen, onClose]);

    const handleVoiceSearchClick = () => {
        startListening();
        addEventToDataLayerV2({
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
                <Tooltip
                    position="bottom-right"
                    content={
                        <span className="text-12">
                            ¡Nueva búsqueda por voz!
                        </span>
                    }
                    classnames={{
                        container: 'flex',
                        tooltip:
                            'py-4 flex ai-center max-w-134_lg ai-center bg-secondary-positive text-light-1 text-12 border border-all border-thin border-light-100'
                    }}
                    visible={isOpen}
                    disableTrigger
                >
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
                </Tooltip>
            )}
        </div>
    );
}
