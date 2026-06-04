import React from 'react';
import { useAppContext } from 'fusion:context';
import SwitchToggle from '../../switchToggle/default';
import getAudioEvents from '../getAudioEvents';
import Icon from '../../../../ui/ln/icon/default';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';
import { useAudioPlayerState } from '../hooks/useAudioPlayerState';
import { useAudioPlayerActions } from '../hooks/useAudioPlayerActions';

function SummarySwitch() {
    const { isSummary, summaryAvailable } = useAudioPlayerState();
    const actions = useAudioPlayerActions();
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();

    const handleToggle = () => {
        const newValue = !isSummary;
        actions.setSummary(newValue);
        addEventToDataLayerV2({
            event: 'page_listened',
            rest: {
                ...getAudioEvents(globalContent, globalContentConfig, newValue),
                reproduccion: '0'
            }
        });
    };

    return (
        <div className="flex text-label-sm justify-between">
            <div className="flex gap-8 items-center">
                <span id="audio-summary-label">Escuchar resumen </span>
                <SwitchToggle
                    selected={isSummary && summaryAvailable}
                    onChange={handleToggle}
                    disabled={!summaryAvailable}
                    aria-labelledby="audio-summary-label"
                    title={
                        summaryAvailable
                            ? undefined
                            : 'Esta nota no tiene resumen disponible'
                    }
                />
            </div>
            <div className="flex gap-4 items-center">
                <span aria-hidden="true" className="flex items-center">
                    <Icon name="sparkling-filled" size={12} />
                </span>
                <span>Voz realizada con IA</span>
            </div>
        </div>
    );
}

export default SummarySwitch;
