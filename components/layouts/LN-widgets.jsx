import React from 'react';
import PropTypes from 'fusion:prop-types';

const WidgetsLayout = ({ children }) => <main>{children}</main>;

WidgetsLayout.sections = [];

WidgetsLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default WidgetsLayout;
