import React from 'react';
import PropTypes from 'prop-types';

function NotaVideoOpening({ children }) {
    return (
        <div className="lay grid grid-cols-8 grid-cols-12_m gap-0">
            {children}
        </div>
    );
}

NotaVideoOpening.propTypes = {
    children: PropTypes.node.isRequired
};

export default NotaVideoOpening;
