/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useFusionContext } from 'fusion:context';

const getParagraphCount = contentElements =>
    contentElements.filter(contentElement =>
        ['text', 'image', 'oembed_response', 'video'].includes(
            contentElement.type
        )
    ).length;

export default Component => Count => {
    if (!Component) return null;

    const Enhanced = props => {
        const ref = React.createRef();
        const fusionContext = useFusionContext();
        const {
            globalContent: { content_elements: contentElements }
        } = fusionContext;

        return getParagraphCount(contentElements) >= Count ? (
            <Component {...props} ref={ref} />
        ) : null;
    };

    Enhanced.propTypes = {
        slotId: PropTypes.string.isRequired,
        device: PropTypes.string.isRequired,
        dfpId: PropTypes.string.isRequired,
        dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
            .isRequired,
        slotName: PropTypes.string.isRequired,
        targeting: PropTypes.shape({
            seccion: PropTypes.string,
            sitio: PropTypes.string
        }).isRequired,
        bidding: PropTypes.object.isRequired,
        background: PropTypes.string,
        closeButton: PropTypes.bool
    };

    Enhanced.defaultProps = {
        background: false,
        closeButton: false
    };

    return Enhanced;
};
