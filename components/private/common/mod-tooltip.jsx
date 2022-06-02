import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComText from './text';

import '../../../resources/dist/css/ln/modules/mod-tooltip.css';

const ModTooltip = ({ label, className }) => {
    const classCondition = className ? ` --${className}` : '';
    return (
        <div className={`mod-tooltip${classCondition}`}>
            <ComText size="--sixxs">{label}</ComText>
        </div>
    );
};

ModTooltip.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired
};
ModTooltip.defaultProps = {
    className: ''
};

export default ModTooltip;
