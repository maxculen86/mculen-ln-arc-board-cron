import React, { useState, useRef, useCallback } from 'react';
import { cx } from '@ln/ds-cva';
import Icon from '../../../features/ui/ln/icon/default';
import Button from '../../../features/ui/ln/button/default';
import Formcontrol from '../../../features/ui/ln/formControl/default';
import { useVoiceSearch } from '../../../features/LN-10-global/common/voiceSearch/default';

export default function SearchInput() {
    const [value, setValue] = useState('');
    const isSubmittingRef = useRef(false);

    const handleSearchSubmit = useCallback(
        (query = value) => {
            if (isSubmittingRef.current) return;
            const term =
                typeof query === 'string' ? query.trim() : value.trim();
            if (!term || typeof window === 'undefined') return;
            isSubmittingRef.current = true;
            window.location.href = `/buscador/?query=${encodeURIComponent(term)}`;
        },
        [value]
    );

    const {
        shouldListen,
        micDenied,
        listeningTime,
        startListening,
        stopListening
    } = useVoiceSearch({
        onSearch: transcript => {
            setValue(transcript);
            handleSearchSubmit(transcript);
        }
    });

    const handleInputChange = e => setValue(e.target.value);
    const handleClearSearch = () => setValue('');
    const handleKeyDown = e => {
        if (e.key === 'Enter') handleSearchSubmit();
    };

    const showActions = value.length > 0;

    return (
        <form
            role="search"
            className="relative"
            onSubmit={e => {
                e.preventDefault();
                handleSearchSubmit();
            }}
        >
            <Formcontrol className="border-muted w-full max-h-48 focus-within:ring-secondary-default">
                <Formcontrol.Input
                    className="text-label-md placeholder:text-base-default"
                    type="text"
                    role="searchbox"
                    enterKeyHint="search"
                    aria-label="Buscar en LA NACION"
                    readOnly={shouldListen}
                    aria-readonly={shouldListen}
                    value={value}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    placeholder={
                        shouldListen
                            ? `${listeningTime} Escuchando...`
                            : 'Iniciá una nueva busqueda...'
                    }
                />
                <Formcontrol.Adornment position="end">
                    {showActions ? (
                        <>
                            <Button
                                className="hover:bg-transparent text-secondary-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-default focus-visible:ring-offset-1"
                                variant="ghost"
                                onClick={handleClearSearch}
                                isIconOnly
                                aria-label="Borrar búsqueda"
                                title="Borrar"
                            >
                                <Icon
                                    size={16}
                                    name="close"
                                    aria-hidden="true"
                                />
                            </Button>
                            <Button
                                size={32}
                                className="bg-secondary-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-default focus-visible:ring-offset-1"
                                variant="solid"
                                onClick={handleSearchSubmit}
                                isIconOnly
                                aria-label="Buscar"
                                title="Buscar"
                            >
                                <Icon
                                    size={16}
                                    name="search"
                                    aria-hidden="true"
                                />
                            </Button>
                        </>
                    ) : (
                        <Button
                            className={cx(
                                'hover:bg-secondary-lighten focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-default focus-visible:ring-offset-1',
                                shouldListen && 'text-secondary-default'
                            )}
                            variant="ghost"
                            onClick={
                                shouldListen ? stopListening : startListening
                            }
                            isIconOnly
                            aria-label={
                                shouldListen
                                    ? 'Grabando... presioná para detener'
                                    : 'Buscar por voz'
                            }
                            aria-pressed={shouldListen}
                            title={
                                shouldListen
                                    ? 'Grabando... presioná para detener'
                                    : 'Buscar por voz'
                            }
                        >
                            <Icon
                                className={
                                    shouldListen
                                        ? 'text-error-default'
                                        : 'text-secondary-default'
                                }
                                size={20}
                                name={
                                    shouldListen
                                        ? 'mic-line-cancel-filled'
                                        : 'mic-line'
                                }
                                aria-hidden="true"
                            />
                        </Button>
                    )}
                </Formcontrol.Adornment>
            </Formcontrol>
            {micDenied && (
                <p role="alert" className="sr-only">
                    El micrófono está bloqueado. Habilitalo en la configuración
                    del navegador.
                </p>
            )}
        </form>
    );
}
