/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

function htmllibre(props) {
    const {
        globalContent: { content_elements: contentElements }
    } = props;
    const content =
        contentElements[0] && contentElements[0].content
            ? contentElements[0].content
            : undefined;

    return content ? (
        <html lang="es">
            <body>
                <div
                    dangerouslySetInnerHTML={{
                        __html: content
                    }}
                />
            </body>
        </html>
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
