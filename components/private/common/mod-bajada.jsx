/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const ModBajada = ({ link, subheadSize, subheadText }) => {
    return (
        <p className={`com-subhead ${subheadSize || '--twoxs'}`}>
            <a
                href={link}
                aria-label={subheadText}
                className="com-link"
                title={subheadText}
                dangerouslySetInnerHTML={{ __html: subheadText }}
            />
        </p>
    );
};

ModBajada.propTypes = {
    link: PropTypes.string.isRequired,
    subheadSize: PropTypes.string.isRequired,
    subheadText: PropTypes.string.isRequired
};

export default ModBajada;
