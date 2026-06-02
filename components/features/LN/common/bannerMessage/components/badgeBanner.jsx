import React from 'react';
import Badge from '../../../../ui/ln/badge/default';
import Icon from '../../../../ui/ln/icon/default';
import IconSubscribe from '../../iconSubscribe/default';

export const propsBadgeOnlySubscriptor = {
    color: 'custom',
    textTransform: 'none',
    iconData: {
        customIcon: (
            <IconSubscribe
                containerProps={{
                    withBorder: false
                }}
            />
        ),
        position: 'left'
    },
    text: 'Suscriptores'
};

function BadgeBanner(data) {
    const { text, iconData, ...badge } = data;
    const { position, customIcon, ...icon } = iconData || {};

    const iconComponent = customIcon || (iconData && <Icon {...icon} />);

    const iconLeft = position === 'left' && iconComponent;
    const iconRight = position === 'right' && iconComponent;

    return (
        <Badge {...badge} iconLeft={iconLeft} iconRight={iconRight}>
            {text}
        </Badge>
    );
}

export default BadgeBanner;
