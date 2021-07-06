import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComButton from '../../../common/com-button';

import '../../../../../resources/dist/css/ln/components/hamburger.css';

const Hamburger = ({ _onMouseDown }) => {
    return (
        <div className="com-hamburger" onMouseDown={_onMouseDown}>
            <ComButton
                classCondition="--tertiary"
                iconName="menu"
                title="Secciones"
            >
                Secciones
            </ComButton>
        </div>
    );
};

Hamburger.propTypes = {
    _onMouseDown: PropTypes.func.isRequired
};

export default Hamburger;
