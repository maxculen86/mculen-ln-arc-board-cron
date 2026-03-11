/* eslint-disable react/require-default-props */
import React from 'react';
import '../../../resources/dist/css/ln/modules/mod-headersection.css';
import ComTitle from './com-title';
import ComImage from './com-image';
import ComLink from './com-link';
import { addForwardSlash } from '../LN/common/utils/addForwardSlash';
import useGetLogoImage from './hooks/useGetLogoImage';
import get from './utils/get';
import siteConfig from '../../../properties/sites/la-nacion-ar';

function ModheaderSection({
    title = null,
    tag = 'h3',
    line = true,
    size = '--xl',
    classCondition = '',
    link = null,
    customTitle,
    isVisible = true,
    imageId,
    layout
}) {
    const isHome = layout === get(siteConfig, 'layoutsName.Home');
    const image = useGetLogoImage(imageId, isHome) || {};

    const { caption, width, height, url } = image;
    const roofTitle = title || caption || 'LA NACION';

    if ((!title && !url) || !isVisible) return null;

    const Image = url && (
        <ComImage width={width} height={height} src={url} alt={roofTitle} />
    );

    const modLogoImage = link ? (
        <ComLink link={link} title={roofTitle}>
            {Image}
        </ComLink>
    ) : (
        Image
    );

    return (
        <section
            className={`mod-headersection ${classCondition} ${
                line && '--line'
            }`}
            role="contentinfo"
        >
            {!Image ? (
                <ComTitle
                    size={size}
                    tag={tag}
                    content={title}
                    link={addForwardSlash(link)}
                    customTitle={customTitle}
                    weight="--font-black"
                />
            ) : (
                <div className="mod-logo">{modLogoImage}</div>
            )}
        </section>
    );
}

export default ModheaderSection;
