import { Icon } from '@ln/common-ui-icon';
import React from 'react';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

function PostPinned() {
    return (
        <>
            <Icon
                className="absolute w-40"
                style={{
                    left: '15px',
                    top: '-6px'
                }}
            >
                <IconSprite name="pinColor" color />
            </Icon>
            <span className="bg-danger-600 block h-6 w-100" />
        </>
    );
}

export default PostPinned;
