import React from 'react';
import PropTypes from 'fusion:prop-types';

const Amp = ({ children }) => <div className="amp">{children[0]}</div>;
Amp.propTypes = { children: PropTypes.arrayOf(PropTypes.nodes).isRequired };

Amp.sections = ['Primera seccion'];

export default Amp;
