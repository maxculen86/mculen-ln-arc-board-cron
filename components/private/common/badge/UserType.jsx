import React from 'react';
import PropTypes from 'prop-types';

import '../../../../resources/dist/css/ln/components/badge-usertype.css';
import Icon from '../icon';
import Text from '../text';

const BadgeUsertype = ({ icon, text, title, dark, className, type }) => {
    return (
        <div
            className={`usertype ${className} ${type ? `--${type}` : ``} ${
                dark ? `--dark` : ``
            }`}
            title={title}
        >
            <Icon name={icon} />
            <Text size="2xs" weight="bold" text={text}></Text>
        </div>
    );
};

BadgeUsertype.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    dark: PropTypes.bool
};

BadgeUsertype.defaultProps = {
    icon: 'ln',
    text: 'Exclusivo suscriptor',
    title: 'Este contenido es exclusivo para suscriptores de LA NACION',
    className: '',
    type: undefined,
    dark: undefined
};

export default BadgeUsertype;
