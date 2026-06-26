import React from 'react';
import { Icon as CommonIcon } from '@ln/ds-common-icon';
import { useAppContext } from 'fusion:context';
import generateIconPath from './helpers';

/**
 * @typedef {import('@ln/ds-common-icon').IconProps} IconProps
 */

/**
 * @param {IconProps} props
 * @param {'default'|'color'} [params.type='default']
 * @returns {React.ReactElement}
 */

function Icon({ type = 'default', size = 24, ...props }) {
    const { deployment, contextPath } = useAppContext();
    return (
        <CommonIcon
            getIcon
            path={generateIconPath({ contextPath, deployment, type })}
            size={size}
            {...props}
        />
    );
}

export default Icon;
