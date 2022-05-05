import React from 'react';
import PropTypes from 'fusion:prop-types';

const ModalBody = ({ children }) => {
    return <section className="modal-body">{children}</section>;
};

ModalBody.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};
ModalBody.defaultProps = {
    children: undefined
};

export default ModalBody;
