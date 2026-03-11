import React, { useEffect, useState } from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { SITE_FOODIT } from 'fusion:environment';
import { cx } from '@ln/cva';
import SpeechRecognition, {
    useSpeechRecognition
} from 'react-speech-recognition';
import { Text } from '@ln/common-ui-text';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { ButtonSearch } from './ButtonSearch';
import { useListeningTimer } from '../hooks/helperSearch';

const getMicPermissionState = async () => {
    try {
        if (typeof navigator === 'undefined') return null;
        if (!navigator.permissions?.query) return null;

        const status = await navigator.permissions.query({
            name: 'microphone'
        });
        return status?.state || null;
    } catch {
        return null;
    }
};

export function Search({ className = '', ...r }) {
    const querySelected =
        typeof window !== 'undefined'
            ? new URLSearchParams(window?.location?.search).get('query')
            : '';

    const [inputValue, setInputValue] = useState(querySelected || '');
    const [isMicPermissionPending, setIsMicPermissionPending] = useState(false);
    const [typedByUser, setTypedByUser] = useState(false);

    const {
        listening: isListening,
        transcript,
        resetTranscript,
        isMicrophoneAvailable
    } = useSpeechRecognition();

    useEffect(
        () => () => {
            SpeechRecognition.stopListening();
            SpeechRecognition.abortListening();
        },
        []
    );

    // add a space at the end to the query term to avoid the search engine from suggesting
    const encodedQuery = encodeURIComponent(`${inputValue} `);
    const urlSearch = `${SITE_FOODIT}/buscador/?query=${encodedQuery}`;

    const handleInputValue = e => {
        setTypedByUser(true);
        setInputValue(e.target.value);
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            window.location.href = urlSearch;
        }
    };

    const startListening = async () => {
        resetTranscript();

        const startSR = () => {
            SpeechRecognition.startListening({
                continuous: false,
                interimResults: false,
                language: 'es-AR'
            });
        };

        setIsMicPermissionPending(true);

        const permState = await getMicPermissionState();

        if (permState === 'denied') {
            setIsMicPermissionPending(false);
            return;
        }

        if (permState === 'granted') {
            setIsMicPermissionPending(false);
            startSR();
            return;
        }

        if (
            typeof navigator !== 'undefined' &&
            navigator.mediaDevices?.getUserMedia
        ) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });

                stream.getTracks().forEach(track => track.stop());

                setIsMicPermissionPending(false);
                startSR();
            } catch {
                setIsMicPermissionPending(false);
            }
        } else {
            setIsMicPermissionPending(false);
            startSR();
        }
    };

    useEffect(() => {
        if (transcript) {
            setTypedByUser(false);
            setInputValue(transcript);
            SpeechRecognition.stopListening();
            const encodedQueryListed = encodeURIComponent(`${transcript} `);
            const urlSearchListed = `${SITE_FOODIT}/buscador/?query=${encodedQueryListed}`;
            window.location.href = urlSearchListed;
        }
    }, [isListening]);

    const classnames = cx('foodit-search w-100 as-center', className);

    const shouldListen =
        isListening && isMicrophoneAvailable && !isMicPermissionPending;

    const listeningTime = useListeningTimer(shouldListen);
    return (
        <div className={classnames} {...r}>
            <div className="flex ai-center jc-between h-56 border border-all border-thin border-light-300 bg-light-1 rounded-4 pl-16 shadow-search">
                <div className="m-auto w-100 relative">
                    <input
                        className="text-light-600 text-16 w-100 bg-light-1 pr-16 --search-cancel-button-hide"
                        type="search"
                        enterKeyHint="search"
                        readOnly={shouldListen}
                        placeholder={
                            shouldListen ? '' : '¿Qué querés cocinar hoy?'
                        }
                        value={inputValue}
                        onChange={handleInputValue}
                        onKeyDown={handleKeyDown}
                    />

                    {shouldListen && (
                        <div className="absolute top-0 flex">
                            <Text className="flex gap-8 text-16">
                                {listeningTime}
                                <span className="text-light-600">
                                    Escuchando...
                                </span>
                            </Text>
                        </div>
                    )}
                </div>

                {inputValue && typedByUser ? (
                    <Button
                        data-test-id="button-header-search"
                        title="Borrar"
                        iconOnly
                        variant="link"
                        className="px-12 py-8"
                        onClick={() => {
                            setInputValue('');
                            setTypedByUser(false);
                        }}
                    >
                        <Icon size={24}>
                            <IconSprite name="close" />
                        </Icon>
                    </Button>
                ) : null}

                <ButtonSearch
                    isListening={isListening}
                    startListening={startListening}
                    inputValue={typedByUser ? inputValue : ''}
                    urlSearch={urlSearch}
                />
            </div>
        </div>
    );
}
