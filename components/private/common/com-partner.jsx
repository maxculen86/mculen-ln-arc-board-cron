import React from 'react';
import '../../../resources/dist/css/ln/components/com-partner.css';

function ComPartner({ children, classCondition = '', size = '' }) {
    return (
        <span className={`com-partner ${classCondition || ''} ${size || ''}`}>
            {children}
        </span>
    );
}

export default ComPartner;
