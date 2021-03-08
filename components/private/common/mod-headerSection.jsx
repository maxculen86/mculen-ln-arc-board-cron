import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-headersection.css';
import ComLine from '../LN/common/footer/com-line';
import ComTitle from './com-title';
import withImage from './hocs/withImage';
import ComImage from './com-image';
import ComLink from './com-link';

const ModheaderSection = props => {
    const {
        title,
        line,
        size,
        image,
        classCondition = '',
        link,
        outputType
    } = props;
    const { width, height, url } = image || {};
    if (!title && !url) return null;

    const Image = url && (
        <ComImage
            width={width}
            height={height}
            src={url}
            alt="Logo"
            amp={outputType === 'amp'}
        />
    );
    const ImageWithLink = link && <ComLink link={link}>{Image}</ComLink>;

    return (
        <section className={`mod-headersection ${classCondition}`}>
            {!Image ? (
                <ComTitle size={size} content={title} link={link} />
            ) : (
                <div className="mod-logo">{link ? ImageWithLink : Image}</div>
            )}
            {line ? <ComLine /> : ''}
        </section>
    );
};

ModheaderSection.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string,
    classCondition: PropTypes.string,
    line: PropTypes.boolean,
    size: PropTypes.string,
    outputType: PropTypes.string.isRequired,
    image: PropTypes.shape({
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })
};

ModheaderSection.defaultProps = {
    link: null,
    title: null,
    classCondition: '',
    line: true,
    size: '--l',
    image: {}
};

export default withImage(ModheaderSection);
