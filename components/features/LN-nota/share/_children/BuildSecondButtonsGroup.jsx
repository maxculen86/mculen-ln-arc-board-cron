import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import classNames from 'classnames';
import ModTooltip from '../../../../private/common/mod-tooltip';
import {
    buttonsList,
    BtnContainer,
    shareWhatsAppDesktop
} from '../../../../private/LN/common/utils/shareHelper';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import useShare from '../hooks/useShare';
import {
    LIVEBLOG_EDITORIAL,
    VIDEO
} from '../../../../private/common/utils/subtypes/subtypeHelper';

function BuildSecondButtonsGroup({
    requestUri,
    host,
    title: basic,
    mobileTitle,
    subtypeVideo,
    articleId,
    subtype
} = {}) {
    const { copy, setCopy, shareButton } = useShare({
        mobileTitle,
        basic,
        host,
        requestUri
    });

    const subtypesWithCustomLayout = [VIDEO, LIVEBLOG_EDITORIAL];
    const isCustomLayout = subtypesWithCustomLayout.includes(subtype);

    const paddingPosition = isCustomLayout
        ? 'pl-8 ai-center gap-8 gap-24_m'
        : 'pl-8_max1023 ai-center_max1023 jc-center_l pt-16_l gap-8 gap-24_m';

    const flexVideo = isCustomLayout ? '' : 'flex-column_l';
    const _classes = classNames(
        'second-buttons-group',
        'flex ai-center',
        flexVideo,
        paddingPosition
    );

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
                    className
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
                                addEventToDataLayerV2({
                                    event: 'share_note',
                                    title: basic,
                                    articleId,
                                    rest: { tags: labelDataLayer.split('_')[1] }
                                });
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
    subtypeVideo: PropTypes.string.isRequired,
    articleId: PropTypes.string.isRequired,
    subtype: PropTypes.string.isRequired
};

export default BuildSecondButtonsGroup;
