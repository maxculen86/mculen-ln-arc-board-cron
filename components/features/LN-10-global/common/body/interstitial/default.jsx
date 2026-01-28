import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Link } from '@ln/contenidos-ui-link';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

function Interstitial({ data, ...r }) {
    const { url, content } = data || {};

    if (!url || !content) return null;

    return (
        <div
            className="interstitial-container container-center-100 pb-32"
            {...r}
        >
            <div className="flex jc-center ai-center w-100">
                <Link
                    target="_blank"
                    href={url}
                    title={content}
                    className="theme-button interstitial-button py-12 px-16 gap-8 bg-secondary__hover rounded-4 border border-all border-thin border-neutral-light-800 text-neutral-light-800 uppercase text-12_130 font-bold text-center break-word flex jc-center ai-center"
                    data-mrf-recirculation="n_interstitial"
                >
                    {content}
                    <Icon size={20} className="theme-icon">
                        <IconSprite name="arrowRight" />
                    </Icon>
                </Link>
            </div>
        </div>
    );
}

Interstitial.arcType = 'interstitial_link';
Interstitial.isStatic = true;

export default Interstitial;
