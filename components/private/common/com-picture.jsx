import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const ComPicture = props => {
    const { href, classCondition, children, video } = props;
    const PictureBasic = ({ classCon }) => {
        return (
            <picture className={`mod-picture ${video} ${classCon || ''}`}>
                {children}
            </picture>
        );
    };
    PictureBasic.propTypes = {
        classCon: PropTypes.string
    };
    PictureBasic.defaultProps = {
        classCon: ''
    };
    return (
        <>
            {href ? (
                <a href={href}>
                    <PictureBasic classCon={classCondition} />
                </a>
            ) : (
                <PictureBasic classCon={classCondition} />
            )}
        </>
    );
};

ComPicture.propTypes = {
    children: PropTypes.elementType.isRequired,
    href: PropTypes.string,
    classCondition: PropTypes.string
};

export default ComPicture;
