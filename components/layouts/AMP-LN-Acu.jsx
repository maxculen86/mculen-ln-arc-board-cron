import React from 'react';
import PropTypes from 'fusion:prop-types';

const Amp = ({ children }) => <>{children[0]}</>;
Amp.propTypes = { children: PropTypes.arrayOf(PropTypes.nodes).isRequired };

Amp.sections = ['Primera seccion'];

export default Amp;
