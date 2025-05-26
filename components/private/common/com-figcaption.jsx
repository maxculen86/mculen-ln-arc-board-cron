import React from 'react';
import PropTypes from 'prop-types';

import '../../../resources/dist/css/ln/modules/mod-figcaption.css';
import { cx } from '@ln/cva';

function ComFigcaption(props) {
    const { children, className } = props;
    if (!children) return null;
    const _className = cx(className, 'mod-figcaption');
    return <figcaption className={_className}>{children}</figcaption>;
}

ComFigcaption.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

ComFigcaption.defaultProps = {
    className: ''
};

export default ComFigcaption;
