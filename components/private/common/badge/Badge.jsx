import React from 'react';
import PropTypes from 'prop-types';
import '../../../../resources/dist/css/ln/components/badge.css';
import Live from '../live';
import { A_FONDO, LIVEBLOG, SPONSORED } from './types';

const Badge = ({ children, className, type }) => {
    const classType = [A_FONDO, LIVEBLOG].includes(type) ? `--${type}` : '';
    return (
        <span className={`badge --sixxs ${className} ${classType}`}>
            {type === LIVEBLOG && <Live />}
            {children}
        </span>
    );
};

Badge.defaultProps = {
    className: '',
    type: ''
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf([A_FONDO, LIVEBLOG, SPONSORED])
};

export default Badge;
