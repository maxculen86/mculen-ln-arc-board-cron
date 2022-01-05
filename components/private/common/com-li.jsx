import React from 'react';
import '../../../resources/dist/css/ln/components/com-li.css';

const ComLi = props => {
    const { classesNames, classCondition, children } = props;

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
