import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../resources/dist/css/ln/components/modal-body.css';

const ModalBody = ({ children, className }) => {
    const extraClass = className ? ` --${className}` : '';
    return <section className={`modal-body${extraClass}`}>{children}</section>;
};

ModalBody.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};
ModalBody.defaultProps = {
    className: '',
    children: undefined
};

export default ModalBody;
