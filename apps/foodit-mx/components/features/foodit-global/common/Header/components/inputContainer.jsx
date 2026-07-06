import React from 'react';
import { Text } from '@ln/common-ui-text';
import { cx } from '@ln/cva';
import { useListeningTimer } from '../hooks/helperSearch';
import { useNavigationData } from '../hooks/useNavigationData';

export function InputContainer({
    inputValue,
    handleInputValue,
    handleKeyDown,
    shouldListen,
    isListening
}) {
    const { termicasData = {} } = useNavigationData();

    const hideChatIa = termicasData?.hide_chat_ia_foodit === 'true';

    const placeHolderText = hideChatIa
        ? '¿Qué querés cocinar hoy?'
        : 'Buscá o pregúntale a la IA';

    const listeningTime = useListeningTimer(shouldListen);

    const classNameInput = cx(
        'text-primary-positive text-16 w-100 bg-light-1 pr-16 --search-cancel-button-hide',
        { 'icon-ia': !inputValue && !isListening && !hideChatIa }
    );

    return (
        <>
            <input
                className={classNameInput}
                type="search"
                enterKeyHint="search"
                readOnly={shouldListen}
                placeholder={shouldListen ? '' : placeHolderText}
                value={inputValue}
                onChange={handleInputValue}
                onKeyDown={handleKeyDown}
            />

            {shouldListen && (
                <div className="absolute top-0 flex">
                    <Text className="flex gap-8 text-16">
                        {listeningTime}
                        <span className="text-light-600">Escuchando...</span>
                    </Text>
                </div>
            )}
        </>
    );
}
