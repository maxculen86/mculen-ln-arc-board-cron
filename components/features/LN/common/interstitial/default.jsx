import React from 'react';
import Link from '../../../ui/ln/link/default';
import Icon from '../../../ui/ln/icon/default';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

const RECIRCULATION_ID = 'n_interstitial';

// TODO para front: realizar ajustes de estilos según diseño.
function Interstitial({ data = {}, ...restProps }) {
    const { url, content } = data;

    if (!url || !content) return null;

    return (
        <div {...restProps}>
            <Link
                target="_blank"
                href={url}
                title={content}
                data-mrf-recirculation={RECIRCULATION_ID}
            >
                {content}
                <Icon size={20}>
                    <IconSprite name="arrowRight" />
                </Icon>
            </Link>
        </div>
    );
}

Interstitial.arcType = 'interstitial_link';
Interstitial.isStatic = true;

export default Interstitial;
