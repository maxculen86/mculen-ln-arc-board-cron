import React from 'react';
import PropTypes from 'fusion:prop-types';

const WidgetLayout = ({ children }) => <main>{children}</main>;

WidgetLayout.sections = [];

WidgetLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default WidgetLayout;
