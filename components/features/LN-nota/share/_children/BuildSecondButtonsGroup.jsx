/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import ModTooltip from '../../../../private/common/mod-tooltip';
import {
    buttonsList,
    BtnContainer,
    addEventToDataLayer,
    setEventShare,
    getTwitterTitle,
    shareWhatsAppMobile,
} from '../../../../private/LN/common/utils/shareHelper';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import classNames from 'classnames';

const BuildSecondButtonsGroup = ({
    requestUri,
    host,
    title: basic,
    mobileTitle,
    subtypeVideo,
} = {}) => {
    const [copy, setCopy] = useState(false);

    const paddingPosition = subtypeVideo
        ? 'pl-8 ai-center gap-16_m gap-24'
        : 'pl-8_max1023 ai-center_max1023 jc-center_l pt-16_l gap-8 gap-24_m';

    const flexVideo = subtypeVideo ? '' : 'flex-column_l';
    const _classes = classNames(
        'second-buttons-group',
        'flex ai-center',
        flexVideo,
        paddingPosition,
    );

    const shareButton = () => {
        const shareTitle = getTwitterTitle(mobileTitle, basic);
        const shareUrl = host.concat(requestUri);
        const shareData = {
            title: shareTitle,
            text: shareTitle,
            url: shareUrl,
        };

        if (navigator && Boolean(navigator.canShare)) {
            navigator.share(shareData);
        }
    };

    return (
        <div className={_classes}>
            <Button
                id="compartirMobile"
                title="Compartir la nota"
                variant="secondary"
                className="sm-only"
                iconOnly
                isNegative={subtypeVideo}
                onClick={() => {
                    shareButton();
                    setEventShare();
                }}
            >
                <Icon size={24} color="inherit">
                    <IconSprite name="reply" />
                </Icon>
            </Button>
            <Button
                id="whatsAppShareMobile"
                title="Compartir la nota en Whatsapp"
                variant="secondary"
                iconOnly
                size={40}
                className="sm-only"
                isNegative={subtypeVideo}
                target="_blank"
                onClick={() => {
                    shareWhatsAppMobile(requestUri, host, basic);
                }}
            >
                <Icon size={24} color="inherit">
                    <IconSprite name="whatsapp" />
                </Icon>
            </Button>
            {buttonsList.map(
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
                } = {}) => {
                    return (
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
                                        mobileTitle,
                                    });
                                    addEventToDataLayer(title, labelDataLayer);
                                }}
                                className={className}
                                iconOnly
                                isNegative={subtypeVideo}
                                size="inherit"
                            >
                                <Icon size={24} color="inherit">
                                    {icon}
                                </Icon>
                            </Button>
                            {id === 'copyLinkNote' && copy && (
                                <ModTooltip
                                    className="copy"
                                    label="Copiado"
                                    handleTimeout={() => setCopy(false)}
                                />
                            )}
                        </BtnContainer>
                    );
                },
            )}
        </div>
    );
};

BuildSecondButtonsGroup.propTypes = {
    requestUri: PropTypes.string,
    host: PropTypes.string,
    title: PropTypes.string,
    mobileTitle: PropTypes.string,
    subtypeVideo: PropTypes.string,
};

export default BuildSecondButtonsGroup;
