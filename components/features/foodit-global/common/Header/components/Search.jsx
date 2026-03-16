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
import { searchFood } from '../_helpers';
import useGetUserConfig from '../../../hooks/useGetUserConfig';
import { getAuthTokens } from '../../../../../private/common/auth/helper/loginHelper';
import { useNavigationData } from '../hooks/useNavigationData';

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
    const [inputValue, setInputValue] = useState('');
    const [isMicPermissionPending, setIsMicPermissionPending] = useState(false);
    const [typedByUser, setTypedByUser] = useState(false);
    const { isSubscribed, id: userId } = useGetUserConfig();
    const [loading, setLoading] = useState(false);
    const { termicasData = {} } = useNavigationData();

    const hideChatIa = termicasData?.hide_chat_ia_foodit === 'true';

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
    const urlChat = `${SITE_FOODIT}/chat/?query=${encodedQuery}`;

    const handleInputValue = e => {
        setTypedByUser(true);
        setInputValue(e.target.value);
    };

    const startSearch = async () => {
        setLoading(true);
        const query = typedByUser ? inputValue : '';
        if (!isSubscribed) {
            window.location.href = urlSearch;
            return;
        }
        const { accessToken } = await getAuthTokens();
        const resp = await searchFood({ query, userId, accessToken });
        const { chat } = resp;
        if (chat) {
            window.location.href = urlChat;
        } else {
            window.location.href = urlSearch;
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
            const encodedQueryListed = encodeURIComponent(`${transcript} `);
            startSearch(encodedQueryListed);
        }
    }, [isListening]);

    const classnames = cx('foodit-search w-100 as-center', className);
    const classNameInput = cx(
        'text-primary-positive text-16 w-100 bg-light-1 pr-16 --search-cancel-button-hide',
        { 'icon-ia': !inputValue && !isListening && !hideChatIa }
    );

    const placeHolderText = hideChatIa
        ? '¿Qué querés cocinar hoy?'
        : 'Buscá o pregúntale a la IA';

    const shouldListen =
        isListening && isMicrophoneAvailable && !isMicPermissionPending;

    const listeningTime = useListeningTimer(shouldListen);
    return (
        <div className={classnames} {...r}>
            <div className="flex ai-center jc-between h-56 border border-all border-thin border-light-300 bg-light-1 rounded-4 pl-16 shadow-search">
                <div className="m-auto w-100 relative">
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
                    startSearch={startSearch}
                    inputValue={typedByUser ? inputValue : ''}
                    loading={loading}
                />
            </div>
        </div>
    );
}
