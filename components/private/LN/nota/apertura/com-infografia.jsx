import React from 'react';
import PropTypes from 'fusion:prop-types';
import WithInfographic from '../../common/hocs/WithInfographic';
import Html from '../cuerpo/html';
import HtmlAMP from '../cuerpo/htmlAMP';

const ComInfografia = ({ content, outputType, _id }) => {
    if (!content.length) return <></>;

    const data = {
        content,
        _id
    };

    if (outputType === 'amp') {
        return <HtmlAMP data={data} />;
    }

    return <Html data={data} />;
};

ComInfografia.propTypes = {
    content: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default WithInfographic(ComInfografia);
