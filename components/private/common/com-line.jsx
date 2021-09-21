import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/components/com-line.css';

const ComLine = props => {
    const { classesNames, classCondition } = props;
    return (
        <div
            className={`com-line ${classesNames ? classesNames : ``} ${
                classCondition ? classCondition : ``
            }`}
        />
    );
};

ComLine.propTypes = {
    classesNames: PropTypes.string
};
ComLine.defaultProps = {
    classesNames: ''
};

export default ComLine;
