/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/modules/mod-headersection.css';
import ComTitle from './com-title';
import ComImage from './com-image';
import ComLink from './com-link';
import addForwardSLash from '../LN/common/utils/addForwardSlash';
import useGetLogoImage from './hooks/useGetLogoImage';
import get from './utils/get';
import siteConfig from '../../../properties/sites/la-nacion-ar';

const ModheaderSection = props => {
    const {
        title,
        tag,
        line,
        size,
        classCondition,
        link,
        outputType,
        customTitle,
        isVisible = true,
        imageId,
        layout,
        isMultimedia
    } = props;
    const isHome = layout === get(siteConfig, 'layoutsName.Home');
    const image = useGetLogoImage(imageId, isHome, isMultimedia) || {};

    const { caption, width, height, url } = image;
    const roofTitle = title || caption || 'LA NACION';

    if ((!title && !url) || !isVisible) return null;

    const Image = url && (
        <ComImage
            width={width}
            height={height}
            src={url}
            alt={roofTitle}
            amp={outputType === 'amp'}
        />
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
            className={`mod-headersection ${classCondition} ${line &&
                '--line'}`}
            role="contentinfo"
        >
            {!Image ? (
                <ComTitle
                    size={size}
                    tag={tag}
                    content={title}
                    link={addForwardSLash(link)}
                    customTitle={customTitle}
                />
            ) : (
                <div className="mod-logo">{modLogoImage}</div>
            )}
        </section>
    );
};

ModheaderSection.propTypes = {
    imageId: PropTypes.string,
    layout: PropTypes.string,
    link: PropTypes.string,
    title: PropTypes.string,
    classCondition: PropTypes.string,
    tag: PropTypes.string,
    line: PropTypes.bool,
    size: PropTypes.string,
    outputType: PropTypes.string,
    image: PropTypes.shape({
        caption: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        url: PropTypes.string
    }),
    customTitle: PropTypes.string,
    isVisible: PropTypes.bool,
    isMultimedia: PropTypes.bool
};

ModheaderSection.defaultProps = {
    link: null,
    title: null,
    classCondition: '',
    line: true,
    size: '--l',
    tag: 'h3',
    image: {},
    outputType: 'default',
    customTitle: undefined
};

export default ModheaderSection;
