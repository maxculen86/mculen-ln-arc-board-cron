import React from 'react';
import PropTypes from 'fusion:prop-types';

const Emtpy = ({ children }) => <>{children}</>;

Emtpy.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

Emtpy.sections = ['Cuerpo'];

export default Emtpy;
