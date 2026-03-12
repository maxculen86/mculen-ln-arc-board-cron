import React from 'react';
import '../../../resources/dist/css/ln/components/modal-body.css';

function ModalBody({ children, className = '' }) {
    const extraClass = className ? ` --${className}` : '';
    return <section className={`modal-body${extraClass}`}>{children}</section>;
}

export default ModalBody;
