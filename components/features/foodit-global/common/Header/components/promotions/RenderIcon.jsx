import React from 'react';
import { Icon } from '@ln/common-ui-icon';

export const RenderIcon = ({ iconData }) => {
    if (!iconData) return <></>;
    return (
        <Icon size={12} hasWrapper bgColor={iconData?.backgroudColor}>
            {iconData?.element}
        </Icon>
    );
};

export default RenderIcon;
