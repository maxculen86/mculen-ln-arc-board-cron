import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/common-ui-icon';
import { Tooltip } from '@ln/common-ui-tooltip';
import { useDisclosure } from '@ln/hooks';
import classNames from 'classnames';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import { addEventToDataLayerV2 } from '../../LN/common/utils/addEventToDataLayer';
import { IA_AUDIO_SUMMARY_TRACKING_STORAGE } from './helpers';
import getAudioEvents from '../../../features/LN-10-global/common/utils/getAudioEvents';

function ToggleButton({ contentVariant, handleToggle }) {
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();

    const {
        isOpen: tooltipVisible,
        onClose: closeTooltip,
        onOpen: openTooltip
    } = useDisclosure(false);

    useEffect(() => {
        const iaAudioSummaryTracking = localStorage.getItem(
            IA_AUDIO_SUMMARY_TRACKING_STORAGE.key,
            IA_AUDIO_SUMMARY_TRACKING_STORAGE.value
        );
        if (!iaAudioSummaryTracking) openTooltip();
    }, []);

    const notaCompletaBttn = classNames(
        'audio-toggle-left border-neutral-light-200 rounded-top-left-4 rounded-bottom-left-4 rounded-top-right-0 rounded-bottom-right-0'
    );
    const resumenConIABttn = classNames(
        'audio-toggle-right border-neutral-light-200 rounded-top-right-4 rounded-bottom-right-4 rounded-top-left-0 rounded-bottom-left-0'
    );

    const handleClick = variant => {
        handleToggle(variant);

        if (tooltipVisible) {
            closeTooltip();
            localStorage.setItem(
                IA_AUDIO_SUMMARY_TRACKING_STORAGE.key,
                IA_AUDIO_SUMMARY_TRACKING_STORAGE.value
            );
        }
    };

    return (
        <div className="toggle-bttn-audio flex ai-center mt-20 mt-0_l mb-16_l ai-start_l">
            <Button
                id="notaCompleta"
                variant={contentVariant === 'article' ? 'primary' : 'secondary'}
                className={notaCompletaBttn}
                title="Nota Completa"
                dataSection="Nota Completa"
                dataEvent="LinkClick"
                onClick={() => {
                    handleClick('article');
                    if (contentVariant !== 'article') {
                        addEventToDataLayerV2({
                            event: 'page_listened',
                            rest: getAudioEvents(
                                globalContent,
                                globalContentConfig,
                                'article'
                            )
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
            <div className="relative flex">
                <Button
                    id="resumenConIA"
                    variant={
                        contentVariant === 'summary' ? 'primary' : 'secondary'
                    }
                    className={resumenConIABttn}
                    title="Resumen con IA"
                    dataSection="Resumen con IA"
                    dataEvent="LinkClick"
                    onClick={() => {
                        handleClick('summary');
                        if (contentVariant !== 'summary') {
                            addEventToDataLayerV2({
                                event: 'page_listened',
                                rest: getAudioEvents(
                                    globalContent,
                                    globalContentConfig,
                                    'summary'
                                )
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
                <Tooltip
                    visible={tooltipVisible}
                    position="top"
                    className="rounded-4 text-12_130 px-8 py-12 text-light-50 bg-blue-500 w-max z-101"
                    style={{ maxWidth: '218px' }}
                >
                    <Icon size={16}>
                        <IconSprite name="iaTools" />
                    </Icon>
                    Escuchar el resumen de la nota generado por la inteligencia
                    artificial
                    <Button
                        onClick={closeTooltip}
                        iconOnly
                        size="inherit"
                        variant="custom"
                        className="js-start"
                    >
                        <Icon size={20}>
                            <IconSprite name="close" fill="#fff" />
                        </Icon>
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}

ToggleButton.propTypes = {
    contentVariant: PropTypes.string.isRequired,
    handleToggle: PropTypes.func.isRequired
};

export default ToggleButton;
