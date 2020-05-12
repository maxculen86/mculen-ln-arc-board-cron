import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-figcaption.css';

const ComFigcaption = props => {
    const { children } = props;
    if (!children) return null;
    return <figcaption className="mod-figcaption">{children}</figcaption>;
};

ComFigcaption.propTypes = {
    children: PropTypes.elementType.isRequired
};

export default ComFigcaption;
