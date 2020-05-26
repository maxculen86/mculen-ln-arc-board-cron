import React from 'react';
import '../../../resources/dist/css/ln/components/com-button.css';

const ComButton = props => {
    const { textname, classCondition, onClick } = props;

    return (
        <button
            type="button"
            className={`com-button ${classCondition ? classCondition : ''}`}
            onClick={onClick}
        >
            {textname}
        </button>
    );
};

export default ComButton;
