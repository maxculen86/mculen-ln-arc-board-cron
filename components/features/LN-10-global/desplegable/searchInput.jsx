import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SITE_LANACION } from 'fusion:environment';
import { cx } from '@ln/ds-cva';
import { useClickOutside, useFocusTrap } from '@ln/ds-hooks';
import Icon from '../../ui/ln/icon/default';
import Formcontrol from '../../ui/ln/formControl/default';
import Button from '../../ui/ln/button/default';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import { useVoiceSearch } from '../common/voiceSearch/default';
import { useHeaderContext } from '../header/context';

const LABEL_GRABANDO = 'Grabando... presioná para detener';
const LABEL_VOZ = 'Buscar por voz';

export default function InputSection({
    isOpen,
    collapsible = false,
    autoFocus = false,
    onClose,
    negative: negativeProp
}) {
    const [inputValue, setInputValue] = useState('');
    const [typedByUser, setTypedByUser] = useState(false);
    const isSubmittingRef = useRef(false);
    const compactInputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (autoFocus) compactInputRef.current?.focus();
    }, []);

    useClickOutside({
        refs: [containerRef],
        handler: onClose,
        enabled: collapsible && isOpen
    });

    useFocusTrap({
        containerRef,
        enabled: collapsible && isOpen,
        initialFocusRef: compactInputRef
    });

    useEffect(() => {
        if (isOpen && autoFocus) compactInputRef.current?.focus();
    }, [isOpen]);

    const handleSearch = useCallback(
        (query = inputValue) => {
            if (isSubmittingRef.current) return;
            const term =
                typeof query === 'string' ? query.trim() : inputValue.trim();
            if (!term) return;
            isSubmittingRef.current = true;
            addEventToDataLayerV2({
                event: 'e_linkclick',
                action: 'menu_secciones',
                category: 'home_ln10',
                label: 'buscar'
            });
            if (typeof window !== 'undefined') {
                window.location.href = `${SITE_LANACION}/buscador/?query=${encodeURIComponent(term)}`;
            }
        },
        [inputValue]
    );

    const { shouldListen, listeningTime, startListening, stopListening } =
        useVoiceSearch({
            onSearch: transcript => {
                setTypedByUser(false);
                setInputValue(transcript);
                handleSearch(transcript);
            }
        });

    useEffect(() => {
        const handleEscapeKey = e => {
            if (e.key === 'Escape') stopListening();
        };
        if (shouldListen) window.addEventListener('keydown', handleEscapeKey);
        return () => window.removeEventListener('keydown', handleEscapeKey);
    }, [shouldListen, stopListening]);

    const handleInputValue = e => {
        setTypedByUser(true);
        setInputValue(e.target.value);
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') handleSearch();
        if (e.key === 'Escape') {
            if (shouldListen) stopListening();
            else onClose?.();
        }
    };

    const handleClear = () => {
        setInputValue('');
        setTypedByUser(false);
    };

    const handleVoiceClick = () => {
        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'menu_secciones',
            category: 'home_ln10',
            label: 'busqueda_por_voz'
        });
        setInputValue('');
        setTypedByUser(false);
        startListening();
    };

    const { negative: negativeCtx } = useHeaderContext();
    const negative = negativeProp ?? !!negativeCtx;
    const buttonColor = negative ? 'white' : 'secondary';

    const showActions = typedByUser && inputValue;
    const micLabel = shouldListen ? LABEL_GRABANDO : LABEL_VOZ;
    const micIcon = shouldListen ? 'mic-line-cancel-filled' : 'mic-line';
    const classNameInput = cx(
        'transition-[width,opacity] duration-300 ease-in-out h-[48px]',
        collapsible && 'absolute -top-24 -left-40',
        {
            'px-8 py-8 border border-all border-muted w-full opacity-100':
                !collapsible,
            'px-8 py-8 border border-all border-muted w-509 opacity-100 z-10':
                collapsible && isOpen,
            'w-0 opacity-0 p-0 border-none pointer-events-none':
                collapsible && !isOpen
        }
    );

    return (
        <Formcontrol ref={containerRef} className={classNameInput}>
            {!showActions && !shouldListen && (
                <Formcontrol.Adornment className="pl-8" position="start">
                    <Icon
                        size={16}
                        name="search"
                        className={cx({ 'text-white-default': negative })}
                    />
                </Formcontrol.Adornment>
            )}
            <Formcontrol.Input
                ref={compactInputRef}
                type="text"
                className={cx(
                    'placeholder:text-base-default',
                    negative &&
                        'placeholder:text-white-default text-white-default',
                    (showActions || shouldListen) && 'px-16'
                )}
                role="searchbox"
                enterKeyHint="search"
                aria-label="Buscar en LA NACION"
                readOnly={shouldListen}
                aria-readonly={shouldListen}
                placeholder={
                    shouldListen
                        ? `${listeningTime} Escuchando...`
                        : 'Buscá en LA NACION'
                }
                value={inputValue}
                onChange={handleInputValue}
                onKeyDown={handleKeyDown}
            />
            <Formcontrol.Adornment position="end">
                {showActions ? (
                    <>
                        <Button
                            onClick={handleClear}
                            aria-label="Borrar búsqueda"
                            title="Borrar"
                            variant="ghost"
                            color={buttonColor}
                            isIconOnly
                        >
                            <Icon size={16} name="close" />
                        </Button>
                        <Button
                            size={32}
                            onClick={handleSearch}
                            aria-label="Ir al buscador"
                            title="Ir al buscador"
                            color={buttonColor}
                            isIconOnly
                        >
                            <Icon size={16} name="search" />
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={handleVoiceClick}
                        aria-label={micLabel}
                        aria-pressed={shouldListen}
                        title={micLabel}
                        variant="ghost"
                        color={buttonColor}
                        isIconOnly
                    >
                        <Icon
                            className={cx({
                                'text-error-default': shouldListen
                            })}
                            size={16}
                            name={micIcon}
                        />
                    </Button>
                )}
            </Formcontrol.Adornment>
        </Formcontrol>
    );
}
