import React from 'react';

import '../../../resources/dist/css/ln/components/com-partner.css';

const ComPartner = props => {
    const { children, classCondition, size } = props;

    return (
        <span
            className={`com-partner ${classCondition ? classCondition : ''} --${
                size ? size : ``
            }`}
        >
            {children}
        </span>
    );
};

export default ComPartner;
