import React from 'react';
import { useAppContext } from 'fusion:context';
import Button from '../../../ui/ln/button/default';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import getAudioEvents from '../../../LN-10-global/common/utils/getAudioEvents';
import Icon from '../../../ui/ln/icon/default';

function ToggleButton({ isSummary, handleToggle }) {
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();

    return (
        <div className="toggle-bttn-audio flex ai-center ai-start_l">
            <Button
                id="notaCompleta"
                isIconOnly
                title="Nota Completa"
                dataEvent="LinkClick"
                onClick={() => {
                    handleToggle(false);
                    if (isSummary) {
                        addEventToDataLayerV2({
                            event: 'page_listened',
                            rest: {
                                ...getAudioEvents(
                                    globalContent,
                                    globalContentConfig,
                                    false
                                ),
                                reproduccion: '0'
                            }
                        });
                    }
                }}
            >
                <Icon name="article" />
                <span>nota completa</span>
            </Button>
            <Button
                id="resumenConIA"
                isIconOnly
                title="Resumen con IA"
                dataEvent="LinkClick"
                onClick={() => {
                    handleToggle(true);
                    if (!isSummary) {
                        addEventToDataLayerV2({
                            event: 'page_listened',
                            rest: {
                                ...getAudioEvents(
                                    globalContent,
                                    globalContentConfig,
                                    true
                                ),
                                reproduccion: '0'
                            }
                        });
                    }
                }}
            >
                <Icon name="summary" />
                <span>resumen con ia</span>
            </Button>
        </div>
    );
}

export default ToggleButton;
