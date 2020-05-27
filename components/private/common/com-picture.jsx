import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const ComPicture = props => {
    const { href, classCondition, children, amp } = props;
    const PictureBasic = ({ classCon }) => {
        //TODO: optimizar condicionalmente
        return (
            <>
                {amp ? (
                    <div className={`mod-picture ${classCon || ''}`}>
                        {children}
                    </div>
                ) : (
                    <picture className={`mod-picture ${classCon || ''}`}>
                        {children}
                    </picture>
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
    classCondition: PropTypes.string
};

export default ComPicture;
