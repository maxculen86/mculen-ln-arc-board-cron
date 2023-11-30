import React from 'react';
import { Icon } from '@ln/common-ui-icon';

export const RenderIcon = ({ iconData }) => {
    const { element, backgroudColor } = iconData;
    if (!element || !backgroudColor) return <></>;
    return (
        <Icon size={12} hasWrapper bgColor={backgroudColor}>
            {element}
        </Icon>
    );
};

export default RenderIcon;
