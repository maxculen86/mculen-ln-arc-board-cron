import React from 'react';
import PropTypes from 'fusion:prop-types';

// TODO: tests
const Cuerpo = ({ globalContent: { content_elements: contentElements } }) => {
    contentElements.forEach(element => {
        switch (element.type) {
            default:
                break;
        }
    });

    return <React.Fragment></React.Fragment>;
};

Cuerpo.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired
    }).isRequired
};

export default Cuerpo;
