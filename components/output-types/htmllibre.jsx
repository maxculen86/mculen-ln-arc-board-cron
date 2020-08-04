/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

//TODO: validar que se vea bien en el pagebuilder
function htmllibre(props) {
    const {
        globalContent: { content_elements: contentElements }
    } = props;
    const content =
        contentElements[0] && contentElements[0].content
            ? contentElements[0].content
            : undefined;

    return content ? (
        <div
            dangerouslySetInnerHTML={{
                __html: content
            }}
        />
    ) : (
        <></>
    );
}

htmllibre.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.arrayOf(PropTypes.string, PropTypes.object)
    }).isRequired
};

export default htmllibre;
