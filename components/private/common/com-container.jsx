import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/components/com-container.css';

const ComContainer = props => {
    const { id, classesNames, children, classCondition } = props;
    if (!children) return null;
    return (
        <div
            id={id}
            className={`com-container ${classesNames} ${classCondition}`}
        >
            {children}
        </div>
    );
};

ComContainer.propTypes = {
    id: PropTypes.string,
    classesNames: PropTypes.string,
    children: PropTypes.node.isRequired,
    classCondition: PropTypes.string
};

ComContainer.defaultProps = {
    classesNames: '',
    classCondition: '',
    id: undefined
};

export default ComContainer;
