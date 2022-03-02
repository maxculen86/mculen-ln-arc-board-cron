import React from 'react';
import PropTypes from 'prop-types';

import '../../../resources/dist/css/ln/modules/mod-headersection.css';
import ComTitle from './com-title';
import withImage from './hocs/withImage';
import ComImage from './com-image';
import ComLink from './com-link';
import addForwardSLash from '../LN/common/utils/addForwardSlash';

const ModheaderSection = props => {
    const {
        title,
        tag,
        line,
        size,
        image,
        classCondition,
        link,
        outputType,
        customTitle
    } = props;
    const { caption, width, height, url } = image;
    const roofTitle = title || caption || 'LA NACION';

    if (!title && !url) return null;

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
    customTitle: PropTypes.string
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

export default withImage(ModheaderSection);
