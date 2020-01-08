import React from 'react';
import PropTypes from 'fusion:prop-types';

// TODO: cambiar parrafo por paragraph y hacer test unitario
const Parrafo = ({ data, capital }) => {
    const setBoldText = text =>
        text.replace('<b>', '<strong>').replace('</b>', '</strong>');

    const setItalicText = text =>
        text.replace('<i>', '<em>').replace('</i>', '</em>');

    const content = setBoldText(setItalicText(data.content));

    return (
        <p
            className={`text${capital ? ` capital` : ''}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: content
            }}
        />
    );
};

Parrafo.arcType = 'text';

Parrafo.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number,
        type: PropTypes.string.isRequired
    }).isRequired,
    capital: PropTypes.bool
};

export default Parrafo;
