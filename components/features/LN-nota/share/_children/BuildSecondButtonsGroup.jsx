import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import ModTooltip from '../../../../private/common/mod-tooltip';
import {
    buttonsList,
    googleButtons,
    BtnContainer,
    shareWhatsAppDesktop
} from '../../../../private/LN/common/utils/shareHelper';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import useShare from '../hooks/useShare';
import { buildSecondButtonsGroupVariants } from './styles';

function BuildSecondButtonsGroup({
    requestUri,
    host,
    title: basic,
    mobileTitle,
    isNegative,
    articleId,
    isHorizontal,
    isNotaNoticia
} = {}) {
    const { copy, setCopy, shareButton } = useShare({
        mobileTitle,
        basic,
        host,
        requestUri
    });

    const _classes = buildSecondButtonsGroupVariants({
        orientation: isHorizontal ? 'horizontal' : 'vertical'
    });

    const allButtons = isNotaNoticia
        ? [...buttonsList, ...googleButtons]
        : buttonsList;

    return (
        <div className={_classes}>
            <Button
                id="compartirMobile"
                title="Compartir la nota"
                variant="secondary"
                className="sm-only"
                iconOnly
                isNegative={isNegative}
                onClick={() => {
                    shareButton();
                    addEventToDataLayerV2({
                        event: 'share_note',
                        articleId,
                        title: basic,
                        rest: { tags: 'popup-nativo' }
                    });
                }}
            >
                <Icon size={24} color="inherit">
                    <IconSprite name="reply" />
                </Icon>
            </Button>
            {!isNotaNoticia && (
                <Button
                    id="whatsAppShareMobile"
                    title="Compartir la nota en Whatsapp"
                    variant="secondary"
                    iconOnly
                    size={40}
                    className="sm-only"
                    isNegative={isNegative}
                    target="_blank"
                    onClick={() => {
                        shareWhatsAppDesktop(requestUri, host);
                        addEventToDataLayerV2({
                            event: 'share_note',
                            articleId,
                            title: basic,
                            rest: { tags: 'whatsapp' }
                        });
                    }}
                >
                    <Icon size={24} color="inherit">
                        <IconSprite name="whatsapp" />
                    </Icon>
                </Button>
            )}
            {allButtons.map(
                ({
                    withContainer = false,
                    id,
                    dataEvent,
                    dataSection,
                    icon,
                    title,
                    labelDataLayer,
                    handleClick,
                    className,
                    label,
                    iconOnly = true,
                    iconSize = 24,
                    customDataLayerEvent,
                    ...r
                } = {}) => (
                    <BtnContainer withContainer={withContainer} key={id}>
                        <Button
                            dataEvent={dataEvent}
                            dataSection={dataSection}
                            title={title}
                            id={id}
                            onClick={() => {
                                handleClick({
                                    requestUri,
                                    host,
                                    basic,
                                    setCopy,
                                    mobileTitle
                                });
                                addEventToDataLayerV2(
                                    customDataLayerEvent ?? {
                                        event: 'share_note',
                                        title: basic,
                                        articleId,
                                        rest: {
                                            tags: labelDataLayer.split('_')[1]
                                        }
                                    }
                                );
                            }}
                            className={className}
                            iconOnly={iconOnly}
                            isNegative={isNegative}
                            size="inherit"
                            style={{
                                gap: '4px'
                            }}
                            {...r}
                        >
                            {label && (
                                <Text
                                    style={{
                                        color: 'var(--neutral-700)',
                                        fontWeight: '400'
                                    }}
                                    className="tracking--032 capitalize text-12 leading-150 uppercase_l leading-130_l text-8_lg -mt-2_l"
                                >
                                    {label}
                                </Text>
                            )}
                            <Icon size={iconSize} color="inherit">
                                {icon}
                            </Icon>
                        </Button>
                        {id === 'copyLinkNote' && copy && (
                            <ModTooltip
                                className="copy"
                                label="Link copiado"
                                handleTimeout={() => setCopy(false)}
                            />
                        )}
                    </BtnContainer>
                )
            )}
        </div>
    );
}

BuildSecondButtonsGroup.propTypes = {
    requestUri: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    mobileTitle: PropTypes.string.isRequired,
    isNegative: PropTypes.bool.isRequired,
    articleId: PropTypes.string.isRequired,
    isHorizontal: PropTypes.bool.isRequired,
    isNotaNoticia: PropTypes.bool.isRequired
};

export default BuildSecondButtonsGroup;
