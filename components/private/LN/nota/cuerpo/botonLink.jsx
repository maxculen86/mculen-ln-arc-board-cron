import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from '../../../common/com-link';

const BotonLink = ({ data }) => {
    const { url, content } = data || {};
    return (
        <>
            {url && content ? (
                <ComLink link={url} target="_blank" title={content}>
                    {content}
                </ComLink>
            ) : null}
        </>
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
