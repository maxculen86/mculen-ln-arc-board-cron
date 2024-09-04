import React from 'react';

import PropTypes from 'prop-types';
import '../../../../resources/dist/css/ln/components/badge.css';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import Live from '../live';
import {
    A_FONDO,
    LIVEBLOG,
    LIVEBLOG_RED,
    SPONSORED,
    EXCLUSIVE_LN
} from './types';

// TODO: Componente reemplazado por libreria, ELIMINAR EN OTRA ITERACION

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
        <span className={`badge text-12 --arial ${className} ${classType}`}>
            {type === LIVEBLOG && <Live />}
            {type === EXCLUSIVE_LN ? (
                <>
                    <Icon size={16}>
                        <IconSprite name="subscriber" color />
                    </Icon>
                    <span title="Este es un contenido cerrado a Suscriptores">
                        Suscriptores
                    </span>
                </>
            ) : (
                children
            )}
        </span>
    );
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

Badge.defaultProps = {
    className: '',
    type: ''
};

export default Badge;
