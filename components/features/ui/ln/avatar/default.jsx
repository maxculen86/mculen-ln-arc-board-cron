import React from 'react';
import { Avatar as CommonAvatar } from '@ln/ds-common-avatar';

/**
 * @typedef {import('@ln/ds-common-avatar').AvatarProps} AvatarProps
 */

/**
 * @param {AvatarProps} props
 * @returns {React.ReactElement}
 */

function Avatar({ imageProps, fallbackProps, ...props }) {
    return (
        <CommonAvatar {...props}>
            <CommonAvatar.Image {...imageProps} />
            <CommonAvatar.Fallback {...fallbackProps} />
        </CommonAvatar>
    );
}

export default Avatar;
