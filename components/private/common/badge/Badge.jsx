import React from 'react';
import PropTypes from 'prop-types';
import '../../../../resources/dist/css/ln/components/badge.css';
import Live from '../live';
import Icon from '../icon';
import {
    A_FONDO,
    LIVEBLOG,
    LIVEBLOG_RED,
    SPONSORED,
    EXCLUSIVE_LN
} from './types';

const Badge = ({ children, className, type }) => {
    const classType = [
        A_FONDO,
        LIVEBLOG,
        LIVEBLOG_RED,
        SPONSORED,
        EXCLUSIVE_LN
    ].includes(type)
        ? `--${type}`
        : '';
    return (
        <span className={`badge --sixxs ${className} ${classType}`}>
            {type === LIVEBLOG && <Live />}
            {type === EXCLUSIVE_LN && (
                <>
                    <Icon name="exclusive-ln" />
                    Exclusivo suscriptor
                </>
            )}
            {type !== EXCLUSIVE_LN && children}
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
    type: PropTypes.oneOf([
        A_FONDO,
        LIVEBLOG,
        LIVEBLOG_RED,
        SPONSORED,
        EXCLUSIVE_LN
    ])
};

export default Badge;
