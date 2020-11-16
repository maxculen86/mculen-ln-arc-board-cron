import React from 'react';
import '../../../resources/dist/css/ln/components/com-li.css';

const ComLi = props => {
    const {
        link,
        textname,
        blank,
        classesNames,
        classCondition,
        size,
        children
    } = props;

    return (
        <li
            className={`com-li ${classesNames ? classesNames : ''} ${
                classCondition ? classCondition : ''
            }`}
        >
            {children}
        </li>
    );
};

export default ComLi;
