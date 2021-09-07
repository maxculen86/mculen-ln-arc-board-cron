import React from 'react';
import PropTypes from 'prop-types';

import '../../../resources/dist/css/ln/modules/mod-figcaption.css';

const ComFigcaption = props => {
    const { children } = props;
    if (!children) return null;
    return <figcaption className="mod-figcaption">{children}</figcaption>;
};

ComFigcaption.propTypes = {
    children: PropTypes.node.isRequired
};

export default ComFigcaption;
