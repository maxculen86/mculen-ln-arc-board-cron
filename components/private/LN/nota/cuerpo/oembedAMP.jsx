import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/com-embed.css';
import { oembedAMPTypes } from './helpers/oembedAMPHelper';

const OembedAMP = ({ data }) => {
    const { subtype, raw_oembed: rawEmbed = {} } = data;
    const { width, height, url } = rawEmbed;

    return oembedAMPTypes({ subtype, rawEmbed, width, height, url });
};

OembedAMP.arcType = 'oembed_response';
OembedAMP.outputType = 'amp';
OembedAMP.isStatic = true;
OembedAMP.propTypes = {
    data: PropTypes.shape({
        raw_oembed: PropTypes.any,
        subtype: PropTypes.string
    }).isRequired
};

export default OembedAMP;
