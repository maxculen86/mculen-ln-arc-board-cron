import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-container.css';

const ComContainer = props => {
    const { id, classesNames, children } = props;
    if (!children) return null;
    return (
        <div id={id} className={classesNames}>
            {children}
        </div>
    );
};

ComContainer.propTypes = {
    id: PropTypes.string,
    classesNames: PropTypes.string,
    children: PropTypes.elementType.isRequired
};

export default ComContainer;
