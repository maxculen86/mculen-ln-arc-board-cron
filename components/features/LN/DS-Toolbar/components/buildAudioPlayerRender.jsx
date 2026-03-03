/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useWindowSize } from '@ln/hooks';
import { Motion } from '@ln/ds-common-motion';
import { Portal } from '@ln/ds-common-portal';
import { Button } from '@ln/ds-common-button';
import BuildAudioPlayer from './buildAudioPlayer';
import Icon from '../../../ui/ln/icon/default';

function BuildAudioPlayerRender({ audioPlayerData }) {
    const { isOpenAudioPlayer, onCloseAudioPlayer } = audioPlayerData;

    const { width: viewportWidth } = useWindowSize();
    const isMobile = viewportWidth < 1280;

    const buildAudioPlayer = isOpenAudioPlayer && (
        <BuildAudioPlayer {...audioPlayerData} />
    );

    if (!isMobile) return buildAudioPlayer;

    return (
        <Portal>
            <div data-tw style={{ display: 'contents' }}>
                <Motion
                    show={isOpenAudioPlayer && isMobile}
                    animation={{
                        duration: 300,
                        transitionIn: 'fadeInUp',
                        transitionOut: 'fadeOutUp'
                    }}
                >
                    <div className="bottom-0 fixed w-full bg-neutral-1 left-1/2 -translate-x-1/2 md:max-w-640 p-16 shadow-center z-50">
                        <div className="flex flex-col gap-12">
                            <Button
                                variant="ghost"
                                size="custom"
                                className="size-24 ml-auto"
                                color="secondary"
                                onClick={() => {
                                    onCloseAudioPlayer();
                                }}
                            >
                                <Icon name="close" size={24} />
                            </Button>
                            {buildAudioPlayer}
                        </div>
                    </div>
                </Motion>
            </div>
        </Portal>
    );
}

export default BuildAudioPlayerRender;
