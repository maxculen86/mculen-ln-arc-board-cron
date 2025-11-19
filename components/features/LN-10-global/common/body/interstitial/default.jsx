import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ln/common-ui-icon';
import { Link } from '@ln/contenidos-ui-link';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { appendPageReferrerParam } from '../../../../../private/LN/common/utils/pageReferrer';

function Interstitial({ data, ...r }) {
    const { url, content } = data || {};
    const [linkHref, setLinkHref] = useState(url);

    useEffect(() => {
        setLinkHref(appendPageReferrerParam(url));
    }, [url]);

    if (!url || !content) return null;

    return (
        <div
            className="interstitial-container container-center-100 pb-32"
            {...r}
        >
            <div className="flex jc-center ai-center w-100">
                <Link
                    target="_blank"
                    href={linkHref || url}
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

Interstitial.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number,
        url: PropTypes.string
    }).isRequired
};

export default Interstitial;
