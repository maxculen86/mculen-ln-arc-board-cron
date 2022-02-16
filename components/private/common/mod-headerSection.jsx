import React from 'react';
import PropTypes from 'fusion:prop-types';

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
        classCondition = '',
        link,
        outputType,
        customTitle
    } = props;
    const { width, height, url } = image || {};
    if (!title && !url) return null;

    const Image = url && (
        <ComImage
            width={width}
            height={height}
            src={url}
            alt={title}
            amp={outputType === 'amp'}
        />
    );
    const ImageWithLink = link && <ComLink link={link}>{Image}</ComLink>;

    return (
        <section
            className={`mod-headersection ${classCondition} ${line &&
                '--line'}`}
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
                <div className="mod-logo">{link ? ImageWithLink : Image}</div>
            )}
        </section>
    );
};

ModheaderSection.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string,
    classCondition: PropTypes.string,
    tag: PropTypes.string,
    line: PropTypes.boolean,
    size: PropTypes.string,
    outputType: PropTypes.string.isRequired,
    image: PropTypes.shape({
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
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
    customTitle: undefined
};

export default withImage(ModheaderSection);
