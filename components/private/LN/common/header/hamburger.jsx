import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComIcon from '../../../common/com-icon';

import '../../../../../resources/dist/css/ln/components/hamburger.css';

const Hamburger = ({ _onMouseDown }) => {
    return (
        <div className="com-hamburger" onMouseDown={_onMouseDown}>
            <ComIcon iconName="menu" />
        </div>
    );
};

Hamburger.propTypes = {
    _onMouseDown: PropTypes.func.isRequired
};

export default Hamburger;
