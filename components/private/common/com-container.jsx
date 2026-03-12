import React from 'react';
import '../../../resources/dist/css/ln/components/com-container.css';

function ComContainer({
    id,
    classesNames = '',
    children,
    classCondition = ''
}) {
    if (!children) return null;
    return (
        <div
            id={id}
            className={`com-container ${classesNames} ${classCondition}`}
        >
            {children}
        </div>
    );
}

export default ComContainer;
