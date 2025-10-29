import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/common-ui-icon';
import classNames from 'classnames';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import { addEventToDataLayerV2 } from '../../LN/common/utils/addEventToDataLayer';
import getAudioEvents from '../../../features/LN-10-global/common/utils/getAudioEvents';

function ToggleButton({ isSummary, handleToggle }) {
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();

    const notaCompletaBttn = classNames(
        'audio-toggle-left border-neutral-light-200 rounded-top-left-4',
        'rounded-bottom-left-4 rounded-top-right-0 rounded-bottom-right-0 w-100 w-max_lg'
    );
    const resumenConIABttn = classNames(
        'audio-toggle-right border-neutral-light-200 rounded-top-right-4',
        'rounded-bottom-right-4 rounded-top-left-0 rounded-bottom-left-0 w-100 w-max_lg'
    );

    return (
        <div className="toggle-bttn-audio flex ai-center ai-start_l">
            <Button
                id="notaCompleta"
                variant={!isSummary ? 'primary' : 'secondary'}
                className={notaCompletaBttn}
                title="Nota Completa"
                dataSection="Nota Completa"
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
                <Icon
                    size={24}
                    color="inherit"
                    className="transition transition-none"
                >
                    <IconSprite name="article" />
                </Icon>
                <Text>nota completa</Text>
            </Button>
            <Button
                id="resumenConIA"
                variant={isSummary ? 'primary' : 'secondary'}
                className={resumenConIABttn}
                title="Resumen con IA"
                dataSection="Resumen con IA"
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
                <Icon
                    size={16}
                    color="inherit"
                    className="transition transition-none"
                >
                    <IconSprite name="summary" />
                </Icon>
                <Text>resumen con ia</Text>
            </Button>
        </div>
    );
}

ToggleButton.propTypes = {
    isSummary: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired
};

export default ToggleButton;
