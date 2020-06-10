import React from 'react';
import PropTypes from 'fusion:prop-types';
import WithInfographic from '../../common/hocs/WithInfographic';
import RawHTML from '../../common/rawHTML';

const ComInfografia = ({ content }) => {
    if (!content.length) return <></>;
    const data = {
        raw_oembed: { html: content },
        classes: '--pym'
    };

    return <RawHTML data={data} />;
};

ComInfografia.propTypes = {
    content: PropTypes.string.isRequired
};

export default WithInfographic(ComInfografia);
