import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComText from './text';

import '../../../resources/dist/css/ln/modules/mod-tooltip.css';

const ModTooltip = ({ label }) => {
    return (
        <div className="mod-tooltip">
            <ComText size="--sixxs">{label}</ComText>
        </div>
    );
};

ModTooltip.propTypes = {
    label: PropTypes.string.isRequired
};

export default ModTooltip;
