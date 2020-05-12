import React from 'react';
import PropTypes from 'fusion:prop-types';

const Container = props => {
    const { id, classesNames, children } = props;
    if (!children) return null;
    return (
        <div id={id} className={classesNames}>
            {children}
        </div>
    );
};

Container.propTypes = {
    id: PropTypes.string,
    classesNames: PropTypes.string,
    children: PropTypes.elementType.isRequired
};

export default Container;
