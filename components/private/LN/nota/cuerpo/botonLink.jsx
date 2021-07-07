import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from '../../../common/com-link';
import ComButton from '../../../common/com-button';
import ComContainer from '../../../common/com-container';

const BotonLink = ({ data }) => {
    const { url, content } = data || {};

    return (
        <ComContainer classesNames="--button">
            {url && content ? (
                <ComLink link={url} target="_blank" title={content}>
                    <ComButton
                        classesNames="--secondary"
                        //classCondition="--compact"
                        iconName="right"
                        iconPosition="--right"
                        size="--fivexs"
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
