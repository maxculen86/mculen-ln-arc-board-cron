import React from 'react';
import PropTypes from 'prop-types';
import '../../../../resources/dist/css/ln/components/badge-usertype.css';
import Icon from '../icon';
import Text from '../text';
import Badge from './Badge';

const BadgeUsertype = ({ icon, text, title, dark, className, type }) => {
    const typeClass = type ? `--${type}` : '';
    const darkClass = dark ? '--dark' : '';
    const forSubscriber = icon === 'ln' ? 'subscriber' : '';
    return (
        <div
            className={`usertype ${forSubscriber} ${className} ${typeClass} ${darkClass}`}
            title={title}
        >
            {icon === 'ln' ? (
                <Badge type="exclusive-ln" />
            ) : (
                <>
                    <Icon name={icon} />
                    <Text size="2xs" weight="bold" text={text} />
                </>
            )}
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
    text: 'Suscriptores',
    title: 'Este contenido es exclusivo para suscriptores de LA NACION',
    className: '',
    type: undefined,
    dark: undefined
};

export default BadgeUsertype;
