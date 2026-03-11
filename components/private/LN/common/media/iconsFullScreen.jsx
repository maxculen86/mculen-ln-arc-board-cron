import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

function IconsFullScreen({
    zoom = false,
    active = false,
    itsGallery = false,
    isApertura = false
}) {
    if (!zoom && !itsGallery) return null;

    return (
        <>
            {active && (
                <Icon
                    size={32}
                    className="cursor-pointer bg-black-64 fixed top-8 right-8"
                >
                    <IconSprite name="close" fill="#fff" />
                </Icon>
            )}
            {!isApertura && !active && (
                <Icon
                    size={32}
                    className="icon-zoom cursor-pointer bg-black-64 absolute top-8 right-8 none"
                >
                    <IconSprite name="fullscreen" fill="#fff" />
                </Icon>
            )}
        </>
    );
}

export default IconsFullScreen;
