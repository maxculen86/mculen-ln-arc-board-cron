import React from 'react';
import Badge from '../../../../ui/ln/badge/default';
import Icon from '../../../../ui/ln/icon/default';

function BadgeBanner(data) {
    const { text, iconData, ...badge } = data;
    const { position, ...icon } = iconData || {};

    const iconComponent = iconData && <Icon {...icon} />;

    const iconLeft = position === 'left' && iconComponent;
    const iconRight = position === 'right' && iconComponent;

    return (
        <Badge {...badge} iconLeft={iconLeft} iconRight={iconRight}>
            {text}
        </Badge>
    );
}

export default BadgeBanner;
