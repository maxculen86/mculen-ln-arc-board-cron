import React from 'react';
import PropTypes from 'fusion:prop-types';

const ModBajada = ({ link, subheadSize, subheadText }) => {
    return (
        <p className={`com-subhead ${subheadSize || '--threexs'}`}>
            <a href={link} className="com-link" title={subheadText}>
                {subheadText}
            </a>
        </p>
    );
};

ModBajada.propTypes = {
    link: PropTypes.string.isRequired,
    subheadSize: PropTypes.string.isRequired,
    subheadText: PropTypes.string.isRequired
};

export default ModBajada;
