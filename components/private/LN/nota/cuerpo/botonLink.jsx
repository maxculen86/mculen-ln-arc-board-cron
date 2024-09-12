import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import ComLink from '../../../common/com-link';
import ComButton from '../../../common/com-button';
import ComContainer from '../../../common/com-container';

const BotonLink = ({ data }) => {
    const { url, content } = data || {};

    const iconEnd = (
        <Icon size={20}>
            <IconSprite name="arrowRight" />
        </Icon>
    );

    return (
        <ComContainer classesNames="--button">
            {url && content ? (
                <ComLink link={url} target="_blank" title={content}>
                    <ComButton
                        classesNames="--secondary"
                        size="--fivexs"
                        iconEnd={iconEnd}
                    >
                        {content.toUpperCase()}
                    </ComButton>
                </ComLink>
            ) : null}
        </ComContainer>
    );
};

BotonLink.arcType = 'interstitial_link';
BotonLink.isStatic = true;

BotonLink.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default BotonLink;
