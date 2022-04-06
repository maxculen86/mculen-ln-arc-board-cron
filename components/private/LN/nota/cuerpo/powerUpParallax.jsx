import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import ComImage from '../../../common/com-image';

const Parallax = ({ _id, type, subtype, embed }) => {
    const {
        config: { imageId, title, paragraph }
    } = embed;

    const imageContent = useContent({
        source: 'imageSource',
        query: { published: true, id: imageId.trim() }
    });

    const { url: imageUrl, caption } = imageContent;

    if (!imageId || !imageContent || (!title && !paragraph)) return null;

    return (
        <div className="containerParallax">
            <ComImage
                src={imageUrl}
                alt={caption}
                amp={false}
                classCondition="imageParallax"
            />
            {title && (
                <div className="stepParallax">
                    <h2>{title}</h2>
                </div>
            )}
            {paragraph && (
                <div className="stepParallax">
                    <p>{paragraph}</p>
                </div>
            )}
        </div>
    );
};
Parallax.arcType = 'power-up-parallax';
Parallax.propTypes = {
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    subtype: PropTypes.string.isRequired,
    embed: PropTypes.shape({
        config: PropTypes.shape({
            imageId: PropTypes.string.isRequired,
            title: PropTypes.string,
            paragraph: PropTypes.string
        })
    }).isRequired
};

export default Parallax;
