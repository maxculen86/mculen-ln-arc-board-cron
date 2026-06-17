import React from 'react';
import { Spriteicon } from '@ln/common-ui-spriteicon';
import { useAppContext } from 'fusion:context';
import { getIconPath } from './utils/getIconPath';

function IconSprite({ critical, color, name, ...props }) {
    const { deployment, contextPath, arcSite } = useAppContext();
    const path = getIconPath({
        deployment,
        contextPath,
        critical,
        color,
        arcSite
    });

    if (!path || !name) return null;

    return <Spriteicon path={path} name={name} {...props} />;
}

export default IconSprite;
