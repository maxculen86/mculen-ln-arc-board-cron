import React from 'react';

import '../../../resources/dist/css/ln/components/com-subtitle.css';

function ComSubtitle({ children, classCondition = '', size }) {
    return (
        <h4 className={`com-subtitle ${size || ''} ${classCondition || ''}`}>
            {children || ``}
        </h4>
    );
}

export default ComSubtitle;
