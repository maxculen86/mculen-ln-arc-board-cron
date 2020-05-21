import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from '../../../common/com-link';
import ComButton from '../../../common/com-button';
import '../../../../../src/statics/LN/css/components/_container.scss';

const BotonLink = ({ data }) => {
    const { url, content } = data || {};
    return (
        <div className="container --button">
            {url && content ? (
                <ComLink link={url} target="_blank" title={content}>
                    <ComButton
                        classesNames="--secondary"
                        iconName="right"
                        iconPosition="--right"
                    >
                        {content}
                    </ComButton>
                </ComLink>
            ) : null}
        </div>
    );
};

BotonLink.arcType = 'interstitial_link';

BotonLink.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default BotonLink;
