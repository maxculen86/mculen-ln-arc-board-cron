import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import ComText from './text';

import '../../../resources/dist/css/ln/modules/mod-tooltip.css';

const ModTooltip = ({ label, className, handleTimeout }) => {
    useEffect(() => {
        const hideTimeout = handleTimeout
            ? setTimeout(() => {
                  handleTimeout();
              }, 2750)
            : null;
        return () => clearTimeout(hideTimeout);
    }, [handleTimeout]);

    const classCondition = className ? ` --${className}` : '';
    return (
        <div className={`mod-tooltip${classCondition}`}>
            <ComText size="--sixxs">{label}</ComText>
        </div>
    );
};

ModTooltip.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    handleTimeout: PropTypes.func
};
ModTooltip.defaultProps = {
    className: '',
    handleTimeout: null
};

export default ModTooltip;
