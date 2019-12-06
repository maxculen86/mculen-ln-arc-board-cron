import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../../resources/dist/css/ln/components/hamburger.css';

const Hamburger = ({ _onMouseDown }) => {
    return (
        <div className="com-hamburger" onMouseDown={_onMouseDown}>
            <span className="com-hamburger__bar" />
            <span className="com-hamburger__bar" />
            <span className="com-hamburger__bar" />
        </div>
    );
};

Hamburger.propTypes = {
    _onMouseDown: PropTypes.func.isRequired
};

export default Hamburger;
