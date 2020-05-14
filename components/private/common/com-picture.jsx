import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const ComPicture = props => {
    const { href, classCondition, children } = props;
    /**
     * Se agregan propTypes y defautProps al componente PictureBasic
     * Porque Jest toma la falta de proptypes en los componentes como un error
     * Entonces le agrega [object Object] a los snapshots y empiezan a romper.
     */
    const PictureBasic = ({ classCon }) => {
        return (
            <picture className={`mod-picture ${classCon || ''}`}>
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
