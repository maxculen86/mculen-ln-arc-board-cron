import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const trim = string => {
    return string.replace(/\s{2,}/g, ' ');
};

const ComPicture = props => {
    const { href, classCondition, children, video, amp } = props;
    const PictureBasic = ({ classCon }) => {
        const className = trim(`mod-picture ${video} ${classCon}`);
        // TODO: optimizar condicionalmente
        return (
            <>
                {amp ? (
                    <div className={className}>{children}</div>
                ) : (
                    <picture className={className}>{children}</picture>
                )}
            </>
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
    classCondition: PropTypes.string,
    amp: PropTypes.string,
    video: PropTypes.string
};

ComPicture.defaultProps = {
    href: '',
    classCondition: '',
    amp: '',
    video: ''
};

export default ComPicture;
