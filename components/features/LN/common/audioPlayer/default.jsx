import React, { useCallback, useEffect, useRef } from 'react';
import { Motion } from '@ln/ds-common-motion';
import { Portal } from '@ln/ds-common-portal';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import { useAudioPlayerState } from './hooks/useAudioPlayerState';
import { useAudioPlayerActions } from './hooks/useAudioPlayerActions';
import BuildAudioPlayer from './components/buildAudioPlayer';
import SummarySwitch from './components/summarySwitch';

function AudioPlayer() {
    const { isOpen } = useAudioPlayerState();
    const actions = useAudioPlayerActions();
    const previousFocusRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return undefined;
        const handleKeyDown = e => {
            if (e.key === 'Escape') actions.close();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, actions]);

    // Foco: al abrir guarda el trigger; al cerrar se lo devuelve (ver §8 README).
    useEffect(() => {
        if (isOpen) {
            previousFocusRef.current =
                document.activeElement instanceof HTMLElement
                    ? document.activeElement
                    : null;
            return undefined;
        }
        previousFocusRef.current?.focus?.();
        previousFocusRef.current = null;
        return undefined;
    }, [isOpen]);

    // Callback ref (no effect): Motion monta el drawer un render después de
    // abrir, así enfocamos recién cuando el nodo existe en el DOM.
    const setSectionRef = useCallback(
        node => {
            if (node && isOpen) node.focus();
        },
        [isOpen]
    );

    return (
        <Portal>
            <div data-tw style={{ display: 'contents' }}>
                <Motion
                    show={isOpen}
                    animation={{
                        duration: 300,
                        transitionIn: 'fadeInUp',
                        transitionOut: 'fadeOutUp'
                    }}
                >
                    <section
                        ref={setSectionRef}
                        tabIndex={-1}
                        aria-label="Reproductor de audio"
                        className="bottom-0 fixed w-full bg-neutral-1 left-1/2 -translate-x-1/2 max-w-800 px-responsive pb-80 mb:pb-88 xl:pb-32 pt-16 shadow-center z-104 focus:outline-none"
                    >
                        <div className="flex flex-col gap-12">
                            <div className="flex items-center">
                                <BuildAudioPlayer />
                                <Button
                                    variant="solid"
                                    size={32}
                                    color="white"
                                    onClick={actions.close}
                                    aria-label="Cerrar reproductor"
                                    title="Cerrar reproductor"
                                    className="ml-auto"
                                    isIconOnly
                                >
                                    <Icon
                                        name="close"
                                        size={24}
                                        fill="#010101"
                                    />
                                </Button>
                            </div>
                            <SummarySwitch />
                        </div>
                    </section>
                </Motion>
            </div>
        </Portal>
    );
}

export default AudioPlayer;
