import React from 'react';
import PropTypes from 'fusion:prop-types';

// TODO: tests
const Cuerpo = ({ globalContent: { content_elements: contentElements } }) => {
    const resp = [];

    contentElements.forEach(element => {
        switch (element.type) {
            default:
                resp.push(<p>Soy un parrafo</p>);
                break;
        }
    });

    return resp;
};

Cuerpo.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired
    }).isRequired
};

export default Cuerpo;
