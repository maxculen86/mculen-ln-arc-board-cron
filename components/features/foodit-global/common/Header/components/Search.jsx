import React, { useEffect, useState } from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import { cx } from '@ln/cva';
import SpeechRecognition, {
    useSpeechRecognition
} from 'react-speech-recognition';
import { ButtonSearch } from './ButtonSearch';
import { searchFood } from '../_helpers';
import useGetUserConfig from '../../../hooks/useGetUserConfig';
import { getAuthTokens } from '../../../../../private/common/auth/helper/loginHelper';
import { ClearButton } from './ClearButton';
import { InputContainer } from './inputContainer';
import { getMicPermissionState } from './helpers/getMicPermissionState';

export function Search({ className = '', ...r }) {
    const [inputValue, setInputValue] = useState('');
    const [isMicPermissionPending, setIsMicPermissionPending] = useState(false);
    const [typedByUser, setTypedByUser] = useState(false);
    const { isSubscribed, id: userId } = useGetUserConfig();
    const [loading, setLoading] = useState(false);

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

    const urlSearch = `${SITE_FOODIT}/buscador/?query=`;
    const urlChat = `${SITE_FOODIT}/chat/?query=`;

    const handleInputValue = e => {
        setTypedByUser(true);
        setInputValue(e.target.value);
    };

    const startSearch = async toSearch => {
        setLoading(true);
        const query =
            (typeof toSearch === 'string' && toSearch
                ? toSearch
                : inputValue) || '';
        const encodedQuery = encodeURIComponent(`${query} `);
        // add a space at the end to the query term to avoid the search engine from suggesting
        const redirectToChat = `${urlChat}${encodedQuery}`;
        const redirectToSearch = `${urlSearch}${encodedQuery}`;
        if (isSubscribed) {
            const { accessToken } = await getAuthTokens();
            const resp = await searchFood({
                query,
                userId,
                accessToken
            });
            const { chat } = resp;
            window.location.href = chat ? redirectToChat : redirectToSearch;
        } else {
            window.location.href = redirectToChat;
        }
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            startSearch();
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
            startSearch(transcript);
        }
    }, [isListening]);

    const classnames = cx('foodit-search w-100 as-center', className);
    const shouldListen =
        isListening && isMicrophoneAvailable && !isMicPermissionPending;

    return (
        <div className={classnames} {...r}>
            <div className="flex ai-center jc-between h-56 border border-all border-thin border-light-300 bg-light-1 rounded-4 pl-16 shadow-search">
                <div className="m-auto w-100 relative">
                    <InputContainer
                        shouldListen={shouldListen}
                        inputValue={inputValue}
                        isListening={isListening}
                        handleInputValue={handleInputValue}
                        handleKeyDown={handleKeyDown}
                    />
                </div>

                <ClearButton
                    show={inputValue && typedByUser}
                    onClear={() => {
                        setInputValue('');
                        setTypedByUser(false);
                    }}
                />

                <ButtonSearch
                    isListening={isListening}
                    startListening={startListening}
                    startSearch={startSearch}
                    inputValue={typedByUser ? inputValue : ''}
                    loading={loading}
                />
            </div>
        </div>
    );
}
